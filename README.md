# HPCvsCO2 - Demo App

An interactive web application to explore the discovery and screening process of metal catalysts for CO₂ conversion, featuring 3D molecular visualization and a step-by-step guided workflow.

---

## 🎯 Overview

**HPCvsCO2 - Demo App** is a React application that simulates and visualizes the discovery process of metal catalysts for CO2 conversion. The app offers:

- 🎬 **Introductory video** and audio narration for each step
- 🤖 **Catalyst generation** (Combinatorial or AI-driven)
- 📊 **Molecular property prediction** (HOMO-LUMO GAP)
- ⚡ **Binding energy calculation** for catalyst-substrate pairs
- 🎯 **Final candidate selection** based on optimal criteria


---


## 🛠️ Technologies Used

### Frontend Framework
- **React 18.2** - UI Library
- **Vite 4.4** - Build tool and dev server

### 3D Rendering
- **Three.js 0.180** - WebGL library
- **@react-three/fiber 8.18** - React renderer for Three.js
- **@react-three/drei 9.122** - Helper utilities for R3F

### Styling & UI
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **PostCSS 8.4** - CSS processor
- **Lucide React 0.263** - Icon library

### Performance
- **@tanstack/react-virtual 3.13** - List virtualization

---

## 📦 Prerequisites

Before starting, make sure you have installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **yarn** / **pnpm**)
- Modern browser with WebGL 2.0 support

---

## 🚀 Installation

### 1. Clone or download the repository

```bash
# Git repository
git clone <repository-url>
cd demo_app

# Or extract the .zip file
unzip demo_app.zip
cd demo_app
```

### 2. Install dependencies

```bash
npm install
```

This will install all dependencies listed in `package.json`:

```json
{
  "dependencies": {
    "@react-three/drei": "^9.122.0",
    "@react-three/fiber": "^8.18.0",
    "@tanstack/react-virtual": "^3.13.12",
    "lucide-react": "^0.263.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.180.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5"
  }
}
```

---

## 📁 Project Structure

```
catalyst-workflow/
│
├── public/                          # Static assets (NOT included in .zip)
│   ├── molecules/                   # XYZ molecule files
│   │   ├── manifest.json           # Manifest with molecule metadata
│   │   ├── *.xyz                   # Molecular coordinate files
│   ├── audio/                       # Audio files for narration
│   │   └── audio-*.mp3             # Audio for each step
│   ├── images/                      # Images and icons
│   │   └── *.png
│   └── video/                       # Introductory video (optional)
│
├── src/
│   ├── components/
│   │   ├── molecule-viewer/        # 3D molecule viewer
│   │   │   ├── Molecule3DViewer.jsx
│   │   │   └── utils.js            # XYZ parser and bond calculation
│   │   │
│   │   ├── workflow/                # Workflow step components
│   │   │   ├── VideoIntroStep.jsx
│   │   │   ├── WorkflowExplanationStep.jsx
│   │   │   ├── GenerationStep.jsx
│   │   │   ├── PropertyPredictionStep.jsx
│   │   │   ├── GapAnalysisStep.jsx
│   │   │   ├── BindingEnergyStep.jsx
│   │   │   └── FinalCandidatesStep.jsx
│   │   │
│   │   └── ui/                      # Generic UI components
│   │       ├── AudioControls.jsx
│   │       ├── BottomNavBar.jsx
│   │       ├── MoleculePopup.jsx
│   │       └── Glossary.jsx
│   │
│   ├── CatalystWorkflowApp.jsx     # Main component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Tailwind global styles
│
├── index.html                       # Main HTML
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
└── README.md                        # This file
```

---

## 🎬 Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at:
- **URL**: `http://localhost:3000`
- **Auto-open**: The browser will open automatically

### Production Build

Create an optimized production build:

```bash
npm run build
```

Optimized files will be generated in the `dist/` folder.

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

---

## 🐳 Docker Deployment

### Prerequisites
- Docker >= 20.10
- Docker Compose >= 2.0

### Quick Start

```bash

# 1. Start with Docker Compose
docker-compose up -d

# 2. Access at http://localhost:3000
```

### Basic Commands

```bash
docker-compose up -d      # Start
docker-compose down       # Stop
docker-compose logs -f    # View logs
docker-compose restart    # Restart
```

### Files Included

- **Dockerfile** - Multi-stage build (Node.js + nginx)
- **docker-compose.yml** - Container orchestration
- **nginx.conf** - Production server config (gzip, caching, SPA routing), change it for deploy


### Troubleshooting

**Port already in use:**
Edit `docker-compose.yml` and change `3000:80` to another port


**Rebuild after changes:**
```bash
docker-compose build --no-cache
docker-compose up -d
```

---

## 🔬 Application Workflow

### Step 0: Video Introduction
- Introductory video presenting the project
- Initial overlay with "Start Experience" button
- Automatic transition to next step

### Step 1: Workflow Explanation
- Methodological explanation of the process
- Visualization of example generated and filtered molecules
- Synchronized audio narration

### Step 2: Catalysts Generation
- **Mode selection**: Combinatorial vs AI-driven
- Generation of catalytic structures


### Step 3: Property Prediction
- HOMO-LUMO GAP prediction with ML


### Step 4: GAP Analysis and Filtering
- Molecule ranking by increasing GAP
- Interactive visualization with numerical values
- Identification of Top-k candidates for subsequent screening

### Step 5: Binding Energy
- Generation of catalyst-epoxide combinations
- Binding energy calculation

### Step 6: Final Candidates
- Final visualization of Top-3 best combinations
- Complete metrics: GAP + Binding Energy

---


## 🤝 Contributing

For questions or technical support, contact the development team.

---
