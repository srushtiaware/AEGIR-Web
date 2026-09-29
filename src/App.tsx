import React from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewPage } from './pages/OverviewPage';
import { SensorsPage } from './pages/SensorsPage';
import { SeafloorMapPage } from './pages/SeafloorMapPage';
import { AnomaliesPage } from './pages/AnomaliesPage';
import { LogsPage } from './pages/LogsPage';

const MainContent: React.FC = () => {
  const { activeTab } = useSimulation();

  return (
    <main className="flex-1 p-4 overflow-y-auto max-w-7xl mx-auto w-full">
      {activeTab === 'overview' && <OverviewPage />}
      {activeTab === 'sensors' && <SensorsPage />}
      {activeTab === 'map' && <SeafloorMapPage />}
      {activeTab === 'anomalies' && <AnomaliesPage />}
      {activeTab === 'logs' && <LogsPage />}
    </main>
  );
};

const AppContent: React.FC = () => {
  const { theme } = useSimulation();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDark ? 'bg-[#030712] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header />
      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export function App() {
  return (
    <SimulationProvider>
      <AppContent />
    </SimulationProvider>
  );
}

export default App;
