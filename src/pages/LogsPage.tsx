import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Terminal, Cpu, Zap, Activity } from 'lucide-react';

export const LogsPage: React.FC = () => {
  const { logs, pixhawk, thrusters, theme } = useSimulation();
  const isDark = theme === 'dark';

  const cardStyle = isDark
    ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-md';

  return (
    <div className="space-y-4 font-mono select-none">
      {/* Header */}
      <div className={`flex justify-between items-center p-3.5 rounded-lg border transition-colors ${
        isDark ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div>
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Terminal className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            PIXHAWK AUTOPILOT DIAGNOSTICS & FLIGHT LOGS
          </h2>
          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Real-time telemetry audit logs, ESC thruster diagnostics, and power utilization streams.
          </p>
        </div>
        <div className={`flex items-center gap-2 text-xs font-bold ${
          isDark ? 'text-emerald-400' : 'text-emerald-700'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AUTOPILOT TELEMETRY ACTIVE</span>
        </div>
      </div>

      {/* Top Diagnostics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className={`p-3 rounded-lg border flex items-center justify-between ${cardStyle}`}>
          <div>
            <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>CONTROL MODE</span>
            <span className={`font-bold text-sm ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{pixhawk.mode}</span>
          </div>
          <Cpu className={`w-6 h-6 ${isDark ? 'text-cyan-400 opacity-60' : 'text-cyan-600 opacity-75'}`} />
        </div>

        <div className={`p-3 rounded-lg border flex items-center justify-between ${cardStyle}`}>
          <div>
            <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ESC TELEMETRY</span>
            <span className={`font-bold text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              {pixhawk.escsOnline}/{pixhawk.escsTotal} ONLINE
            </span>
          </div>
          <Activity className={`w-6 h-6 ${isDark ? 'text-emerald-400 opacity-60' : 'text-emerald-600 opacity-75'}`} />
        </div>

        <div className={`p-3 rounded-lg border flex items-center justify-between ${cardStyle}`}>
          <div>
            <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>VERTICAL THRUSTER</span>
            <span className={`font-bold text-sm ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{thrusters.vertical}% PWM</span>
          </div>
          <Zap className={`w-6 h-6 ${isDark ? 'text-cyan-400 opacity-60' : 'text-cyan-600 opacity-75'}`} />
        </div>

        <div className={`p-3 rounded-lg border flex items-center justify-between ${cardStyle}`}>
          <div>
            <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>BATTERY HEALTH</span>
            <span className={`font-bold text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{pixhawk.battery}% (49.2 V)</span>
          </div>
          <Zap className={`w-6 h-6 ${isDark ? 'text-emerald-400 opacity-60' : 'text-emerald-600 opacity-75'}`} />
        </div>
      </div>

      {/* Terminal Log Stream Panel */}
      <div className={`rounded-xl border overflow-hidden shadow-xl ${cardStyle}`}>
        <div className={`px-4 py-2 border-b flex justify-between items-center text-xs ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700 font-semibold'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="font-bold ml-2">/var/log/pixhawk/flight_stream.log</span>
          </div>
          <span>Format: Syslog UTC</span>
        </div>

        <div className="p-4 max-h-[380px] overflow-y-auto space-y-2 text-xs font-mono">
          {logs.map((log) => {
            const isAlert = log.level === 'ALERT' || log.level === 'WARN';
            return (
              <div
                key={log.id}
                className={`p-2 rounded border flex items-start gap-3 transition ${
                  isAlert
                    ? isDark
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-300'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                    : isDark
                      ? 'bg-slate-900/40 border-slate-800 text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className={`text-[10px] whitespace-nowrap ${isDark ? 'text-slate-500' : 'text-slate-500 font-semibold'}`}>{log.timestamp}</span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${
                  log.system === 'PIXHAWK' ? (isDark ? 'bg-cyan-950 text-cyan-300 border-cyan-500/30' : 'bg-cyan-100 text-cyan-800 border-cyan-300') :
                  log.system === 'THRUSTERS' ? (isDark ? 'bg-blue-950 text-blue-300 border-blue-500/30' : 'bg-blue-100 text-blue-800 border-blue-300') :
                  log.system === 'FUSION' ? (isDark ? 'bg-amber-950 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-900 border-amber-300') :
                  (isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-200 text-slate-800 border-slate-300')
                }`}>
                  {log.system}
                </span>
                <span className="flex-1 font-semibold">{log.message}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
