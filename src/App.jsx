import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import PipelineAnimationModal from './components/simulation/PipelineAnimationModal';

// Pages
import Dashboard from './pages/Dashboard';
import ComplaintIntake from './pages/ComplaintIntake';
import PredictionEngine from './pages/PredictionEngine';
import GisHeatmap from './pages/GisHeatmap';
import FundFlowGraph from './pages/FundFlowGraph';
import AlertsCenter from './pages/AlertsCenter';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7FB]">
      {/* Top National Header Bar */}
      <Header />

      {/* Main Body with Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-[#F4F7FB] flex flex-col min-w-0">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/complaints" element={<ComplaintIntake />} />
              <Route path="/prediction-engine" element={<PredictionEngine />} />
              <Route path="/heatmap" element={<GisHeatmap />} />
              <Route path="/fund-flow" element={<FundFlowGraph />} />
              <Route path="/alerts" element={<AlertsCenter />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
        </main>
      </div>

      {/* Global Ingestion Simulation Modal */}
      <PipelineAnimationModal />
    </div>
  );
}
