import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Video, ShieldAlert } from 'lucide-react';

export const RovCameraOverlay: React.FC = () => {
  const { pixhawk, theme } = useSimulation();
  const isDark = theme === 'dark';

  const isCaution = pixhawk.altitude <= 2.5;

  return (
    <div className="absolute inset-0 pointer-events-none p-3.5 flex flex-col justify-between font-mono select-none">
      {/* Top Overlay Bar */}
      <div className="flex justify-between items-start">
        {/* Left Status Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-red-950/80 border border-red-500/40 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider shadow">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>● LIVE</span>
          </div>

          <div className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide border backdrop-blur-sm ${
            isDark
              ? 'bg-slate-900/80 border-cyan-500/30 text-cyan-300'
              : 'bg-white/90 border-cyan-600/40 text-cyan-800 shadow-sm font-bold'
          }`}>
            SIMULATION MODE
          </div>

          <div className={`px-2 py-0.5 rounded text-[10px] border backdrop-blur-sm ${
            isDark ? 'bg-slate-900/80 border-slate-700 text-slate-300' : 'bg-white/90 border-slate-300 text-slate-700 shadow-sm'
          }`}>
            MISSION: <span className="font-bold">AEGIR-0264</span>
          </div>
        </div>

        {/* Right Dynamic Telemetry Overlay */}
        <div className={`px-2.5 py-1 rounded border backdrop-blur-sm text-[10px] space-y-0.5 text-right hidden sm:block ${
          isDark
            ? 'bg-slate-950/70 border-slate-800 text-slate-300'
            : 'bg-white/85 border-slate-300 text-slate-700 shadow-sm font-semibold'
        }`}>
          <div>LAT: <span className="font-bold">-14.6284°</span></div>
          <div>LNG: <span className="font-bold">-125.4891°</span></div>
          <div>TEMP: <span className={`font-bold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>1.8°C</span></div>
        </div>
      </div>

      {/* Center Target Crosshair Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-30 flex items-center justify-center pointer-events-none">
        <div className={`w-full h-[1px] ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
        <div className={`h-full w-[1px] absolute ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
        <div className={`w-16 h-16 border rounded-full absolute ${isDark ? 'border-cyan-400' : 'border-cyan-600'}`} />
      </div>

      {/* Bottom ROV Overlay Telemetry Strip */}
      <div className="flex justify-between items-end">
        {/* Left Telemetry Metrics */}
        <div className={`px-3 py-1.5 rounded-lg border backdrop-blur-md flex flex-wrap items-center gap-4 text-[11px] ${
          isDark
            ? 'bg-slate-950/80 border-cyan-500/20 text-slate-200'
            : 'bg-white/90 border-cyan-600/30 text-slate-900 shadow-md'
        }`}>
          <div>
            <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>DEPTH</span>
            <span className={`font-bold text-xs ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{pixhawk.depth.toLocaleString()} m</span>
          </div>
          <div className={`w-[1px] h-6 ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
          <div>
            <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ALTITUDE</span>
            <span className="font-bold text-xs">{pixhawk.altitude} m</span>
          </div>
          <div className={`w-[1px] h-6 ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
          <div>
            <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>SPEED</span>
            <span className="font-bold text-xs">{pixhawk.speed} kn</span>
          </div>
          <div className={`w-[1px] h-6 ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
          <div>
            <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>HEADING</span>
            <span className={`font-bold text-xs ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{pixhawk.heading}°</span>
          </div>
        </div>

        {/* Seafloor Clearance Status Indicator */}
        <div className={`px-3 py-1.5 rounded-lg border backdrop-blur-md flex items-center gap-2 ${
          isCaution 
            ? 'bg-amber-950/80 border-amber-500/50 text-amber-300 animate-pulse'
            : isDark
              ? 'bg-slate-950/80 border-cyan-500/30 text-cyan-300'
              : 'bg-white/90 border-cyan-600/30 text-cyan-800 shadow-md'
        }`}>
          {isCaution ? (
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          ) : (
            <Video className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          )}
          <div className="text-[10px]">
            <span className={`block text-[9px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>SEAFLOOR CLEARANCE</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs">{pixhawk.altitude} m</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                isCaution 
                  ? 'bg-amber-500 text-slate-950' 
                  : isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-100 text-cyan-800'
              }`}>
                {isCaution ? 'CAUTION' : 'OPTIMAL'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
