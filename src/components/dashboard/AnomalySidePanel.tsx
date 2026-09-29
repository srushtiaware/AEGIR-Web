import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { AlertTriangle, X, ChevronRight, Sparkles } from 'lucide-react';

export const AnomalySidePanel: React.FC = () => {
  const { activeAnomaly, sensorFusion, dismissAnomalyPanel, setActiveTab, theme } = useSimulation();

  if (!activeAnomaly) return null;
  const isDark = theme === 'dark';

  return (
    <div className={`absolute right-3 bottom-16 z-20 w-72 border rounded-xl p-3.5 backdrop-blur-xl shadow-2xl animate-in slide-in-from-right duration-300 font-mono select-none transition-colors ${
      isDark
        ? 'bg-slate-950/90 border-amber-500/40 text-slate-100'
        : 'bg-white/95 border-amber-500/60 text-slate-900 shadow-amber-500/10'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between pb-2 border-b ${
        isDark ? 'border-amber-500/30' : 'border-amber-400/40'
      }`}>
        <div className={`flex items-center gap-2 font-bold text-xs ${
          isDark ? 'text-amber-400' : 'text-amber-700'
        }`}>
          <AlertTriangle className="w-4 h-4 text-amber-500 animate-bounce" />
          <span>ANOMALY DETECTED</span>
        </div>
        <button
          onClick={dismissAnomalyPanel}
          className={`p-0.5 rounded transition ${
            isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Target Details */}
      <div className="mt-2.5 space-y-2 text-xs">
        <div>
          <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>CLASSIFICATION</span>
          <span className={`font-bold ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>{sensorFusion.classification}</span>
        </div>

        <div className={`flex items-center justify-between border rounded p-2 ${
          isDark ? 'bg-amber-950/40 border-amber-500/30' : 'bg-amber-50 border-amber-300'
        }`}>
          <span className={`text-[10px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Confidence Score</span>
          <div className={`flex items-center gap-1.5 font-bold text-sm ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{sensorFusion.overallConfidence}%</span>
          </div>
        </div>

        <div className={`space-y-1 text-[10px] pt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <div className="flex justify-between">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Target ID:</span>
            <span className={`font-mono ${isDark ? 'text-cyan-300' : 'text-cyan-700 font-bold'}`}>{activeAnomaly.id}</span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Target Depth:</span>
            <span>{activeAnomaly.depth} m</span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Provenance:</span>
            <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{sensorFusion.provenance}</span>
          </div>
        </div>
      </div>

      {/* Deep Investigation Link */}
      <button
        onClick={() => setActiveTab('anomalies')}
        className={`mt-3 w-full py-1.5 px-3 border rounded-lg font-semibold text-[11px] flex items-center justify-center gap-1 transition ${
          isDark
            ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40'
            : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-400 font-bold'
        }`}
      >
        <span>Investigate Anomaly Details</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
