import React, { useState, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Shield, Play, Pause, AlertOctagon, RotateCcw, Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    isSimulating,
    toggleSimulation,
    triggerAnomalyEvent,
    changeTargetDepth,
    pixhawk,
    theme,
    toggleTheme
  } = useSimulation();

  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setUtcTime(new Date().toUTCString().slice(17, 25) + ' UTC');
    }, 1000);
    setUtcTime(new Date().toUTCString().slice(17, 25) + ' UTC');
    return () => clearInterval(timer);
  }, []);

  const isDark = theme === 'dark';

  return (
    <header className={`w-full border-b px-4 py-2.5 backdrop-blur-md sticky top-0 z-40 select-none transition-colors ${
      isDark
        ? 'bg-slate-950/90 border-cyan-500/20 text-slate-100'
        : 'bg-white/90 border-cyan-600/30 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Title & System Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg cyan-glow">
            <Shield className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-base font-extrabold tracking-wider font-mono ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                AEGIR MISSION CONTROL
              </h1>
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isDark 
                  ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                  : 'bg-emerald-100 border border-emerald-400 text-emerald-700'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono border hidden sm:inline ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}>
                MISSION: AEGIR-0264
              </span>
            </div>
            {/* Demo Simulation Disclaimer */}
            <p className={`text-[10px] font-mono ${isDark ? 'text-cyan-400/80' : 'text-cyan-700 font-semibold'}`}>
              ● DEMO / SIMULATION — Sensor values and underwater motion are simulated for demonstration.
            </p>
          </div>
        </div>

        {/* Right Simulation Controls, Theme Switcher & Time */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          <div className={`px-3 py-1 rounded border font-bold hidden lg:block ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
          }`}>
            {utcTime}
          </div>

          {/* LIGHT / DARK MODE TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 transition ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-amber-300 hover:border-amber-400'
                : 'bg-slate-100 border-slate-300 text-indigo-700 hover:border-indigo-400 shadow-sm'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light Format</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span>Dark Format</span>
              </>
            )}
          </button>

          {/* Engine Play/Pause */}
          <button
            onClick={toggleSimulation}
            className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition ${
              isSimulating
                ? isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-cyan-500'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-cyan-600'
                : 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Pause Engine' : 'Resume Engine'}</span>
          </button>

          {/* Depth Adjustment */}
          <button
            onClick={() => changeTargetDepth(pixhawk.targetDepth === 5000 ? 4800 : 5000)}
            className={`px-2.5 py-1.5 rounded-lg border font-semibold flex items-center gap-1 transition ${
              isDark
                ? 'bg-slate-900 border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/40'
                : 'bg-slate-100 border-cyan-600/40 text-cyan-800 hover:bg-cyan-50'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Target: {pixhawk.targetDepth === 5000 ? '4,800m' : '5,000m'}</span>
          </button>

          {/* Anomaly Trigger */}
          <button
            onClick={triggerAnomalyEvent}
            className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 transition ${
              isDark
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30'
                : 'bg-amber-100 border-amber-400 text-amber-900 hover:bg-amber-200'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-amber-500" />
            <span>Simulate Anomaly</span>
          </button>
        </div>
      </div>
    </header>
  );
};
