/**
 * AgriMind — 3D Isometric Field Map
 *
 * Renders an interactive isometric heatmap of Al-Barkat Farm
 * with four irrigation zones. Supports four data layers:
 *   • moisture   – soil moisture %
 *   • temp       – soil temperature
 *   • ndvi       – vegetation index
 *   • elevation  – terrain elevation
 *
 * Also draws mini sparklines for each zone in the side panel.
 */

// ─── Grid constants ───────────────────────────────────────────
const COLS         = 40;
const ROWS         = 40;
const CELL         = 18;
const ISO_X        = 0.866;   // cos(30°)
const ISO_Y        = 0.5;     // sin(30°)
const HEIGHT_SCALE = 28;
const TILT         = 0.55;

// ─── Zone helpers ─────────────────────────────────────────────
/** Returns zone number (1–4) for a grid cell (c, r). */
function getZone(c, r) {
  if (r < ROWS / 2 && c < COLS / 2) return 1; // NW → North block
  if (r < ROWS / 2 && c >= COLS / 2) return 2; // NE → East block
  if (r >= ROWS / 2 && c < COLS / 2) return 3; // SW → South block
  return 4;                                      // SE → West block
}

// ─── Value generators ─────────────────────────────────────────
const ZONE_BASE = { moisture: { 1: 0.78, 2: 0.61, 3: 0.82, 4: 0.48 },
                    temp:     { 1: 0.52, 2: 0.68, 3: 0.48, 4: 0.78 },
                    ndvi:     { 1: 0.74, 2: 0.55, 3: 0.80, 4: 0.38 } };

function noiseVal(c, r, seed) {
  return (Math.sin(c * 0.37 + seed) * Math.cos(r * 0.29 + seed * 1.3) + 1) / 2;
}

function getCellValue(c, r, layer) {
  const z = getZone(c, r);
  const seeds = { moisture: 1.1, temp: 2.7, ndvi: 4.2, elevation: 6.6 };
  const n = noiseVal(c, r, seeds[layer]);

  if (layer === 'elevation') return 0.3 + noiseVal(c * 0.6, r * 0.6, 9.1) * 0.7;
  return ZONE_BASE[layer][z] + (n - 0.5) * 0.15;
}

// ─── Color interpolation ──────────────────────────────────────
function heatColor(t, layer) {
  t = Math.max(0, Math.min(1, t));
  if (layer === 'elevation') {
    const stops = [[60, 35, 10], [34, 100, 40], [200, 240, 200]];
    if (t < 0.5) { const s = t * 2; return stops[0].map((a, i) => a + (stops[1][i] - a) * s); }
    const s = (t - 0.5) * 2; return stops[1].map((a, i) => a + (stops[2][i] - a) * s);
  }
  // Red → Yellow → Green (reversed for temp: cool = good)
  const stops = layer === 'temp'
    ? [[45, 210, 114], [245, 197, 66], [240, 107, 107]]
    : [[240, 107, 107], [245, 197, 66], [45, 210, 114]];
  if (t < 0.5) { const s = t * 2; return stops[0].map((a, i) => a + (stops[1][i] - a) * s); }
  const s = (t - 0.5) * 2; return stops[1].map((a, i) => a + (stops[2][i] - a) * s);
}

// ─── Isometric helpers ────────────────────────────────────────
function toISO(c, r) {
  const wx = (c - COLS / 2) * CELL;
  const wy = (r - ROWS / 2) * CELL;
  return [(wx - wy) * ISO_X, (wx + wy) * ISO_Y * TILT];
}

function hexToRgb(hex) {
  const m = hex.match(/\w\w/g);
  return m ? m.map(x => parseInt(x, 16)).join(',') : '255,255,255';
}

// ─── Main init ────────────────────────────────────────────────
export function initFieldMap() {
  const canvas = document.getElementById('fieldCanvas3D');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let currentLayer   = 'moisture';
  let highlightedZone = null;
  let hoveredCell    = null;
  let animT          = 0;
  let camX = 0, camY = 0;
  let isDragging = false, lastMX = 0, lastMY = 0;

  // Pre-compute grid values for all layers
  const grid = [];
  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      grid[r][c] = {};
      ['moisture', 'temp', 'ndvi', 'elevation'].forEach(l => {
        grid[r][c][l] = getCellValue(c, r, l);
      });
    }
  }

  // ── Canvas resize ────────────────────────────────────────────
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width  = rect.width * window.devicePixelRatio;
    canvas.height = Math.round(rect.width * 0.52) * window.devicePixelRatio;
    canvas.style.width  = rect.width + 'px';
    canvas.style.height = Math.round(rect.width * 0.52) + 'px';
  }

  // ── Draw a single isometric cell ─────────────────────────────
  function drawCell(c, r, val, layer, alpha, isHovered, isHighlighted) {
    const [ix,  iy]  = toISO(c,     r);
    const [ix1]      = toISO(c + 1, r);
    const [ix2, iy2] = toISO(c + 1, r + 1);
    const [,    iy3] = toISO(c,     r + 1);

    const h = val * HEIGHT_SCALE;
    const dpr = window.devicePixelRatio;
    const cx0 = canvas.width  / 2 / dpr + camX;
    const cy0 = canvas.height / 2 / dpr + camY;
    const cx  = cx0 + ix;
    const cy  = cy0 + iy - h;

    const [r0, g0, b0] = heatColor(val, layer);
    const dimFactor = (highlightedZone !== null && getZone(c, r) !== highlightedZone) ? 0.25 : 1;
    const a = alpha * dimFactor;
    const brightness = isHovered ? 1.25 : isHighlighted ? 1.1 : 1;

    // Top face
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + (ix1 - ix),  cy + (toISO(c + 1, r)[1] - iy));
    ctx.lineTo(cx + (ix2 - ix),  cy + (toISO(c + 1, r + 1)[1] - iy));
    ctx.lineTo(cx + (toISO(c, r + 1)[0] - ix), cy + (iy3 - iy));
    ctx.closePath();
    ctx.fillStyle = `rgba(${Math.min(255, r0 * brightness)},${Math.min(255, g0 * brightness)},${Math.min(255, b0 * brightness)},${a})`;
    ctx.fill();
    if (isHovered || isHighlighted) {
      ctx.strokeStyle = `rgba(255,255,255,${0.6 * dimFactor})`;
      ctx.lineWidth = 0.5;
    } else {
      ctx.strokeStyle = `rgba(8,12,10,${0.3 * dimFactor})`;
      ctx.lineWidth = 0.3;
    }
    ctx.stroke();

    // Side faces (only if height > 1px)
    if (h > 1) {
      // Right face
      ctx.beginPath();
      ctx.moveTo(cx + (ix2 - ix), cy + (iy2 - iy));
      ctx.lineTo(cx + (ix2 - ix), cy + (iy2 - iy) + h);
      ctx.lineTo(cx + (toISO(c, r + 1)[0] - ix), cy + (iy3 - iy) + h);
      ctx.lineTo(cx + (toISO(c, r + 1)[0] - ix), cy + (iy3 - iy));
      ctx.closePath();
      ctx.fillStyle = `rgba(${Math.round(r0 * 0.55)},${Math.round(g0 * 0.55)},${Math.round(b0 * 0.55)},${a * 0.9})`;
      ctx.fill();

      // Left face
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, cy + h);
      ctx.lineTo(cx + (ix2 - ix) - (ix1 - ix), cy + (iy3 - iy) + h);
      ctx.lineTo(cx + (ix2 - ix) - (ix1 - ix), cy + (iy3 - iy));
      ctx.closePath();
      ctx.fillStyle = `rgba(${Math.round(r0 * 0.7)},${Math.round(g0 * 0.7)},${Math.round(b0 * 0.7)},${a * 0.85})`;
      ctx.fill();
    }
  }

  // ── Draw zone border highlight ────────────────────────────────
  function drawZoneBorder(zone) {
    const color = ['', '#60b8f8', '#f5c542', '#2dd272', '#f06b6b'][zone];
    const dpr = window.devicePixelRatio;
    const cx0 = canvas.width / 2 / dpr + camX;
    const cy0 = canvas.height / 2 / dpr + camY;
    const h   = HEIGHT_SCALE * 0.5;

    const edges = {
      1: [[0, 0, COLS/2, 0], [COLS/2, 0, COLS/2, ROWS/2], [0, ROWS/2, COLS/2, ROWS/2], [0, 0, 0, ROWS/2]],
      2: [[COLS/2, 0, COLS, 0], [COLS, 0, COLS, ROWS/2], [COLS/2, ROWS/2, COLS, ROWS/2], [COLS/2, 0, COLS/2, ROWS/2]],
      3: [[0, ROWS/2, COLS/2, ROWS/2], [COLS/2, ROWS/2, COLS/2, ROWS], [0, ROWS, COLS/2, ROWS], [0, ROWS/2, 0, ROWS]],
      4: [[COLS/2, ROWS/2, COLS, ROWS/2], [COLS, ROWS/2, COLS, ROWS], [COLS/2, ROWS, COLS, ROWS], [COLS/2, ROWS/2, COLS/2, ROWS]],
    };

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth   = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.shadowColor = color;
    ctx.shadowBlur  = 6;
    edges[zone].forEach(([c1, r1, c2, r2]) => {
      const [ix1, iy1] = toISO(c1, r1);
      const [ix2, iy2] = toISO(c2, r2);
      ctx.beginPath();
      ctx.moveTo(cx0 + ix1, cy0 + iy1 - h);
      ctx.lineTo(cx0 + ix2, cy0 + iy2 - h);
      ctx.stroke();
    });
    ctx.restore();
  }

  // ── Draw zone label ───────────────────────────────────────────
  function drawZoneLabel(zone) {
    const vals    = ['', '78%', '61%', '82%', '48%'];
    const centers = [[COLS/4, ROWS/4], [3*COLS/4, ROWS/4], [COLS/4, 3*ROWS/4], [3*COLS/4, 3*ROWS/4]];
    const colors  = ['', '#60b8f8', '#f5c542', '#2dd272', '#f06b6b'];

    const [cc, cr] = centers[zone - 1];
    const [ix, iy] = toISO(cc, cr);
    const val = grid[Math.round(cr)][Math.round(cc)][currentLayer];
    const h   = val * HEIGHT_SCALE + 14;
    const dpr = window.devicePixelRatio;
    const px  = canvas.width  / 2 / dpr + camX + ix;
    const py  = canvas.height / 2 / dpr + camY + iy - h;
    const dim = (highlightedZone !== null && zone !== highlightedZone) ? 0.3 : 1;

    ctx.save();
    ctx.textAlign  = 'center';
    ctx.shadowColor = colors[zone];
    ctx.shadowBlur  = 8;
    ctx.font        = 'bold 11px "DM Sans", sans-serif';
    ctx.fillStyle   = `rgba(${hexToRgb(colors[zone])},${0.9 * dim})`;
    ctx.fillText('Zone ' + zone, px, py);
    ctx.font        = 'bold 13px "DM Mono", monospace';
    ctx.fillText(vals[zone], px, py + 14);
    ctx.restore();
  }

  // ── Main draw ─────────────────────────────────────────────────
  function draw() {
    const dpr = window.devicePixelRatio;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height / dpr);
    bg.addColorStop(0, '#0a0f0b');
    bg.addColorStop(1, '#080c0a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    // Cells (painter's algorithm: back-to-front)
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const val    = grid[r][c][currentLayer];
        const zone   = getZone(c, r);
        const isHov  = hoveredCell && hoveredCell[0] === c && hoveredCell[1] === r;
        const isHigh = highlightedZone === zone;
        drawCell(c, r, val, currentLayer, 0.9, isHov, isHigh);
      }
    }

    // Zone borders (only when a zone is highlighted)
    if (highlightedZone) drawZoneBorder(highlightedZone);

    // Zone labels
    for (let z = 1; z <= 4; z++) drawZoneLabel(z);

    // Pulsing alert beacon on Zone 4
    const pulse = 0.5 + 0.5 * Math.sin(animT * 3);
    const [ix4, iy4] = toISO(3 * COLS / 4, 3 * ROWS / 4);
    const dpr2 = window.devicePixelRatio;
    const cx0 = canvas.width  / 2 / dpr2 + camX;
    const cy0 = canvas.height / 2 / dpr2 + camY;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx0 + ix4, cy0 + iy4 - HEIGHT_SCALE * 0.5 - 28, 5 + pulse * 3, 0, Math.PI * 2);
    ctx.fillStyle  = `rgba(240,107,107,${0.7 + pulse * 0.3})`;
    ctx.shadowColor = '#f06b6b';
    ctx.shadowBlur  = 10 + pulse * 10;
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  function animate() {
    animT += 0.016;
    draw();
    requestAnimationFrame(animate);
  }

  // ── Mouse interactions ────────────────────────────────────────
  canvas.addEventListener('mousedown', e => {
    isDragging = true; lastMX = e.clientX; lastMY = e.clientY;
    canvas.style.cursor = 'grabbing';
  });

  canvas.addEventListener('mousemove', e => {
    if (isDragging) {
      camX += e.clientX - lastMX;
      camY += e.clientY - lastMY;
      lastMX = e.clientX; lastMY = e.clientY;
    }
    const rect = canvas.getBoundingClientRect();
    const mx   = e.clientX - rect.left  - camX - rect.width  / 2;
    const my   = e.clientY - rect.top   - camY - rect.height / 2;
    const c    = Math.floor((mx / ISO_X / CELL + my / ISO_Y / TILT / CELL) / 2 + COLS / 2);
    const r    = Math.floor((my / ISO_Y / TILT / CELL - mx / ISO_X / CELL) / 2 + ROWS / 2);

    const tip = document.getElementById('fieldTooltip');
    if (c >= 0 && c < COLS && r >= 0 && r < ROWS) {
      hoveredCell = [c, r];
      const val   = grid[r][c][currentLayer];
      const zone  = getZone(c, r);
      const zNames = ['', 'North Block', 'East Block', 'South Block', 'West Block'];
      const label  = { moisture: 'Moisture', temp: 'Temperature', ndvi: 'NDVI', elevation: 'Elevation' }[currentLayer];
      tip.innerHTML = `<div style="color:#eef2ee;font-weight:700;margin-bottom:3px">Zone ${zone} — ${zNames[zone]}</div>
                       <div style="color:#7a9282">${label}: <span style="color:#2dd272;font-weight:700">${(val * 100).toFixed(1)}%</span></div>`;
      tip.style.display = 'block';
      tip.style.left = (e.clientX - rect.left + 12) + 'px';
      tip.style.top  = (e.clientY - rect.top  - 10) + 'px';
    } else {
      hoveredCell = null;
      tip.style.display = 'none';
    }
  });

  canvas.addEventListener('mouseup',    () => { isDragging = false; canvas.style.cursor = 'grab'; });
  canvas.addEventListener('mouseleave', () => {
    isDragging = false; canvas.style.cursor = 'grab';
    hoveredCell = null;
    document.getElementById('fieldTooltip').style.display = 'none';
  });
  canvas.addEventListener('wheel', e => {
    e.preventDefault();
  }, { passive: false });

  // ── Sparklines ────────────────────────────────────────────────
  function drawSparkline(id, data, color) {
    const c = document.getElementById(id);
    if (!c) return;
    const ctx2 = c.getContext('2d');
    const w = c.width, h = c.height;
    ctx2.clearRect(0, 0, w, h);
    const min = Math.min(...data), max = Math.max(...data);
    const range = max - min || 1;
    ctx2.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      i === 0 ? ctx2.moveTo(x, y) : ctx2.lineTo(x, y);
    });
    ctx2.strokeStyle = color;
    ctx2.lineWidth   = 1.5;
    ctx2.stroke();
    // Area fill
    ctx2.lineTo(w, h); ctx2.lineTo(0, h); ctx2.closePath();
    ctx2.fillStyle = color.replace(')', ',0.12)').replace('rgb', 'rgba');
    ctx2.fill();
  }

  drawSparkline('spark1', [82,79,75,81,78,80,78,76], '#60b8f8');
  drawSparkline('spark2', [74,71,66,73,69,65,62,61], '#f5c542');
  drawSparkline('spark3', [80,84,81,85,83,84,82,82], '#2dd272');
  drawSparkline('spark4', [70,66,61,65,59,54,50,48], '#f06b6b');

  // ── Layer switching (exposed globally) ────────────────────────
  window.setFieldLayer = function(layer, btn) {
    currentLayer = layer;
    document.querySelectorAll('.field-layer-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const labels = {
      moisture:  'Soil Moisture Heatmap',
      temp:      'Soil Temperature Map',
      ndvi:      'NDVI Vegetation Index',
      elevation: 'Terrain Elevation',
    };
    document.getElementById('field-layer-label').textContent = labels[layer];

    const legends = {
      moisture:  { grad:'linear-gradient(90deg,#f06b6b,#f5c542,#2dd272)', l:'0%',    m:'50%',      r:'100%',  title:'Moisture Scale' },
      temp:      { grad:'linear-gradient(90deg,#2dd272,#f5c542,#f06b6b)', l:'Cool',  m:'Warm',     r:'Hot',   title:'Temperature Scale' },
      ndvi:      { grad:'linear-gradient(90deg,#f06b6b,#f5c542,#2dd272)', l:'Sparse',m:'Moderate', r:'Dense', title:'Vegetation Index' },
      elevation: { grad:'linear-gradient(90deg,#3c2306,#226622,#c8f0c8)', l:'Low',   m:'Mid',      r:'High',  title:'Elevation' },
    };
    const lg = legends[layer];
    document.getElementById('legendGradient').style.background = lg.grad;
    document.getElementById('legendLabels').innerHTML =
      `<span>${lg.l}</span><span>${lg.m}</span><span>${lg.r}</span>`;
    document.getElementById('legendTitle').textContent = lg.title;
  };

  // ── Zone highlight (exposed globally) ─────────────────────────
  window.highlightZone = function(z) {
    highlightedZone = highlightedZone === z ? null : z;
  };

  // ── Bootstrap ─────────────────────────────────────────────────
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Re-resize when the Fields view becomes active
  const fieldsView = document.getElementById('view-fields');
  if (fieldsView) {
    new MutationObserver(() => {
      if (fieldsView.classList.contains('active')) resizeCanvas();
    }).observe(fieldsView, { attributes: true, attributeFilter: ['class'] });
  }

  animate();
}
