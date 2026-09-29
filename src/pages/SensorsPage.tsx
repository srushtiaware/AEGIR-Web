import React, { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { Radio, Compass, Zap, Eye, Camera, Activity } from 'lucide-react';

export const SensorsPage: React.FC = () => {
  const { theme } = useSimulation();
  const isDark = theme === 'dark';

  const [emiData, setEmiData] = useState<Array<{ time: string; signal: number; baseline: number }>>([]);
  const [magData, setMagData] = useState<Array<{ time: string; bz: number; bx: number }>>([]);
  const [spData, setSpData] = useState<Array<{ time: string; voltage: number }>>([]);

  // Generate real-time streaming sensor waveform points
  useEffect(() => {
    const initialData = Array.from({ length: 25 }, (_, i: number) => {
      const hasAnomaly = i >= 14 && i <= 18;
      return {
        time: `${i}s`,
        signal: hasAnomaly ? 85 + Math.sin(i) * 12 : 20 + Math.random() * 8,
        baseline: 20,
        bz: hasAnomaly ? 42 + Math.sin(i * 0.8) * 15 : Math.random() * 5,
        bx: 12 + Math.random() * 3,
        voltage: hasAnomaly ? -38 + Math.cos(i) * 8 : -2 + Math.random() * 2
      };
    });

    setEmiData(initialData.map((d) => ({ time: d.time, signal: d.signal, baseline: d.baseline })));
    setMagData(initialData.map((d) => ({ time: d.time, bz: d.bz, bx: d.bx })));
    setSpData(initialData.map((d) => ({ time: d.time, voltage: d.voltage })));

    const interval = setInterval(() => {
      const nowStr = new Date().toISOString().substring(17, 22);
      setEmiData((prev) => {
        const nextSig = 20 + Math.random() * 12;
        return [...prev.slice(1), { time: nowStr, signal: nextSig, baseline: 20 }];
      });
      setMagData((prev) => {
        const nextBz = Math.random() * 6;
        return [...prev.slice(1), { time: nowStr, bz: nextBz, bx: 12 }];
      });
      setSpData((prev) => {
        const nextV = -2 + Math.random() * 3;
        return [...prev.slice(1), { time: nowStr, voltage: nextV }];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const cardStyle = isDark
    ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-md';

  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const axisColor = isDark ? '#64748b' : '#475569';

  return (
    <div className="space-y-4 font-mono select-none">
      {/* Page Header */}
      <div className={`flex justify-between items-center p-3.5 rounded-lg border transition-colors ${
        isDark ? 'bg-slate-950/80 border-cyan-500/20' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          <h2 className={`text-sm font-bold flex items-center gap-2 ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            <Activity className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            REAL-TIME SENSOR STREAM ANALYTICS
          </h2>
          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            High-frequency multi-frequency electromagnetic, magnetic, self-potential, and spectral stream data.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>ALL SENSORS LIVE</span>
        </div>
      </div>

      {/* Sensor Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. EMI Induction Waveform */}
        <div className={`p-3.5 rounded-xl border ${cardStyle}`}>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Radio className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span className="font-bold text-xs">
                EMI INDUCTION COIL (15 kHz)
              </span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
              isDark ? 'text-cyan-300 bg-cyan-950/60 border-cyan-500/30' : 'text-cyan-800 bg-cyan-50 border-cyan-300'
            }`}>
              Peak: 89% Signal-to-Noise
            </span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emiData}>
                <defs>
                  <linearGradient id="emiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDark ? '#00f0ff' : '#0284c7'} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={isDark ? '#00f0ff' : '#0284c7'} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="time" stroke={axisColor} fontSize={10} />
                <YAxis stroke={axisColor} fontSize={10} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#090d16' : '#ffffff',
                    borderColor: isDark ? '#00f0ff' : '#0284c7',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    fontSize: 11
                  }}
                />
                <Area type="monotone" dataKey="signal" stroke={isDark ? '#00f0ff' : '#0284c7'} fillOpacity={1} fill="url(#emiGrad)" strokeWidth={2} />
                <Line type="monotone" dataKey="baseline" stroke="#94a3b8" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Tri-Axial Magnetometer (B_z Anomaly) */}
        <div className={`p-3.5 rounded-xl border ${cardStyle}`}>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Compass className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className="font-bold text-xs">
                TRI-AXIAL MAGNETOMETER (B_z ΔnT)
              </span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
              isDark ? 'text-blue-300 bg-blue-950/60 border-blue-500/30' : 'text-blue-800 bg-blue-50 border-blue-300'
            }`}>
              Field Spike: +42 nT
            </span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={magData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="time" stroke={axisColor} fontSize={10} />
                <YAxis stroke={axisColor} fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#090d16' : '#ffffff',
                    borderColor: isDark ? '#3b82f6' : '#2563eb',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    fontSize: 11
                  }}
                />
                <Line type="monotone" dataKey="bz" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="bx" stroke="#94a3b8" strokeWidth={1} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Self-Potential (SP) Electrochemistry */}
        <div className={`p-3.5 rounded-xl border ${cardStyle}`}>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              <span className="font-bold text-xs">
                SELF-POTENTIAL ELECTRODES (Ag/AgCl ΔmV)
              </span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
              isDark ? 'text-amber-300 bg-amber-950/60 border-amber-500/30' : 'text-amber-800 bg-amber-50 border-amber-300'
            }`}>
              Redox Shift: -38 mV
            </span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="time" stroke={axisColor} fontSize={10} />
                <YAxis stroke={axisColor} fontSize={10} domain={[-60, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#090d16' : '#ffffff',
                    borderColor: isDark ? '#f59e0b' : '#d97706',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    fontSize: 11
                  }}
                />
                <Area type="monotone" dataKey="voltage" stroke={isDark ? '#f59e0b' : '#d97706'} fill={isDark ? '#f59e0b' : '#d97706'} fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Optical HD Camera Frame */}
        <div className={`p-3.5 rounded-xl border ${cardStyle}`}>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Camera className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span className="font-bold text-xs">
                DOWNWARD OPTICAL STREAM & BOUNDING BOXES
              </span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
              isDark ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30' : 'text-emerald-800 bg-emerald-50 border-emerald-300'
            }`}>
              Resolution: 4K 60fps
            </span>
          </div>
          <div className={`relative h-48 w-full rounded-lg overflow-hidden border flex items-center justify-center ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <div className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-t from-slate-950 via-slate-900 to-cyan-950/30' 
                : 'bg-gradient-to-t from-slate-200 via-sky-100 to-blue-200/40'
            }`} />

            {/* Bounding Box on Polymetallic Nodule Target */}
            <div className={`absolute top-12 left-24 w-28 h-20 border-2 rounded p-1 flex flex-col justify-between ${
              isDark ? 'border-cyan-400 cyan-glow' : 'border-cyan-600 shadow-md'
            }`}>
              <span className={`text-[9px] font-bold px-1 rounded w-max ${
                isDark ? 'bg-cyan-500 text-slate-950' : 'bg-cyan-700 text-white'
              }`}>
                NODULE CLUSTER 91%
              </span>
              <span className={`text-[8px] font-mono ${isDark ? 'text-cyan-300' : 'text-cyan-800 font-bold'}`}>Mn-Ni-Cu-Co</span>
            </div>

            <div className={`absolute bottom-2 left-3 text-[10px] flex items-center gap-2 ${
              isDark ? 'text-slate-400' : 'text-slate-600 font-semibold'
            }`}>
              <Eye className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span>Edge AI Detector: Jetson Orin active (0.012s inference)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
