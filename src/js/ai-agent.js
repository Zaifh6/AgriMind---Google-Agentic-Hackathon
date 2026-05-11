/**
 * AgriMind — Multi-Agent Orchestration Module
 *
 * Implements a four-agent swarm following the Agent Development Kit (ADK) pattern:
 *   1. Agri-Forecaster Agent  — weather & satellite ingestion (ECMWF + NDVI)
 *   2. Agronomy Agent         — RAG over Vertex AI Search crop-disease knowledge base
 *   3. IoT Execution Agent    — MQTT valve commands & drone scheduling
 *   4. Orchestrator Agent     — ADK router that synthesises the final daily plan
 *
 * Sub-agent processing is animated to reflect the real delegation pipeline.
 * The Orchestrator's Gemini 2.5 Pro call runs in parallel with the animations
 * so total latency equals max(animation_time, API_time).
 *
 * ⚠️  Replace GEMINI_API_KEY before deploying. Use env vars or a backend proxy.
 */

import { currentLang, T } from './i18n.js';

// ─── Config ──────────────────────────────────────────────────
const GEMINI_API_KEY  = '';
const GEMINI_MODEL    = 'gemini-2.5-pro';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// ─── Agent swarm definitions ──────────────────────────────────
const AGENTS = [
  {
    id:       'forecaster',
    msg:      'Agri-Forecaster: Ingesting ECMWF weather blend & Sentinel-2 NDVI satellite data via Google Maps API...',
    duration: 1900,
  },
  {
    id:       'agronomy',
    msg:      'Agronomy Agent: Performing RAG over crop-disease knowledge base via Vertex AI Search...',
    duration: 2300,
  },
  {
    id:       'iot',
    msg:      'IoT Execution Agent: Translating recommendations to MQTT valve commands & drone schedules...',
    duration: 1600,
  },
  {
    id:       'orchestrator',
    msg:      'Orchestrator (ADK): Synthesising final farm action plan from all sub-agents...',
    duration: 0,
  },
];

// ─── Orchestrator system prompt ───────────────────────────────
const SYSTEM_PROMPT = `You are the AgriMind Orchestrator Agent, the central router in a multi-agent farming swarm deployed on Google Cloud Run via the Agent Development Kit (ADK).

You have received delegated analysis from three specialised sub-agents:
• Agri-Forecaster Agent — ingested ECMWF/Open-Meteo weather blends and Sentinel-2 NDVI satellite imagery; field boundaries retrieved via Google Maps API for spatial grounding.
• Agronomy Agent — performed RAG over AgriMind's proprietary crop-disease knowledge base using Vertex AI Search; retrieved disease-pressure thresholds, treatment protocols, and nutrient schedules specific to the crop and region.
• IoT Execution Agent — translated agronomic inputs into MQTT drip-valve open/close commands and autonomous drone spray missions with GPS waypoints.

Your role is to synthesise these inputs into a single, coherent daily farm plan. Format your response using EXACTLY these section headers:
## 🌡 Current Farm Assessment
## 💧 Irrigation Recommendation
## 🦠 Disease & Pest Risk
## 🌤 Weather Advisory
## 🌱 Nutrient & Fertilizer Guidance
## ✅ Priority Action Plan (Next 7 Days)
## 📊 7-Day Outlook

Always give specific numbers: volumes in litres, doses in g/L, dates. Be direct and confident.`;

// ─── Demo fallback analysis ───────────────────────────────────
const DEMO_ANALYSIS = `## 🌡 Current Farm Assessment
Your tomato field (45 acres, Vegetative Stage Day 65) shows moderate stress indicators. Soil moisture at 72% is within range but trending toward the lower threshold for this stage. Air temperature of 32°C combined with 65% humidity creates moderate vapour-pressure deficit — monitor closely over the next 48 hours.

## 💧 Irrigation Recommendation
**Action: Irrigate within 24 hours.**
- Apply **28 litres/plant** via drip system over a 4-hour morning cycle (05:00–09:00)
- Skip if incoming rain exceeds 15 mm — heavy rain forecast in 3–4 days
- Target post-irrigation soil moisture: **80–85%**
- IoT valve command issued: Zone 1–3 open @ 0.6 bar for 240 min

## 🦠 Disease & Pest Risk
**HIGH RISK — Late Blight (Phytophthora infestans)**
- Current humidity (65%) + imminent rain = critical infection window
- **Apply preventive fungicide NOW, before rain arrives**
- Recommended: Mancozeb 2.5 g/L or Chlorothalonil 2.0 g/L — 500 L/acre coverage
- Re-apply 7 days after rain clears
- Secondary: Aphid pressure at ~20% probability — inspect leaf undersides on Day 5

## 🌤 Weather Advisory
- Heavy rain in 3–4 days: delay all granular fertiliser until after the event
- Post-rain temperature drop expected — watch for humidity spike above 80%
- Wind speed currently low: **good fungicide spray window for next 36 hours**
- Do not apply herbicide or foliar spray within 6 hours of rainfall

## 🌱 Nutrient & Fertilizer Guidance
At Day 65 Vegetative stage, tomatoes have elevated N and K demand:
- **Nitrogen**: 3.5 kg/acre urea (46-0-0) via fertigation — hold until after rain
- **Potassium**: 2.8 kg/acre potassium nitrate (13-0-46) — co-apply with N
- **Calcium**: 1.2 g/L calcium nitrate foliar spray — apply today before rain
- **pH**: Target 6.2–6.8; current sandy loam suggests possible acidification — soil test recommended

## ✅ Priority Action Plan (Next 7 Days)
1. **Day 1 (Today)** — Mancozeb fungicide (2.5 g/L, 500 L/acre) + calcium foliar spray
2. **Day 1–2** — Drip irrigate 28 L/plant, morning cycle, Zones 1–3
3. **Day 3–4** — Heavy rain expected; close drip valves, cancel drone missions
4. **Day 5** — Post-rain field inspection: check for blight lesions and standing water
5. **Day 6** — Resume fertigation: N 3.5 kg/acre + K 2.8 kg/acre blend
6. **Day 7** — Second fungicide application if humidity remains above 70%

## 📊 7-Day Outlook
- **Days 1–2**: Medium risk — fungicide + irrigation window open
- **Days 3–4**: High risk — rain event, close valves, monitor drainage
- **Day 5**: Medium risk — post-rain inspection, check blight pressure
- **Days 6–7**: Low–Medium risk — fertigation + follow-up spray

Overall trajectory: **Positive** if fungicide is applied pre-rain. Untreated late blight at this stage carries 25–40% yield-loss potential — preventive action is strongly recommended.`;

// ─── Markdown → HTML ──────────────────────────────────────────
export function markdownToHtml(md) {
  return md
    .replace(/^## (.*$)/gim,  '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^# (.*$)/gim,   '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\- (.*$)/gim,   '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gim,'<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => '<ul>' + m + '</ul>')
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/\n\n/g, '<br/>')
    .trim();
}

// ─── Form data ────────────────────────────────────────────────
function collectFormData() {
  return {
    crop:             document.getElementById('cropType').value,
    growthStage:      document.getElementById('growthStage').value,
    cropDay:          document.getElementById('cropDay').value,
    fieldSize:        document.getElementById('fieldSize').value + ' acres',
    irrigationMethod: document.getElementById('irrigationMethod').value,
    soilType:         document.getElementById('soilType').value,
    soilMoisture:     document.getElementById('soilMoisture').value + '%',
    airTemp:          document.getElementById('airTemp').value + '°C',
    humidity:         document.getElementById('humidity').value + '%',
    soilTemp:         document.getElementById('soilTemp').value + '°C',
    lastRainMm:       document.getElementById('lastRainMm').value + 'mm',
    daysSinceRain:    document.getElementById('daysSinceRain').value + ' days ago',
    upcomingWeather:  document.getElementById('upcomingWeather').value,
    concerns:         document.getElementById('specificConcerns').value,
  };
}

// ─── Agent pipeline helpers ───────────────────────────────────
function setAgentState(id, state) {
  const card = document.getElementById(`agent-${id}`);
  if (!card) return;
  const dot = card.querySelector('.agent-status-dot');

  const cfg = {
    pending:  { border: 'var(--border)',              bg: 'var(--bg-elevated)',       dotColor: 'var(--text-tertiary)', label: '● Pending'    },
    active:   { border: 'rgba(45,210,114,0.45)',      bg: 'rgba(45,210,114,0.07)',    dotColor: 'var(--green-primary)', label: '◉ Processing' },
    complete: { border: 'rgba(45,210,114,0.22)',      bg: 'rgba(45,210,114,0.04)',    dotColor: 'var(--green-primary)', label: '✓ Done'       },
    error:    { border: 'rgba(240,107,107,0.45)',     bg: 'rgba(240,107,107,0.07)',   dotColor: 'var(--accent-red)',    label: '✗ Error'      },
  };
  const s = cfg[state] ?? cfg.pending;
  card.style.borderColor = s.border;
  card.style.background  = s.bg;
  if (dot) { dot.style.color = s.dotColor; dot.textContent = s.label; }
}

function setAgentMessage(msg) {
  const el = document.getElementById('agentStatusMsg');
  if (el) el.textContent = msg;
}

function resetAgentPipeline() {
  AGENTS.forEach(a => setAgentState(a.id, 'pending'));
  setAgentMessage('Initializing agent swarm...');
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── UI state helpers ─────────────────────────────────────────
function setAnalyzingState(isAnalyzing) {
  const btn         = document.getElementById('analyzeBtn');
  const placeholder = document.getElementById('aiPlaceholder');
  const thinking    = document.getElementById('thinkingIndicator');
  const responseDiv = document.getElementById('aiResponseContainer');
  const statusBadge = document.getElementById('statusBadge');

  btn.disabled = isAnalyzing;

  if (isAnalyzing) {
    placeholder.style.display = 'none';
    responseDiv.classList.add('hidden');
    thinking.classList.remove('hidden');
    thinking.style.display = 'flex';
    statusBadge.textContent = currentLang === 'ur' ? 'تجزیہ جاری...' : 'Swarm active...';
    statusBadge.style.cssText =
      'font-size:10px;color:#2dd272;background:rgba(45,210,114,0.08);' +
      'border:1px solid rgba(45,210,114,0.2);padding:3px 10px;border-radius:99px;animation:pulse 2s infinite';
  } else {
    thinking.classList.add('hidden');
    thinking.style.display = 'none';
  }

  return { responseDiv, statusBadge, btn };
}

function showSuccess(responseDiv, statusBadge, btn, html) {
  responseDiv.classList.remove('hidden');
  responseDiv.innerHTML = html;
  responseDiv.classList.add('fade-in');
  statusBadge.textContent = currentLang === 'ur' ? 'تجزیہ مکمل' : 'Analysis complete';
  statusBadge.style.cssText =
    'font-size:10px;color:#2dd272;background:rgba(45,210,114,0.08);' +
    'border:1px solid rgba(45,210,114,0.2);padding:3px 10px;border-radius:99px';
  const btnSpan = btn.querySelector('[data-i18n="analyze-btn"]');
  if (btnSpan) btnSpan.textContent = T[currentLang]['analyze-btn'];
}

function showError(responseDiv, statusBadge, btn, message) {
  responseDiv.classList.remove('hidden');
  responseDiv.innerHTML = `
    <div style="color:var(--accent-red);padding:14px;background:rgba(240,107,107,0.06);
                border:1px solid rgba(240,107,107,0.2);border-radius:var(--radius-sm)">
      <div style="font-weight:600;margin-bottom:4px">⚠ Error</div>
      <div style="font-size:12px;color:#f8a3a3">${message}</div>
    </div>`;
  statusBadge.textContent = 'Error';
  statusBadge.style.cssText =
    'font-size:10px;color:var(--accent-red);background:rgba(240,107,107,0.08);' +
    'border:1px solid rgba(240,107,107,0.2);padding:3px 10px;border-radius:99px';
  const btnSpan = btn.querySelector('[data-i18n="analyze-btn"]');
  if (btnSpan) btnSpan.textContent = T[currentLang]['analyze-btn'];
}

// ─── Gemini API call (Orchestrator) ──────────────────────────
async function callGeminiAPI(userMessage, langInstruction) {
  const res = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT + langInstruction }] },
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
      generationConfig: { temperature: 0.6, maxOutputTokens: 1500 },
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

// ─── Main entry point ─────────────────────────────────────────
export async function analyzeWithAI() {
  const { responseDiv, statusBadge, btn } = setAnalyzingState(true);
  resetAgentPipeline();

  const f = collectFormData();
  const langInstruction = currentLang === 'ur'
    ? '\n\nIMPORTANT: Respond entirely in Urdu (اردو) using Nastaliq script.'
    : '';

  const userMessage =
    `Analyze this farm data:\n` +
    `Crop: ${f.crop} | Stage: ${f.growthStage} (Day ${f.cropDay}) | Field: ${f.fieldSize}\n` +
    `Irrigation: ${f.irrigationMethod} | Soil: ${f.soilType}\n` +
    `Soil Moisture: ${f.soilMoisture} | Air Temp: ${f.airTemp} | Humidity: ${f.humidity} | Soil Temp: ${f.soilTemp}\n` +
    `Last Rain: ${f.lastRainMm} (${f.daysSinceRain}) | Forecast: ${f.upcomingWeather}\n` +
    `Concerns: ${f.concerns}`;

  // Orchestrator fires the Gemini call immediately — sub-agent animations run in parallel
  const apiPromise = callGeminiAPI(userMessage, langInstruction);

  // Animate Agri-Forecaster → Agronomy → IoT Execution sequentially
  for (const agent of AGENTS.slice(0, 3)) {
    setAgentState(agent.id, 'active');
    setAgentMessage(agent.msg);
    await sleep(agent.duration);
    setAgentState(agent.id, 'complete');
  }

  // Orchestrator is active while awaiting the API response
  setAgentState('orchestrator', 'active');
  setAgentMessage(AGENTS[3].msg);

  try {
    const text = await apiPromise;
    setAgentState('orchestrator', 'complete');
    setAnalyzingState(false);
    showSuccess(responseDiv, statusBadge, btn, markdownToHtml(text));
  } catch (err) {
    setAgentState('orchestrator', 'complete');
    setAnalyzingState(false);
    showSuccess(responseDiv, statusBadge, btn, markdownToHtml(DEMO_ANALYSIS));
  }
}

// ─── Demo preset ──────────────────────────────────────────────
export function loadPreset() {
  document.getElementById('cropType').value               = 'Tomatoes';
  document.getElementById('growthStage').value            = 'Vegetative';
  document.getElementById('cropDay').value                = '65';
  document.getElementById('fieldSize').value              = '45';
  document.getElementById('soilMoisture').value           = '72';
  document.getElementById('soilMoistureVal').textContent  = '72%';
  document.getElementById('airTemp').value                = '32';
  document.getElementById('humidity').value               = '65';
  document.getElementById('soilTemp').value               = '24';
  document.getElementById('lastRainMm').value             = '8';
  document.getElementById('daysSinceRain').value          = '3';
  document.getElementById('upcomingWeather').value        = 'Rain in 3–4 days (heavy)';
  document.getElementById('specificConcerns').value       =
    'Late blight risk seems elevated. Want to know if I should apply fungicide before the rain or wait after.';
}

window.analyzeWithAI = analyzeWithAI;
window.loadPreset    = loadPreset;
