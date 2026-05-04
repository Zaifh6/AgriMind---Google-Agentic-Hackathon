# 🌿 AgriMind — Autonomous AI Farming Agent

> **Google Agentic Hackathon 2026** · Built for smallholder farmers across South Asia

AgriMind is an autonomous AI-powered farming agent that ingests real-time sensor data, weather forecasts, and crop telemetry to deliver proactive, actionable decisions — in **English** and **Urdu (اردو)**.

![AgriMind Dashboard](https://placehold.co/1200x600/0d1410/2dd272?text=AgriMind+Dashboard)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Farm Dashboard** | Live KPIs — water savings, yield forecast, disease risk, active alerts |
| **AI Agent (Gemini 2.5 Pro)** | Submit sensor readings and get a structured, 7-section autonomous action plan |
| **Alert Center** | Priority-ranked alerts with one-tap approve / snooze / dismiss |
| **Hyperlocal Weather** | 48-hour hourly chart + 7-day table with per-day AgriMind advisories |
| **3D Field Map** | Interactive isometric heatmap with Moisture / Temperature / NDVI / Elevation layers |
| **Bilingual UI** | Full EN ↔ اردو toggle with Nastaliq font and RTL layout support |

---

## 🗂 Project Structure

```
AgriMind/
├── index.html              # App shell — HTML structure, no inline scripts
├── README.md
├── .gitignore
└── src/
    ├── css/
    │   └── styles.css      # All design tokens, components, and utilities
    └── js/
        ├── app.js          # Entry point — navigation, DOMContentLoaded init
        ├── i18n.js         # Translation strings (EN / UR) + setLanguage()
        ├── ai-agent.js     # Gemini API integration + form handling
        ├── charts.js       # Chart.js: soil moisture trend + hourly weather
        └── field-map.js    # 3D isometric canvas field map + sparklines
```

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/Zaifh6/AgriMind---Google-Agentic-Hackathon.git
cd AgriMind---Google-Agentic-Hackathon
```

### 2. Add your Gemini API key

Open `src/js/ai-agent.js` and replace the placeholder:

```js
// Line 14
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
```

> **Security tip:** For production, proxy the API call through a backend server and load the key from an environment variable. Never expose raw API keys in a public repository.

### 3. Serve the app

AgriMind is a pure front-end app — no build step needed. You can use any static server:

```bash
# Option A — Python (built-in)
python -m http.server 8080

# Option B — Node.js (npx)
npx serve .

# Option C — VS Code Live Server
# Right-click index.html → "Open with Live Server"
```

Then open **http://localhost:8080** in your browser.

> ⚠️ The app uses ES Modules (`type="module"`), so it **must** be served over HTTP/HTTPS — opening `index.html` directly via `file://` will not work.

---

## 🔑 Configuration

| Variable | File | Description |
|---|---|---|
| `GEMINI_API_KEY` | `src/js/ai-agent.js` | Your Google Gemini API key |
| `GEMINI_MODEL` | `src/js/ai-agent.js` | Model name (default: `gemini-2.5-pro`) |

---

## 🧠 AI Agent — How it Works

1. The farmer fills in crop details, sensor readings, and weather data in the **AI Agent** view.
2. AgriMind constructs a structured prompt and sends it to **Gemini 2.5 Pro** via the Generative Language API.
3. The response is parsed from Markdown and rendered in the **AgriMind Analysis** panel.
4. If Urdu mode is active, the model is instructed to respond fully in **Nastaliq Urdu**.

### System prompt sections generated

```
## 🌡 Current Farm Assessment
## 💧 Irrigation Recommendation
## 🦠 Disease & Pest Risk
## 🌤 Weather Advisory
## 🌱 Nutrient & Fertilizer Guidance
## ✅ Priority Action Plan (Next 7 Days)
## 📊 7-Day Outlook
```

---

## 🌐 Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | Vanilla HTML / CSS / JS (ES Modules) |
| Styling | Custom CSS design system + Tailwind CDN (utility assist) |
| Charts | [Chart.js 4.4](https://www.chartjs.org/) |
| 3D Field Map | HTML5 Canvas 2D (isometric projection, custom renderer) |
| AI Backend | [Google Gemini 2.5 Pro](https://ai.google.dev/) |
| Fonts | DM Sans, DM Mono, Noto Nastaliq Urdu (Google Fonts) |

---

## 📱 Views

### Dashboard
Real-time farm KPIs, 7-day weather strip, live irrigation zone status, disease/pest risk bars, and the AI-generated daily action plan.

### AI Agent
Form-driven interface to submit farm sensor data. Integrates live with Gemini 2.5 Pro to generate a full autonomous farming plan with specific volumes, dates, and doses.

### Alert Center
Prioritised alerts (Critical / High / Medium / Info) with contextual one-tap actions: approve irrigation, schedule treatment, snooze, or dismiss.

### Hyperlocal Weather
48-hour hourly temperature + rain probability chart, current conditions panel, and 7-day table with daily AgriMind agronomic advisories.

### Field Map (3D)
Interactive isometric heatmap rendered on HTML5 Canvas. Supports four data layers (Moisture, Temperature, NDVI, Elevation), draggable panning, zone highlighting with click, per-zone sparklines, and a live tooltip.

---

## 🌍 Bilingual Support

- Toggle between **English** and **اردو** at any time using the sidebar language switcher.
- Switching to Urdu applies **Noto Nastaliq Urdu** font, **RTL layout** (`dir="rtl"`), and instructs the AI to respond in Urdu.
- All UI strings are managed in `src/js/i18n.js`.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

## 👥 Team

Built with 🌱 for the **Google Agentic Hackathon 2026** by the AgriMind team.
