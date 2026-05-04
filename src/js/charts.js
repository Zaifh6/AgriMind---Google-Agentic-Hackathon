/**
 * AgriMind — Charts Module
 * Initialises Chart.js visualisations:
 *   1. Soil Moisture Trend (7-day line chart) — Dashboard
 *   2. 48-Hour Hourly Forecast (bar + line combo) — Weather view
 *
 * Depends on Chart.js loaded via CDN in index.html.
 */

// ─── Chart.js defaults ────────────────────────────────────────
Chart.defaults.color        = '#4a6355';
Chart.defaults.borderColor  = 'rgba(255,255,255,0.05)';
Chart.defaults.font.family  = "'DM Sans', system-ui, sans-serif";

// ─── 1. Soil Moisture Trend ───────────────────────────────────
/**
 * Renders the 7-day soil moisture line chart on the Dashboard.
 */
export function initSoilMoistureChart() {
  const ctx = document.getElementById('soilMoistureChart');
  if (!ctx) return;

  new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: ['Apr 24', 'Apr 25', 'Apr 26', 'Apr 27', 'Apr 28', 'Apr 29', 'Apr 30'],
      datasets: [
        {
          label: 'Zone 1',
          data: [82, 78, 74, 80, 77, 80, 78],
          borderColor:     '#60b8f8',
          backgroundColor: 'rgba(96,184,248,0.04)',
          tension: 0.4, pointRadius: 3, pointBackgroundColor: '#60b8f8', borderWidth: 2,
        },
        {
          label: 'Zone 2',
          data: [74, 70, 65, 72, 68, 64, 61],
          borderColor:     '#f5c542',
          backgroundColor: 'rgba(245,197,66,0.04)',
          tension: 0.4, pointRadius: 3, pointBackgroundColor: '#f5c542', borderWidth: 2,
        },
        {
          label: 'Zone 3',
          data: [80, 84, 80, 85, 82, 83, 82],
          borderColor:     '#2dd272',
          backgroundColor: 'rgba(45,210,114,0.04)',
          tension: 0.4, pointRadius: 3, pointBackgroundColor: '#2dd272', borderWidth: 2,
        },
        {
          label: 'Zone 4',
          data: [70, 65, 60, 68, 58, 52, 48],
          borderColor:     '#f06b6b',
          backgroundColor: 'rgba(240,107,107,0.04)',
          tension: 0.4, pointRadius: 3, pointBackgroundColor: '#f06b6b', borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          min: 30, max: 100,
          grid:  { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => v + '%', font: { size: 11 } },
        },
        x: {
          grid:  { color: 'rgba(255,255,255,0.04)' },
          ticks: { font: { size: 11 } },
        },
      },
    },
  });
}

// ─── 2. 48-Hour Hourly Forecast ───────────────────────────────
/**
 * Renders the 48-hour bar+line combo chart on the Weather view.
 */
export function initHourlyWeatherChart() {
  const ctx = document.getElementById('hourlyChart');
  if (!ctx) return;

  // Build hour labels: 9 AM → midnight → 8 AM (next day)
  const hours = [];
  for (let i = 9; i <= 24; i++) hours.push(i === 24 ? '12AM' : (i > 12 ? (i - 12) + 'PM' : i + 'AM'));
  for (let i = 1; i <= 8;  i++) hours.push(i + 'AM');

  new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: hours,
      datasets: [
        {
          label: 'Temp (°C)',
          type: 'line',
          data: [32,34,35,35,34,32,30,28,26,24,23,22,22,21,21,22,24,25,27,28,29,30,31,32],
          borderColor:     '#f5945c',
          backgroundColor: 'transparent',
          tension: 0.4, yAxisID: 'y', pointRadius: 2, borderWidth: 2,
        },
        {
          label: 'Rain %',
          data: [0,0,0,0,0,5,5,5,5,10,10,10,10,15,20,25,30,35,35,30,25,20,15,10],
          backgroundColor: 'rgba(96,184,248,0.25)',
          borderColor:     'rgba(96,184,248,0.5)',
          borderWidth: 1, yAxisID: 'y1', borderRadius: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { boxWidth: 10, font: { size: 11 } } } },
      scales: {
        y: {
          position: 'left',
          grid:  { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => v + '°', font: { size: 11 } },
        },
        y1: {
          position: 'right',
          min: 0, max: 100,
          grid:  { drawOnChartArea: false },
          ticks: { callback: v => v + '%', font: { size: 11 } },
        },
        x: {
          grid:  { display: false },
          ticks: { font: { size: 10 }, maxRotation: 0 },
        },
      },
    },
  });
}
