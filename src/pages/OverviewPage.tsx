import React from 'react';
import { HeroUnderwaterPanel } from '../components/dashboard/HeroUnderwaterPanel';
import { SensorStrip } from '../components/dashboard/SensorStrip';
import { ThrusterGauges } from '../components/dashboard/ThrusterGauges';
import { SensorFusionCard } from '../components/dashboard/SensorFusionCard';
import { MiniSurveyTrack } from '../components/dashboard/MiniSurveyTrack';

export const OverviewPage: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* HERO FEATURE — 55–60% LIVE UNDERWATER MISSION VIEW */}
      <section>
        <HeroUnderwaterPanel />
      </section>

      {/* COMPACT SUPPORTING TELEMETRY ROW */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <SensorStrip />
        <ThrusterGauges />
        <SensorFusionCard />
        <MiniSurveyTrack />
      </section>
    </div>
  );
};
