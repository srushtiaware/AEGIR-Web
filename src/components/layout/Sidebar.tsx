import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { LayoutDashboard, Activity, Map, AlertTriangle, Terminal } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, theme } = useSimulation();

  const isDark = theme === 'dark';

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'sensors', label: 'Sensors', icon: Activity },
    { id: 'map', label: 'Seafloor Map', icon: Map },
    { id: 'anomalies', label: 'Anomalies', icon: AlertTriangle },
    { id: 'logs', label: 'Analytics & Logs', icon: Terminal },
  ];

  return (
    <aside className={`w-full md:w-56 p-3 flex md:flex-col justify-between select-none font-mono shrink-0 border-b md:border-b-0 md:border-r transition-colors ${
      isDark
        ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100'
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="w-full">
        <div className={`hidden md:block text-[10px] font-bold uppercase tracking-wider px-3 mb-3 ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}>
          NAVIGATION
        </div>
        
        <nav className="flex md:flex-col gap-1 w-full overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold w-full transition whitespace-nowrap ${
                  isActive
                    ? isDark
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 cyan-glow-text'
                      : 'bg-cyan-50 text-cyan-800 border border-cyan-400 font-bold shadow-sm'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${
                  isActive 
                    ? 'text-cyan-500 font-bold' 
                    : isDark ? 'text-slate-500' : 'text-slate-400'
                }`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Prototype Telemetry Footer in Sidebar */}
      <div className={`hidden md:block pt-4 border-t text-[10px] space-y-1 ${
        isDark ? 'border-slate-900 text-slate-400' : 'border-slate-200 text-slate-500'
      }`}>
        <div className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>AEGIR AUV PROTOTYPE</div>
        <div>Pressure Hull: <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Titanium Grade 5</span></div>
        <div>Max Depth: <span className="text-cyan-600 font-mono font-bold">6,000 m</span></div>
        <div>Control Core: <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Pixhawk + Jetson Edge</span></div>
      </div>
    </aside>
  );
};
