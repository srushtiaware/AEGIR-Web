import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Map, Layers, Info } from 'lucide-react';

export const SeafloorMapPage: React.FC = () => {
  const { anomaliesList, pixhawk, theme } = useSimulation();
  const isDark = theme === 'dark';

  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string>('ANM-0264-A');

  const selectedTarget = anomaliesList.find((a) => a.id === selectedAnomalyId) || anomaliesList[0];

  const cardStyle = isDark
    ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-md';

  return (
    <div className="space-y-4 font-mono select-none">
      {/* Page Header */}
      <div className={`flex justify-between items-center p-3.5 rounded-lg border transition-colors ${
        isDark ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div>
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Map className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            HIGH-RESOLUTION SEAFLOOR BATHYMETRIC MAP & SURVEY GRID
          </h2>
          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Multi-beam sonar bathymetry (1m resolution) with polymetallic nodule deposit heatmaps.
          </p>
        </div>
        <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700 font-semibold'}`}>
          <Layers className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <span>Locus: CCZ Block B4</span>
        </div>
      </div>

      {/* Main Interactive Map & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Large Bathymetric Heatmap Canvas Panel (2 cols) */}
        <div className={`lg:col-span-2 rounded-xl border overflow-hidden relative h-[500px] shadow-xl flex flex-col justify-between p-4 ${
          isDark ? 'bg-slate-950/90 border-cyan-500/30' : 'bg-slate-50 border-slate-300'
        }`}>
          {/* Background Grid & Contour Map Visualization */}
          <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          
          {/* Top Map Controls Overlay */}
          <div className={`relative z-10 flex justify-between items-center p-2 rounded border backdrop-blur-md ${
            isDark ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-white/90 border-slate-200 text-slate-800 shadow-sm'
          }`}>
            <div className="flex items-center gap-3 text-xs">
              <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>GRID CCZ-408</span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Depth Range: 4,780m - 5,120m</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className={`px-2 py-0.5 rounded border font-semibold ${
                isDark ? 'bg-cyan-950 text-cyan-300 border-cyan-500/30' : 'bg-cyan-50 text-cyan-800 border-cyan-300'
              }`}>
                Bathymetry: Multibeam 30kHz
              </span>
            </div>
          </div>

          {/* SVG Map Path with Bathymetric Contour Lines & Anomaly Pins */}
          <div className="relative z-10 w-full h-72 my-auto flex items-center justify-center">
            <svg className="w-full h-full stroke-cyan-500 fill-none" viewBox="0 0 600 300">
              {/* Bathymetric Contour Rings */}
              <ellipse cx="200" cy="140" rx="140" ry="80" stroke={isDark ? '#0e7490' : '#0284c7'} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <ellipse cx="200" cy="140" rx="100" ry="55" stroke={isDark ? '#0891b2' : '#0369a1'} strokeWidth="1" opacity="0.5" />
              <ellipse cx="420" cy="180" rx="120" ry="70" stroke={isDark ? '#0e7490' : '#0284c7'} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

              {/* Nodule Deposit Heatmap Shadows */}
              <ellipse cx="200" cy="140" rx="60" ry="35" fill="#0284c7" opacity={isDark ? 0.15 : 0.2} />
              <ellipse cx="420" cy="180" rx="70" ry="40" fill="#f59e0b" opacity={isDark ? 0.15 : 0.25} />

              {/* Survey Waypoint Path */}
              <path
                d="M 50 250 L 120 180 L 200 140 L 310 110 L 420 180 L 520 220"
                stroke={isDark ? '#00f0ff' : '#0284c7'}
                strokeWidth="2"
                strokeDasharray="6 3"
              />

              {/* AEGIR Vehicle Active Marker */}
              <g transform="translate(200, 140)">
                <circle cx="0" cy="0" r="14" className="stroke-cyan-500 fill-none animate-ping opacity-75" />
                <circle cx="0" cy="0" r="6" className="fill-cyan-500 cyan-glow" />
                <text x="10" y="-10" fill={isDark ? '#00f0ff' : '#0284c7'} fontSize="11" fontFamily="monospace" fontWeight="bold">
                  AEGIR AUV ({pixhawk.depth}m)
                </text>
              </g>

              {/* Anomaly Pins */}
              {anomaliesList.map((anm, idx) => {
                const px = idx === 0 ? 200 : idx === 1 ? 420 : 310;
                const py = idx === 0 ? 140 : idx === 1 ? 180 : 110;
                const isSelected = anm.id === selectedTarget.id;
                return (
                  <g
                    key={anm.id}
                    transform={`translate(${px}, ${py})`}
                    onClick={() => setSelectedAnomalyId(anm.id)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? '10' : '6'}
                      className={isSelected ? 'fill-amber-500 stroke-amber-200' : 'fill-amber-600'}
                    />
                    <text x="12" y="15" fill={isDark ? '#f59e0b' : '#b45309'} fontSize="10" fontFamily="monospace" fontWeight="bold">
                      {anm.id} ({anm.confidence}%)
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend */}
          <div className={`relative z-10 flex flex-wrap items-center justify-between p-2 rounded border text-[10px] backdrop-blur-md ${
            isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white/90 border-slate-200 text-slate-700 shadow-sm'
          }`}>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> AEGIR Active Position
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Detected Anomaly Pin
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="w-3 h-1 bg-cyan-500 border border-dashed" /> Planned Survey Line
              </span>
            </div>
            <span className="font-semibold">Scale: 1:500m</span>
          </div>
        </div>

        {/* Selected Target Side Info Panel (1 col) */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between ${cardStyle}`}>
          <div>
            <div className={`flex items-center justify-between pb-2 border-b mb-3 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <span className="font-bold text-xs flex items-center gap-1.5">
                <Info className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                TARGET INSPECTOR
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                isDark ? 'text-amber-400 bg-amber-950/60 border-amber-500/30' : 'text-amber-800 bg-amber-50 border-amber-300'
              }`}>
                {selectedTarget.id}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Target Name</span>
                <span className="font-bold">{selectedTarget.name}</span>
              </div>

              <div>
                <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Deposit Type</span>
                <span className={`font-bold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{selectedTarget.type}</span>
              </div>

              <div className={`grid grid-cols-2 gap-2 p-2 rounded border text-[10px] ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Latitude:</span>
                  <span className="font-bold block">{selectedTarget.lat}°</span>
                </div>
                <div>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Longitude:</span>
                  <span className="font-bold block">{selectedTarget.lng}°</span>
                </div>
                <div>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Depth:</span>
                  <span className={`font-bold block ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{selectedTarget.depth} m</span>
                </div>
                <div>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Confidence:</span>
                  <span className={`font-bold block ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>{selectedTarget.confidence}%</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Multi-Sensor Evidence</span>
                <div className={`p-2 rounded border text-[10px] space-y-1 ${
                  isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <div><span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>EMI:</span> {selectedTarget.signatures.emi}</div>
                  <div><span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>MAG:</span> {selectedTarget.signatures.mag}</div>
                  <div><span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>SP:</span> {selectedTarget.signatures.sp}</div>
                  <div><span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>SPEC:</span> {selectedTarget.signatures.spectral}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`pt-3 border-t mt-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Provenance: <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{selectedTarget.provenance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
