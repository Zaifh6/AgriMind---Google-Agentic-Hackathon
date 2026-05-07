# 🌿 AgriMind — Multi-Agent AI Farming System

> **Google Agentic Hackathon 2026** · Built for smallholder farmers across South Asia

AgriMind is a **multi-agent AI farming system** that orchestrates a swarm of specialised agents — each grounded in real-time satellite, weather, and IoT data — to deliver proactive, autonomous farm decisions in **English** and **Urdu (اردو)**.

![AgriMind Dashboard](https://placehold.co/1200x600/0d1410/2dd272?text=AgriMind+Dashboard)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Farm Dashboard** | Live KPIs — water savings, yield forecast, disease risk, active alerts |
| **Multi-Agent Swarm (ADK)** | Four specialised agents collaborate: Agri-Forecaster → Agronomy (RAG) → IoT Execution → Orchestrator |
| **Grounding & RAG** | Agronomy Agent queries Vertex AI Search over the proprietary crop-disease knowledge base; field boundaries via Google Maps API |
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

## 🤖 Multi-Agent Architecture (ADK)

AgriMind's reasoning layer is a **four-agent swarm** orchestrated via the [Agent Development Kit (ADK)](https://google.github.io/adk-docs/). The Orchestrator delegates tasks to specialised sub-agents and synthesises their outputs into a unified daily farm plan.

```
┌──────────────────────────────────────────────────────────────────┐
│                    AgriMind Agent Swarm (ADK)                    │
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐                     │
│  │ Agri-Forecaster │    │    Agronomy      │                     │
│  │     Agent       │    │     Agent        │                     │
│  │                 │    │                  │                     │
│  │ • ECMWF weather │    │ • Vertex AI RAG  │                     │
│  │ • Sentinel-2    │    │ • Crop-disease   │                     │
│  │   NDVI satellite│    │   knowledge base │                     │
│  │ • Google Maps   │    │ • Treatment      │                     │
│  │   field boundary│    │   protocols      │                     │
│  └────────┬────────┘    └────────┬─────────┘                    │
│           │                      │                               │
│           └──────────┬───────────┘                               │
│                      ▼                                           │
│           ┌─────────────────────┐    ┌──────────────────────┐   │
│           │  IoT Execution       │    │   Orchestrator Agent │   │
│           │  Agent               │───▶│   (ADK Router)       │   │
│           │                     │    │                      │   │
│           │ • MQTT valve cmds   │    │ • Synthesises all    │   │
│           │ • Drone GPS waypts  │    │   sub-agent outputs  │   │
│           │ • Schedule triggers │    │ • Gemini 2.5 Pro LLM │   │
│           └─────────────────────┘    │ • Final daily plan   │   │
│                                      └──────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Agent responsibilities

| Agent | Responsibility | Data sources |
|---|---|---|
| **Agri-Forecaster** | Weather & satellite ingestion | Open-Meteo ECMWF blend, Sentinel-2 NDVI, Google Maps API (field boundaries) |
| **Agronomy** | Crop health analysis via RAG | Vertex AI Search over proprietary crop-disease knowledge base |
| **IoT Execution** | Hardware command generation | MQTT broker (drip valves), drone mission planner (GPS waypoints) |
| **Orchestrator** | Task routing & plan synthesis | All sub-agent outputs → Gemini 2.5 Pro |

### Orchestrator system prompt (excerpt)

```
You are the AgriMind Orchestrator Agent, the central router in a
multi-agent farming swarm deployed on Google Cloud Run via the ADK.

You have received delegated analysis from three specialised sub-agents:
• Agri-Forecaster Agent — ECMWF weather + Sentinel-2 NDVI; field
  boundaries via Google Maps API.
• Agronomy Agent — RAG over crop-disease knowledge base via Vertex AI
  Search; disease thresholds and treatment protocols.
• IoT Execution Agent — MQTT valve schedules and drone spray missions.

Synthesise into a unified daily plan…
```

---

## 🔍 Grounding & RAG

### Vertex AI Search — Agronomy RAG

The **Agronomy Agent** performs Retrieval-Augmented Generation (RAG) over AgriMind's private crop-disease knowledge base using **Vertex AI Search**. At query time, the agent retrieves the top-K most relevant documents (disease pressure curves, fungicide efficacy tables, regional spray calendars) and injects them as grounding context into the Orchestrator's prompt.

```
Farmer query + sensor data
        │
        ▼
Vertex AI Search ──── crop-disease corpus ────▶ top-K chunks
        │
        ▼
Agronomy Agent builds grounded context block
        │
        ▼
Orchestrator prompt (grounded) ──▶ Gemini 2.5 Pro
```

### Google Maps API — Spatial Grounding

The **Agri-Forecaster Agent** uses the **Google Maps API** to:
- Resolve field boundaries from GPS coordinates into precise polygon geometries
- Clip NDVI satellite tiles to the exact field extent
- Derive elevation profiles for drainage and runoff modelling

This spatial grounding ensures weather and soil recommendations are specific to the farm's actual geography, not a generic grid cell.

---

## 🧠 Multi-Agent Analysis Flow

1. The farmer fills in crop details, sensor readings, and weather data in the **AI Agent** view.
2. The **Orchestrator** fires the Gemini 2.5 Pro call and simultaneously triggers the sub-agent delegation pipeline.
3. **Agri-Forecaster** ingests ECMWF weather + Sentinel-2 NDVI; Google Maps API resolves field boundaries.
4. **Agronomy Agent** queries Vertex AI Search for RAG-grounded disease and nutrient guidance.
5. **IoT Execution Agent** translates agronomic outputs to MQTT valve commands and drone waypoints.
6. The **Orchestrator** synthesises all sub-agent outputs into the final 7-section plan.
7. If Urdu mode is active, the model responds fully in **Nastaliq Urdu**.

### Output sections

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
| Agent Orchestration | [Agent Development Kit (ADK)](https://google.github.io/adk-docs/) |
| LLM (Orchestrator) | [Google Gemini 2.5 Pro](https://ai.google.dev/) |
| RAG / Grounding | [Vertex AI Search](https://cloud.google.com/vertex-ai/docs/generative-ai/retrieval-augmented-generation/rag-overview) |
| Spatial Grounding | [Google Maps API](https://developers.google.com/maps) — field boundary & elevation |
| Weather Data | Open-Meteo ECMWF blend |
| Satellite Imagery | Sentinel-2 NDVI (via Google Earth Engine) |
| IoT Layer | MQTT (drip valves), drone mission planner |
| Fonts | DM Sans, DM Mono, Noto Nastaliq Urdu (Google Fonts) |

---

## ☁ Infrastructure & Deployment

AgriMind is deployed entirely on **Google Cloud Platform (GCP)** — there is no AWS dependency.

```
┌─────────────────────────────────────────────────┐
│              Google Cloud Platform              │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │           Agent Engine                   │  │
│  │  Manages agent lifecycle, routing, and   │  │
│  │  observability for the ADK swarm         │  │
│  └────────────────┬─────────────────────────┘  │
│                   │                             │
│        ┌──────────┴──────────┐                 │
│        ▼                     ▼                 │
│  ┌───────────┐         ┌───────────┐           │
│  │ Cloud Run │         │    GKE    │           │
│  │ (stateless│         │ (stateful │           │
│  │  agents)  │         │  services)│           │
│  └───────────┘         └───────────┘           │
│                                                 │
│  ┌──────────────┐   ┌───────────────────────┐  │
│  │ Vertex AI    │   │  Cloud Pub/Sub (MQTT   │  │
│  │ Search (RAG) │   │  bridge for IoT layer) │  │
│  └──────────────┘   └───────────────────────┘  │
└─────────────────────────────────────────────────┘
```

| Service | Role |
|---|---|
| **Agent Engine** | Manages the ADK agent swarm — lifecycle, routing, health, and tracing |
| **Cloud Run** | Hosts stateless sub-agents (Agri-Forecaster, Agronomy, IoT Execution) — auto-scales to zero |
| **GKE** | Hosts stateful services (Vertex AI Search index serving, MQTT broker) |
| **Vertex AI Search** | Serves the crop-disease RAG index for the Agronomy Agent |
| **Cloud Pub/Sub** | MQTT bridge — IoT Execution Agent publishes valve commands to field devices |
| **Gemini 2.5 Pro** | LLM powering the Orchestrator's final synthesis step |

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
