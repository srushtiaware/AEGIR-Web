import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Layers, CheckCircle2 } from 'lucide-react';

export const SensorFusionCard: React.FC = () => {
  const { sensorFusion, theme } = useSimulation();
  const isDark = theme === 'dark';

  const subScores = [
    { label: 'EMI', value: sensorFusion.emiContribution },
    { label: 'MAG', value: sensorFusion.magContribution },
    { label: 'SP', value: sensorFusion.spContribution },
    { label: 'OPTICAL', value: sensorFusion.opticalContribution },
    { label: 'SPECTRAL', value: sensorFusion.spectralContribution },
  ];

  return (
    <div className={`p-3 rounded-lg border text-xs font-mono select-none flex flex-col justify-between backdrop-blur-md transition-colors ${
      isDark
        ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100'
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between border-b pb-2 mb-2 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className={`flex items-center gap-1.5 font-bold text-[10px] tracking-wider ${
          isDark ? 'text-slate-200' : 'text-slate-800'
        }`}>
          <Layers className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          SENSOR FUSION
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded font-bold text-xs border ${
          isDark
            ? 'bg-cyan-950/60 border-cyan-500/30 text-cyan-300'
            : 'bg-cyan-50 border-cyan-300 text-cyan-800'
        }`}>
          <span>{sensorFusion.overallConfidence}%</span>
        </div>
      </div>

      {/* Sensor Agreement Grid */}
      <div className="grid grid-cols-5 gap-1.5 mb-2.5 text-center">
        {subScores.map((item, idx) => (
          <div key={idx} className={`border rounded p-1 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.label}</span>
            <span className={`font-bold text-[11px] ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{item.value}%</span>
          </div>
        ))}
      </div>

      {/* Classification & Provenance */}
      <div className={`space-y-1 p-2 rounded border text-[10px] ${
        isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex justify-between items-center">
          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Classification:</span>
          <span className={`font-bold truncate max-w-[170px] ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
            {sensorFusion.classification}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Provenance:</span>
          <span className={`font-semibold flex items-center gap-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {sensorFusion.provenance}
          </span>
        </div>
      </div>
    </div>
  );
};
