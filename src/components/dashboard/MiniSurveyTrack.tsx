import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { MapPin, Navigation, Maximize2 } from 'lucide-react';

export const MiniSurveyTrack: React.FC = () => {
  const { setActiveTab, theme } = useSimulation();
  const isDark = theme === 'dark';

  return (
    <div className={`p-3 rounded-lg border text-xs font-mono select-none flex flex-col justify-between backdrop-blur-md transition-colors ${
      isDark
        ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100'
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between pb-1.5 border-b ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className={`flex items-center gap-1.5 font-bold text-[10px] tracking-wider ${
          isDark ? 'text-slate-200' : 'text-slate-800'
        }`}>
          <Navigation className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          SURVEY TRACK / SEAFLOOR PREVIEW
        </div>
        <button
          onClick={() => setActiveTab('map')}
          className={`text-[10px] flex items-center gap-1 font-bold hover:underline ${
            isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-700 hover:text-cyan-900'
          }`}
        >
          <span>Full Map</span>
          <Maximize2 className="w-3 h-3" />
        </button>
      </div>

      {/* Mini Visual Bathymetry Track Canvas Graphic */}
      <div className={`relative w-full h-16 my-1.5 rounded border overflow-hidden flex items-center justify-center ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
        
        <svg className="absolute inset-0 w-full h-full stroke-cyan-500 fill-none" viewBox="0 0 300 60">
          <path
            d="M 10 30 Q 70 10 130 35 T 250 25 T 290 40"
            strokeWidth="2"
            strokeDasharray="4 2"
            className="opacity-60"
          />
          <circle cx="130" cy="35" r="4" className="fill-cyan-400 cyan-glow animate-ping" />
          <circle cx="130" cy="35" r="3" className="fill-cyan-500" />
          <circle cx="210" cy="27" r="4" className="fill-amber-500" />
        </svg>

        <div className={`absolute left-2 bottom-1 text-[9px] flex items-center gap-1 ${
          isDark ? 'text-slate-400' : 'text-slate-600 font-semibold'
        }`}>
          <MapPin className={`w-2.5 h-2.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <span>Locus: Clarion-Clipperton Zone</span>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className={`flex justify-between items-center text-[10px] pt-1 border-t ${
        isDark ? 'border-slate-900 text-slate-300' : 'border-slate-100 text-slate-700'
      }`}>
        <div>
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Distance Traversed: </span>
          <span className="font-bold">12.6 km</span>
        </div>
        <div>
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Survey Coverage: </span>
          <span className={`font-bold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>78%</span>
        </div>
      </div>
    </div>
  );
};
