import React from 'react';
import { UnderwaterScene } from '../3d/UnderwaterScene';
import { RovCameraOverlay } from './RovCameraOverlay';
import { DepthGauge } from './DepthGauge';
import { PixhawkTelemetryCard } from './PixhawkTelemetryCard';
import { AnomalySidePanel } from './AnomalySidePanel';

export const HeroUnderwaterPanel: React.FC = () => {
  return (
    <div className="relative w-full h-[520px] lg:h-[580px] rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-slate-950">
      {/* 3D WebGL Underwater Scene */}
      <UnderwaterScene />

      {/* ROV Live Camera Telemetry Overlay */}
      <RovCameraOverlay />

      {/* Left Slim Vertical Depth Gauge */}
      <DepthGauge />

      {/* Right Floating Pixhawk Telemetry Card */}
      <PixhawkTelemetryCard />

      {/* Spatial Anomaly Detection Side Panel */}
      <AnomalySidePanel />
    </div>
  );
};
