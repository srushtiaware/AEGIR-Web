# AEGIR Deep-Ocean Mission Control System

## Project Overview & Purpose

The **AEGIR Deep-Ocean Mission Control System** is a professional, high-performance web interface designed for monitoring and controlling the **AEGIR Autonomous Underwater Vehicle (AUV)**. 

The purpose of this platform is to provide mission operators and oceanographers with an uncrowded, real-time command dashboard featuring a live 3D WebGL underwater mission view, continuous Pixhawk autopilot telemetry integration, dynamic thruster activity visualization, multi-sensor fusion algorithms, spatial seafloor anomaly detection, and comprehensive diagnostic logging.

---

## Key Features

- **Live 3D WebGL Underwater Mission View**:
  - Central hero panel featuring realistic deep-ocean atmosphere, displaced seafloor terrain, polymetallic nodule deposit fields, marine snow particles, and spotlight illumination.
  - Procedural 3D model of the AEGIR AUV prototype (titanium pressure hull, matte black nose dome, yellow structural protection exoskeleton, hydrodynamic fins, tether umbilical line, mounted sensors, and 4 thrusters with bubble particle trails).
  - Smooth motion dynamics: pitch/roll micro-stabilization, altitude hover, dynamic seafloor translation, and thruster particle trail emission.
  - Live ROV camera HUD overlay (`● LIVE`, `SIMULATION MODE`, `MISSION: AEGIR-0264`, depth, altitude, speed, and heading).
- **Pixhawk Autopilot & Telemetry Integration**:
  - Floating autopilot panel displaying `DEPTH HOLD` mode, depth (4,826 m), pitch, roll, heading, thruster %, battery %, and ESC status.
  - Dynamic thruster output visualization (Vertical, Forward, Port, Starboard) with real-time altitude adjustment feedback.
  - Vertical depth gauge with current vehicle depth marker.
  - Seafloor clearance monitor with `OPTIMAL` / `CAUTION` status indicators.
- **Sensor Fusion & Spatial Anomaly Detection**:
  - 3D spatial target ring and laser scanning cone on seafloor when passing over anomalies.
  - Anomaly detection side panel displaying target classification and confidence score (82%).
  - Multi-sensor fusion score breakdown (EMI, Magnetometer, Self-Potential, Optical, Spectral).
  - Compact sensor activity status strip.
- **Multi-Page Mission Control Navigation**:
  - **Overview**: Uncrowded main dashboard focused on the central hero panel and core telemetry.
  - **Sensors**: Real-time streaming charts for EMI waveform (15 kHz), Magnetometer vector $B_z$, Self-Potential voltage drop, and Optical HD camera stream with edge AI bounding boxes.
  - **Seafloor Map**: Interactive 2D bathymetric heatmap with contour lines, survey path waypoints, nodule deposit zones, and target inspector.
  - **Anomalies**: Detailed anomaly catalog (`ANM-0264-A`, `ANM-0264-B`, `ANM-0264-C`), confidence breakdowns, sensor evidence signatures, and JSON/PDF report exporter.
  - **Analytics & Logs**: Real-time Pixhawk flight log stream, ESC performance diagnostics, thruster power curves, and battery health.
- **Dual Theme Support**:
  - High-contrast Light Mode (Professional Environmental Technology theme) and Dark Mode with instant top navigation switcher.

---

## Technologies Used

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 + Lucide Icons + Framer Motion
- **3D WebGL Engine**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Data Visualization**: Recharts

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Commands

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview the production build**:
   ```bash
   npm run preview
   ```
