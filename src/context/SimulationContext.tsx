import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  PixhawkTelemetry,
  ThrusterOutput,
  SensorStatus,
  SensorFusionData,
  AnomalyTarget,
  LogEntry
} from '../types/telemetry';

export type ThemeMode = 'dark' | 'light';

interface SimulationContextType {
  pixhawk: PixhawkTelemetry;
  thrusters: ThrusterOutput;
  sensors: SensorStatus;
  sensorFusion: SensorFusionData;
  activeAnomaly: AnomalyTarget | null;
  anomaliesList: AnomalyTarget[];
  logs: LogEntry[];
  isSimulating: boolean;
  simSpeed: number;
  activeTab: string;
  theme: ThemeMode;
  toggleTheme: () => void;
  setActiveTab: (tab: string) => void;
  toggleSimulation: () => void;
  setSimSpeed: (speed: number) => void;
  triggerAnomalyEvent: () => void;
  changeTargetDepth: (newDepth: number) => void;
  dismissAnomalyPanel: () => void;
}

const initialAnomalies: AnomalyTarget[] = [
  {
    id: 'ANM-0264-A',
    name: 'Polymetallic Nodule Cluster Alpha',
    lat: -14.6284,
    lng: -125.4891,
    depth: 4826,
    confidence: 82,
    type: 'Polymetallic Nodule Deposit (Mn, Ni, Cu, Co)',
    provenance: 'INFERRED (Multi-Frequency EMI + Spectral)',
    timestamp: '10:45:22 UTC',
    detected: true,
    distanceToVehicle: 0,
    signatures: {
      emi: 'High conductivity spike at 15 kHz (89% signal-to-noise)',
      mag: 'Localized positive B_z anomaly (+42 nT)',
      sp: 'Electrochemical potential shift (-38 mV)',
      spectral: 'Distinct manganese oxide absorption band (620-680 nm)'
    }
  },
  {
    id: 'ANM-0264-B',
    name: 'Seafloor Massive Sulfide Outcrop',
    lat: -14.6312,
    lng: -125.4925,
    depth: 4840,
    confidence: 89,
    type: 'Ferromanganese Crust / Sulfide',
    provenance: 'DIRECT (Optical + EMI High Resolution)',
    timestamp: '09:12:05 UTC',
    detected: true,
    distanceToVehicle: 145,
    signatures: {
      emi: 'Broadband induction peak (94% confidence)',
      mag: 'Dipolar magnetic anomaly (+88 nT)',
      sp: 'Strong redox gradient (-65 mV)',
      spectral: 'High iron-copper sulfide signature'
    }
  },
  {
    id: 'ANM-0264-C',
    name: 'Deep Basin Nodule Pavement',
    lat: -14.6201,
    lng: -125.4780,
    depth: 4810,
    confidence: 76,
    type: 'High-Grade Nickel/Cobalt Nodule Field',
    provenance: 'INFERRED (SP + Magnetometer)',
    timestamp: '07:30:19 UTC',
    detected: false,
    distanceToVehicle: 420,
    signatures: {
      emi: 'Moderate eddy current response',
      mag: 'Uniform background variation (+18 nT)',
      sp: 'Low noise potential floor (-22 mV)',
      spectral: 'Mixed sediment and oxide reflectance'
    }
  }
];

const initialLogs: LogEntry[] = [
  { id: 'l1', timestamp: '10:46:01 UTC', system: 'PIXHAWK', level: 'INFO', message: 'Autopilot operating in DEPTH HOLD mode at 4,826 m. ESC telemetry normal.' },
  { id: 'l2', timestamp: '10:45:50 UTC', system: 'SAFETY', level: 'INFO', message: 'Seafloor clearance 3.2 m within OPTIMAL corridor (2.5 m - 5.0 m).' },
  { id: 'l3', timestamp: '10:45:22 UTC', system: 'FUSION', level: 'ALERT', message: 'Spatial anomaly ANM-0264-A passed over vehicle center line. Confidence 82%.' },
  { id: 'l4', timestamp: '10:44:10 UTC', system: 'THRUSTERS', level: 'INFO', message: 'Vertical thruster output auto-adjusted to 34% for altitude stabilization.' },
  { id: 'l5', timestamp: '10:42:00 UTC', system: 'SENSORS', level: 'INFO', message: 'EMI coil, Magnetometer array, SP electrodes, and Spectral camera stream LIVE.' }
];

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1.0);

  // Apply theme class to document root element
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [pixhawk, setPixhawk] = useState<PixhawkTelemetry>({
    online: true,
    mode: 'DEPTH HOLD',
    depth: 4826,
    targetDepth: 5000,
    altitude: 3.2,
    pitch: -1.2,
    roll: 0.8,
    heading: 184,
    speed: 0.8,
    battery: 92,
    escsOnline: 4,
    escsTotal: 4
  });

  const [thrusters, setThrusters] = useState<ThrusterOutput>({
    vertical: 34,
    forward: 22,
    port: 12,
    starboard: 11,
    state: 'STABLE'
  });

  const [sensors] = useState<SensorStatus>({
    emi: 'LIVE',
    mag: 'LIVE',
    sp: 'LIVE',
    camera: 'LIVE',
    spectral: 'LIVE'
  });

  const [sensorFusion, setSensorFusion] = useState<SensorFusionData>({
    overallConfidence: 82,
    emiContribution: 89,
    magContribution: 81,
    spContribution: 72,
    opticalContribution: 91,
    spectralContribution: 64,
    classification: 'POSSIBLE METAL-RICH ANOMALY',
    provenance: 'INFERRED'
  });

  const [anomaliesList] = useState<AnomalyTarget[]>(initialAnomalies);
  const [activeAnomaly, setActiveAnomaly] = useState<AnomalyTarget | null>(initialAnomalies[0]);
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);

  // Synchronized simulation loop
  useEffect(() => {
    if (!isSimulating) return;

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      const t = step * 0.1 * simSpeed;

      setPixhawk((prev) => {
        // Subtle pitch & roll stabilization dynamics
        const deltaPitch = Math.sin(t * 0.8) * 0.4 - 1.2;
        const deltaRoll = Math.cos(t * 0.6) * 0.3 + 0.8;
        const deltaHeading = (184 + Math.sin(t * 0.1) * 2) % 360;
        
        let newDepth = prev.depth;
        const seafloorFluctuation = Math.sin(t * 0.3) * 0.15;
        const newAltitude = Math.max(1.8, Math.min(4.8, 3.2 + seafloorFluctuation));

        if (Math.abs(prev.depth - prev.targetDepth) > 1) {
          const dir = prev.targetDepth > prev.depth ? 0.2 : -0.2;
          newDepth = Math.round(prev.depth + dir * simSpeed);
        }

        return {
          ...prev,
          pitch: Number(deltaPitch.toFixed(1)),
          roll: Number(deltaRoll.toFixed(1)),
          heading: Math.round(deltaHeading),
          altitude: Number(newAltitude.toFixed(1)),
          depth: newDepth
        };
      });

      setThrusters(() => {
        const altitude = pixhawk.altitude;
        let vThruster = 34;
        let state: ThrusterOutput['state'] = 'STABLE';

        if (altitude < 2.5) {
          vThruster = 42 + Math.floor(Math.random() * 4);
          state = 'CORRECTING';
        } else if (altitude > 4.0) {
          vThruster = 18 + Math.floor(Math.random() * 3);
          state = 'DESCENDING';
        } else {
          vThruster = 30 + Math.floor(Math.sin(t * 0.5) * 5);
          state = 'STABLE';
        }

        const fThruster = 22 + Math.floor(Math.sin(t * 0.4) * 3);
        const pThruster = 12 + Math.floor(Math.cos(t * 0.7) * 2);
        const sThruster = 11 + Math.floor(Math.sin(t * 0.6) * 2);

        return {
          vertical: Math.max(10, Math.min(90, vThruster)),
          forward: Math.max(10, Math.min(60, fThruster)),
          port: Math.max(5, Math.min(30, pThruster)),
          starboard: Math.max(5, Math.min(30, sThruster)),
          state
        };
      });

      if (step % 150 === 0) {
        const randomConf = Math.floor(78 + Math.random() * 14);
        setSensorFusion((prev) => ({
          ...prev,
          overallConfidence: randomConf,
          emiContribution: Math.min(98, randomConf + 7),
          magContribution: Math.min(95, randomConf - 2),
          spContribution: Math.min(92, randomConf - 10)
        }));

        setActiveAnomaly(initialAnomalies[0]);
        
        setLogs((prevLogs) => [
          {
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
            system: 'FUSION',
            level: 'ALERT',
            message: `Passed over seabed target ${initialAnomalies[0].id}. Sensor agreement ${randomConf}%.`
          },
          ...prevLogs.slice(0, 15)
        ]);
      }

    }, 200);

    return () => clearInterval(interval);
  }, [isSimulating, simSpeed, pixhawk.altitude, pixhawk.depth, pixhawk.targetDepth]);

  const toggleSimulation = () => setIsSimulating((prev) => !prev);

  const triggerAnomalyEvent = () => {
    setActiveAnomaly(initialAnomalies[0]);
    setSensorFusion((prev) => ({
      ...prev,
      overallConfidence: 89,
      emiContribution: 94,
      magContribution: 88,
      opticalContribution: 95
    }));
    setLogs((prevLogs) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
        system: 'FUSION',
        level: 'ALERT',
        message: 'MANUAL SIMULATION TRIGGER: High-density polymetallic nodule field detected.'
      },
      ...prevLogs
    ]);
  };

  const changeTargetDepth = (newDepth: number) => {
    setPixhawk((prev) => ({ ...prev, targetDepth: newDepth }));
    setLogs((prevLogs) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
        system: 'PIXHAWK',
        level: 'INFO',
        message: `Commanded target depth changed to ${newDepth} m.`
      },
      ...prevLogs
    ]);
  };

  const dismissAnomalyPanel = () => setActiveAnomaly(null);

  return (
    <SimulationContext.Provider
      value={{
        pixhawk,
        thrusters,
        sensors,
        sensorFusion,
        activeAnomaly,
        anomaliesList,
        logs,
        isSimulating,
        simSpeed,
        activeTab,
        theme,
        toggleTheme,
        setActiveTab,
        toggleSimulation,
        setSimSpeed,
        triggerAnomalyEvent,
        changeTargetDepth,
        dismissAnomalyPanel
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
