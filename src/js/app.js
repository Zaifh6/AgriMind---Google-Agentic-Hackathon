/**
 * AgriMind — Main Application Entry Point
 *
 * Bootstraps the app on DOMContentLoaded:
 *   - Wires up navigation
 *   - Initialises Chart.js charts
 *   - Initialises the 3D field map
 */

import { initSoilMoistureChart, initHourlyWeatherChart } from './charts.js';
import { initFieldMap } from './field-map.js';

// ─── Navigation ───────────────────────────────────────────────
/**
 * Switch between main views.
 * @param {string} name  - view id suffix (e.g. 'dashboard', 'ai-agent')
 * @param {Element} el   - the clicked sidebar item element
 */
export function switchView(name, el) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  el.classList.add('active');
}

/** Expose to inline onclick handlers */
window.switchView = switchView;

// ─── Alert actions ────────────────────────────────────────────
/**
 * Mark an irrigation approval button as confirmed.
 * @param {HTMLButtonElement} btn
 */
export function approveIrrigation(btn) {
  // Import currentLang lazily to avoid circular deps at module load time
  import('./i18n.js').then(({ currentLang }) => {
    btn.textContent = currentLang === 'ur'
      ? '✓ منظور — شام ۳:۳۰ آبپاشی'
      : '✓ Approved — Irrigation at 3:30 PM';
    btn.disabled = true;
    btn.style.opacity = '0.6';
  });
}

/** Expose to inline onclick handlers */
window.approveIrrigation = approveIrrigation;

// ─── Bootstrap ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSoilMoistureChart();
  initHourlyWeatherChart();
  initFieldMap();
});
