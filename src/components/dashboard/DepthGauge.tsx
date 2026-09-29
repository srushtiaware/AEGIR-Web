import React from 'react';
import { useSimulation } from '../../context/SimulationContext';

export const DepthGauge: React.FC = () => {
  const { pixhawk, theme } = useSimulation();
  const isDark = theme === 'dark';
  
  const currentDepth = pixhawk.depth;
  const maxDepth = 5200;
  const percentage = Math.min(95, Math.max(5, (currentDepth / maxDepth) * 100));

  const depthLabels = [
    { depth: 0, label: 'SURFACE' },
    { depth: 1000, label: '1000 m' },
    { depth: 2000, label: '2000 m' },
    { depth: 3000, label: '3000 m' },
    { depth: 4000, label: '4000 m' },
    { depth: 5000, label: '5000 m' },
    { depth: 5200, label: 'SEAFLOOR' },
  ];

  return (
    <div className={`absolute left-3 top-14 bottom-6 z-10 flex flex-col items-center backdrop-blur-md px-2.5 py-3 rounded-lg border text-[10px] font-mono select-none shadow-lg transition-colors ${
      isDark
        ? 'bg-slate-950/70 border-cyan-500/20 text-slate-200'
        : 'bg-white/85 border-cyan-600/30 text-slate-900'
    }`}>
      <span className={`font-bold mb-1 text-[9px] tracking-wider ${
        isDark ? 'text-cyan-400' : 'text-cyan-700'
      }`}>DEPTH</span>
      
      <div className="relative flex-1 w-6 flex justify-center">
        {/* Vertical Scale Line */}
        <div className={`absolute top-0 bottom-0 w-0.5 ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
        
        {/* Target Depth Line */}
        <div 
          className="absolute w-4 h-0.5 bg-cyan-500 -translate-x-1/2 left-1/2 transition-all duration-500"
          style={{ top: `${(pixhawk.targetDepth / maxDepth) * 100}%` }}
        />

        {/* Current Vehicle Depth Indicator Marker */}
        <div
          className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 transition-all duration-300"
          style={{ top: `${percentage}%` }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 cyan-glow animate-pulse" />
          <div className="bg-cyan-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
            {currentDepth.toLocaleString()} m
          </div>
        </div>

        {/* Major Depth Tick Marks */}
        {depthLabels.map((item, idx) => {
          const topPct = (item.depth / maxDepth) * 100;
          return (
            <div
              key={idx}
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 w-full justify-between"
              style={{ top: `${topPct}%` }}
            >
              <div className={`w-1.5 h-0.5 ${isDark ? 'bg-slate-600' : 'bg-slate-400'}`} />
              <span className={`text-[8px] font-mono hidden sm:inline ${
                isDark ? 'text-slate-400' : 'text-slate-600 font-semibold'
              }`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className={`mt-2 text-[9px] font-mono text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        Target: <span className={`font-semibold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{pixhawk.targetDepth}m</span>
      </div>
    </div>
  );
};
