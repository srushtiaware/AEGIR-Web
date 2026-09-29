import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { AlertTriangle, ShieldCheck, Download, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export const AnomaliesPage: React.FC = () => {
  const { anomaliesList, theme } = useSimulation();
  const isDark = theme === 'dark';

  const [selectedId, setSelectedId] = useState<string>(anomaliesList[0].id);
  const selectedAnomaly = anomaliesList.find((a) => a.id === selectedId) || anomaliesList[0];

  const exportReport = () => {
    const jsonStr = JSON.stringify(selectedAnomaly, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedAnomaly.id}_report.json`;
    a.click();
  };

  const cardStyle = isDark
    ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-md';

  return (
    <div className="space-y-4 font-mono select-none">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-lg border transition-colors ${
        isDark ? 'bg-slate-950/80 border-cyan-500/20 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div>
          <h2 className="text-sm font-bold flex items-center gap-2">
            <AlertTriangle className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            SEAFLOOR ANOMALY CATALOG & PROVENANCE AUDIT
          </h2>
          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Automated sensor fusion classification of polymetallic nodule deposits and seafloor mineral signatures.
          </p>
        </div>
        <button
          onClick={exportReport}
          className={`px-3 py-1.5 font-bold rounded-lg text-xs flex items-center gap-1.5 transition ${
            isDark
              ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cyan-glow'
              : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Mission PDF / JSON</span>
        </button>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left List of Anomalies (1 col) */}
        <div className="space-y-2">
          <div className={`text-[10px] font-bold uppercase tracking-wider px-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            DETECTED ANOMALY TARGETS ({anomaliesList.length})
          </div>

          {anomaliesList.map((anm) => {
            const isSelected = anm.id === selectedAnomaly.id;
            return (
              <div
                key={anm.id}
                onClick={() => setSelectedId(anm.id)}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  isSelected
                    ? isDark
                      ? 'bg-amber-950/30 border-amber-500/60 shadow-lg'
                      : 'bg-amber-50 border-amber-400 shadow-sm'
                    : isDark
                      ? 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/40'
                      : 'bg-white border-slate-200 hover:border-cyan-500 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className={`font-bold text-xs ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{anm.id}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    isDark
                      ? 'text-amber-400 bg-amber-950/80 border-amber-500/30'
                      : 'text-amber-800 bg-amber-100 border-amber-300'
                  }`}>
                    {anm.confidence}% CONFIDENCE
                  </span>
                </div>

                <div className={`text-xs font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{anm.name}</div>

                <div className={`flex justify-between items-center text-[10px] pt-1 border-t ${
                  isDark ? 'border-slate-900 text-slate-400' : 'border-slate-100 text-slate-500'
                }`}>
                  <span>Depth: {anm.depth} m</span>
                  <span className={`flex items-center gap-1 font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                    Details <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Deep Investigation Detail Card (2 cols) */}
        <div className={`lg:col-span-2 p-5 rounded-xl border shadow-xl space-y-4 ${cardStyle}`}>
          <div className={`flex justify-between items-start border-b pb-3 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                  isDark
                    ? 'text-amber-400 bg-amber-950/80 border-amber-500/40'
                    : 'text-amber-800 bg-amber-100 border-amber-300'
                }`}>
                  {selectedAnomaly.id}
                </span>
                <h3 className={`text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{selectedAnomaly.name}</h3>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{selectedAnomaly.type}</p>
            </div>

            <div className="text-right">
              <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>SENSOR FUSION SCORE</div>
              <div className={`text-xl font-extrabold flex items-center gap-1 justify-end ${
                isDark ? 'text-amber-400' : 'text-amber-700'
              }`}>
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>{selectedAnomaly.confidence}%</span>
              </div>
            </div>
          </div>

          {/* Location & Physical Attributes */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-lg border text-xs ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Latitude</span>
              <span className="font-bold">{selectedAnomaly.lat}°</span>
            </div>
            <div>
              <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Longitude</span>
              <span className="font-bold">{selectedAnomaly.lng}°</span>
            </div>
            <div>
              <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Seafloor Depth</span>
              <span className={`font-bold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{selectedAnomaly.depth} m</span>
            </div>
            <div>
              <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Detection Time</span>
              <span className="font-bold">{selectedAnomaly.timestamp}</span>
            </div>
          </div>

          {/* Sensor Evidence Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              MULTI-SENSOR FUSION EVIDENCE SIGNATURES
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className={`p-3 rounded-lg border space-y-1 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between text-[11px]">
                  <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>EMI Induction Signal</span>
                  <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>MATCH</span>
                </div>
                <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{selectedAnomaly.signatures.emi}</p>
              </div>

              <div className={`p-3 rounded-lg border space-y-1 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between text-[11px]">
                  <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>Magnetometer Vector B_z</span>
                  <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>MATCH</span>
                </div>
                <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{selectedAnomaly.signatures.mag}</p>
              </div>

              <div className={`p-3 rounded-lg border space-y-1 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between text-[11px]">
                  <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>Self-Potential (SP) Redox</span>
                  <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>MATCH</span>
                </div>
                <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{selectedAnomaly.signatures.sp}</p>
              </div>

              <div className={`p-3 rounded-lg border space-y-1 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between text-[11px]">
                  <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Multi-Spectral Reflectance</span>
                  <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>MATCH</span>
                </div>
                <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{selectedAnomaly.signatures.spectral}</p>
              </div>
            </div>
          </div>

          {/* Provenance Audit Footer */}
          <div className={`p-3 rounded-lg flex items-center justify-between text-xs border ${
            isDark ? 'bg-cyan-950/30 border-cyan-500/30' : 'bg-cyan-50 border-cyan-300'
          }`}>
            <div className={`flex items-center gap-2 ${isDark ? 'text-cyan-300' : 'text-cyan-900'}`}>
              <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span>Provenance: <strong className="font-extrabold">{selectedAnomaly.provenance}</strong></span>
            </div>
            <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Audit Hash: 0x8f2c...49ab</span>
          </div>
        </div>
      </div>
    </div>
  );
};
