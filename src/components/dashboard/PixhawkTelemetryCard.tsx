import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Cpu, Activity, BatteryCharging } from 'lucide-react';

export const PixhawkTelemetryCard: React.FC = () => {
  const { pixhawk, thrusters, theme } = useSimulation();
  const isDark = theme === 'dark';

  return (
    <div className={`absolute right-3 top-14 z-10 w-52 p-3 rounded-lg border text-xs font-mono backdrop-blur-md shadow-xl select-none transition-colors ${
      isDark
        ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100'
        : 'bg-white/90 border-cyan-600/30 text-slate-900'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between border-b pb-2 mb-2 ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-1.5">
          <Cpu className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
          <span className={`font-bold text-[11px] tracking-wide ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            PIXHAWK AUTOPILOT
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`text-[9px] font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>ONLINE</span>
        </div>
      </div>

      {/* Autopilot Mode */}
      <div className={`border rounded px-2 py-1 mb-2.5 flex items-center justify-between ${
        isDark ? 'bg-cyan-950/40 border-cyan-500/30' : 'bg-cyan-50 border-cyan-300'
      }`}>
        <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Mode</span>
        <span className={`text-[10px] font-bold tracking-wider ${isDark ? 'text-cyan-300' : 'text-cyan-800'}`}>
          {pixhawk.mode}
        </span>
      </div>

      {/* Telemetry Grid */}
      <div className="space-y-1 text-[11px]">
        <div className="flex justify-between items-center">
          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Depth</span>
          <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{pixhawk.depth.toLocaleString()} m</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Pitch</span>
          <span className={`font-semibold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{pixhawk.pitch > 0 ? `+${pixhawk.pitch}` : pixhawk.pitch}°</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Roll</span>
          <span className={`font-semibold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{pixhawk.roll > 0 ? `+${pixhawk.roll}` : pixhawk.roll}°</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Heading</span>
          <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{pixhawk.heading}°</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Thrusters</span>
          <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>{thrusters.vertical}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`${isDark ? 'text-slate-400' : 'text-slate-600'} flex items-center gap-1`}>
            <BatteryCharging className={`w-3 h-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'} inline`} /> Battery
          </span>
          <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{pixhawk.battery}%</span>
        </div>
      </div>

      {/* ESC Status Footer */}
      <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[10px] ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <span className={`${isDark ? 'text-slate-400' : 'text-slate-600'} flex items-center gap-1`}>
          <Activity className={`w-3 h-3 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} /> ESC Status
        </span>
        <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
          {pixhawk.escsOnline} / {pixhawk.escsTotal} ONLINE
        </span>
      </div>
    </div>
  );
};
