import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Anchor } from 'lucide-react';

export const ThrusterGauges: React.FC = () => {
  const { thrusters, theme } = useSimulation();
  const isDark = theme === 'dark';

  const thrusterList = [
    { label: 'Vertical', value: thrusters.vertical, color: 'from-cyan-500 to-blue-500' },
    { label: 'Forward', value: thrusters.forward, color: 'from-blue-500 to-indigo-500' },
    { label: 'Port', value: thrusters.port, color: 'from-cyan-600 to-teal-500' },
    { label: 'Starboard', value: thrusters.starboard, color: 'from-cyan-600 to-teal-500' },
  ];

  return (
    <div className={`p-3 rounded-lg border text-xs font-mono select-none backdrop-blur-md transition-colors ${
      isDark
        ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100'
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className={`flex items-center justify-between pb-2 mb-2 border-b ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className={`flex items-center gap-1.5 font-bold text-[10px] tracking-wider ${
          isDark ? 'text-slate-200' : 'text-slate-800'
        }`}>
          <Anchor className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          THRUSTER OUTPUT
        </div>
        <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold border ${
          isDark
            ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
            : 'bg-cyan-50 text-cyan-800 border-cyan-300'
        }`}>
          {thrusters.state}
        </span>
      </div>

      <div className="space-y-2">
        {thrusterList.map((item, idx) => (
          <div key={idx} className="space-y-0.5">
            <div className="flex justify-between text-[10px]">
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{item.label}</span>
              <span className={`font-bold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{item.value}%</span>
            </div>
            {/* Animated Progress Bar */}
            <div className={`w-full rounded-full h-1.5 overflow-hidden border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <div
                className={`h-full bg-gradient-to-r ${item.color} transition-all duration-300 rounded-full`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
