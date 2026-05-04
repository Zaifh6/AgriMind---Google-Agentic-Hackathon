/**
 * AgriMind — AI Agent Module
 * Integrates with Google Gemini 2.5 Pro to generate
 * autonomous farming recommendations.
 *
 * ⚠️  IMPORTANT: Replace GEMINI_API_KEY with your own key
 *     before deploying. Never commit raw API keys to a
 *     public repository — use environment variables or a
 *     backend proxy instead.
 */

import { currentLang, T } from './i18n.js';

// ─── Config ──────────────────────────────────────────────────
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // TODO: replace
const GEMINI_MODEL   = 'gemini-2.5-pro';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// ─── System prompt ────────────────────────────────────────────
const SYSTEM_PROMPT = `You are AgriMind, an autonomous AI farming agent. Analyze farm data and produce structured, highly actionable recommendations.

Format your response using EXACTLY these section headers:
## 🌡 Current Farm Assessment
## 💧 Irrigation Recommendation
## 🦠 Disease & Pest Risk
## 🌤 Weather Advisory
## 🌱 Nutrient & Fertilizer Guidance
## ✅ Priority Action Plan (Next 7 Days)
## 📊 7-Day Outlook

Always give specific numbers: volumes in liters, doses in g/L, dates. Be direct and confident.`;

// ─── Markdown → HTML ──────────────────────────────────────────
/**
 * Converts a basic Markdown string to HTML.
 * @param {string} md
 * @returns {string}
 */
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

// ─── Collect form data ────────────────────────────────────────
function collectFormData() {
  return {
    crop:            document.getElementById('cropType').value,
    growthStage:     document.getElementById('growthStage').value,
    cropDay:         document.getElementById('cropDay').value,
    fieldSize:       document.getElementById('fieldSize').value + ' acres',
    irrigationMethod:document.getElementById('irrigationMethod').value,
    soilType:        document.getElementById('soilType').value,
    soilMoisture:    document.getElementById('soilMoisture').value + '%',
    airTemp:         document.getElementById('airTemp').value + '°C',
    humidity:        document.getElementById('humidity').value + '%',
    soilTemp:        document.getElementById('soilTemp').value + '°C',
    lastRainMm:      document.getElementById('lastRainMm').value + 'mm',
    daysSinceRain:   document.getElementById('daysSinceRain').value + ' days ago',
    upcomingWeather: document.getElementById('upcomingWeather').value,
    concerns:        document.getElementById('specificConcerns').value,
  };
}

// ─── UI helpers ───────────────────────────────────────────────
function setAnalyzingState(isAnalyzing) {
  const btn          = document.getElementById('analyzeBtn');
  const placeholder  = document.getElementById('aiPlaceholder');
  const thinking     = document.getElementById('thinkingIndicator');
  const responseDiv  = document.getElementById('aiResponseContainer');
  const statusBadge  = document.getElementById('statusBadge');

  btn.disabled = isAnalyzing;

  if (isAnalyzing) {
    placeholder.style.display = 'none';
    responseDiv.classList.add('hidden');
    thinking.classList.remove('hidden');
    thinking.style.display = 'flex';
    statusBadge.textContent = currentLang === 'ur' ? 'تجزیہ جاری...' : 'Analyzing...';
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
  // Restore button label
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

// ─── Main analysis function ───────────────────────────────────
/**
 * Reads the AI Agent form, calls Gemini, and renders the result.
 */
export async function analyzeWithAI() {
  const { responseDiv, statusBadge, btn } = setAnalyzingState(true);

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

  try {
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
      const errData = await res.json();
      throw new Error(errData.error?.message || `API error ${res.status}`);
    }

    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;
    setAnalyzingState(false);
    showSuccess(responseDiv, statusBadge, btn, markdownToHtml(text));
  } catch (err) {
    setAnalyzingState(false);
    showError(responseDiv, statusBadge, btn, err.message);
  }
}

// ─── Demo preset ─────────────────────────────────────────────
/**
 * Fills the AI Agent form with demo data.
 */
export function loadPreset() {
  document.getElementById('cropType').value          = 'Tomatoes';
  document.getElementById('growthStage').value       = 'Vegetative';
  document.getElementById('cropDay').value           = '65';
  document.getElementById('fieldSize').value         = '45';
  document.getElementById('soilMoisture').value      = '72';
  document.getElementById('soilMoistureVal').textContent = '72%';
  document.getElementById('airTemp').value           = '32';
  document.getElementById('humidity').value          = '65';
  document.getElementById('soilTemp').value          = '24';
  document.getElementById('lastRainMm').value        = '8';
  document.getElementById('daysSinceRain').value     = '3';
  document.getElementById('upcomingWeather').value   = 'Rain in 3–4 days (heavy)';
  document.getElementById('specificConcerns').value  =
    'Late blight risk seems elevated. Want to know if I should apply fungicide before the rain or wait after.';
}

/** Expose to inline onclick handlers */
window.analyzeWithAI = analyzeWithAI;
window.loadPreset    = loadPreset;
