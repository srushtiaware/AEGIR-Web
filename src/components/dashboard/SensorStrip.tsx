import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Radio, Compass, Zap, Camera, Eye } from 'lucide-react';

export const SensorStrip: React.FC = () => {
  const { sensors, theme } = useSimulation();
  const isDark = theme === 'dark';

  const sensorList = [
    { key: 'EMI', status: sensors.emi, icon: Radio, name: 'EM Induction' },
    { key: 'MAG', status: sensors.mag, icon: Compass, name: 'Magnetometer' },
    { key: 'SP', status: sensors.sp, icon: Zap, name: 'Self-Potential' },
    { key: 'CAMERA', status: sensors.camera, icon: Camera, name: 'HD Optical' },
    { key: 'SPECTRAL', status: sensors.spectral, icon: Eye, name: 'Multi-Spectral' },
  ];

  return (
    <div className={`p-3 rounded-lg border text-xs font-mono select-none backdrop-blur-md transition-colors ${
      isDark
        ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100'
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className={`text-[10px] font-bold tracking-wider mb-2 uppercase ${
        isDark ? 'text-slate-400' : 'text-slate-500'
      }`}>
        SENSOR ACTIVITY STRIP
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        {sensorList.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className={`flex-1 min-w-[100px] border rounded px-2.5 py-1.5 flex items-center justify-between transition ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40'
                  : 'bg-slate-50 border-slate-200 hover:border-cyan-400'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <span className={`font-bold text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{item.key}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className={`text-[9px] font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{item.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
