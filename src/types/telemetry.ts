export interface PixhawkTelemetry {
  online: boolean;
  mode: 'DEPTH HOLD' | 'STABILIZE' | 'SURVEY NAV' | 'MANUAL';
  depth: number; // in meters (e.g. 4826)
  targetDepth: number; // in meters (e.g. 5000)
  altitude: number; // seafloor clearance in meters (e.g. 3.2)
  pitch: number; // degrees (e.g. -1.2)
  roll: number; // degrees (e.g. +0.8)
  heading: number; // degrees (e.g. 184)
  speed: number; // knots (e.g. 0.8)
  battery: number; // percent (e.g. 92)
  escsOnline: number; // e.g. 4
  escsTotal: number; // e.g. 4
}

export interface ThrusterOutput {
  vertical: number; // % (e.g. 34)
  forward: number; // % (e.g. 22)
  port: number; // % (e.g. 12)
  starboard: number; // % (e.g. 11)
  state: 'STABLE' | 'DESCENDING' | 'ASCENDING' | 'CORRECTING';
}

export interface SensorStatus {
  emi: 'LIVE' | 'CALIBRATING' | 'OFFLINE';
  mag: 'LIVE' | 'CALIBRATING' | 'OFFLINE';
  sp: 'LIVE' | 'CALIBRATING' | 'OFFLINE';
  camera: 'LIVE' | 'CALIBRATING' | 'OFFLINE';
  spectral: 'LIVE' | 'CALIBRATING' | 'OFFLINE';
}

export interface SensorFusionData {
  overallConfidence: number; // e.g. 82%
  emiContribution: number; // 89%
  magContribution: number; // 81%
  spContribution: number; // 72%
  opticalContribution: number; // 91%
  spectralContribution: number; // 64%
  classification: string; // 'POSSIBLE METAL-RICH ANOMALY'
  provenance: 'INFERRED' | 'DIRECT' | 'MODEL_VERIFIED';
}

export interface AnomalyTarget {
  id: string;
  name: string;
  lat: number;
  lng: number;
  depth: number;
  confidence: number;
  type: string;
  provenance: string;
  timestamp: string;
  detected: boolean;
  distanceToVehicle: number;
  signatures: {
    emi: string;
    mag: string;
    sp: string;
    spectral: string;
  };
}

export interface LogEntry {
  id: string;
  timestamp: string;
  system: 'PIXHAWK' | 'THRUSTERS' | 'SENSORS' | 'FUSION' | 'SAFETY';
  level: 'INFO' | 'WARN' | 'ALERT' | 'ERROR';
  message: string;
}
