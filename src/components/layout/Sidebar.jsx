import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Cpu,
  MapPin,
  Share2,
  AlertTriangle,
  BarChart3,
  PlusCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export default function Sidebar() {
  const { complaints, predictions, alerts } = usePlatform();

  const pendingAlertsCount = alerts.filter(a => a.status === 'Pending').length;
  const highRiskPredictionsCount = predictions.filter(p => p.riskTier === 'HIGH').length;

  const navItems = [
    {
      to: '/',
      label: 'National Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/complaints',
      label: 'Complaint Intake',
      icon: FileText,
      badge: complaints.length
    },
    {
      to: '/prediction-engine',
      label: 'Prediction Engine',
      icon: Cpu,
      badge: 'ML'
    },
    {
      to: '/heatmap',
      label: 'GIS Risk Heatmap',
      icon: MapPin,
      badge: 'LIVE',
      pulse: true
    },
    {
      to: '/fund-flow',
      label: 'Fund-Flow Graph',
      icon: Share2,
      badge: 'Neo4j'
    },
    {
      to: '/alerts',
      label: 'Alerts & Actions',
      icon: AlertTriangle,
      badge: pendingAlertsCount > 0 ? `${pendingAlertsCount} New` : null,
      highlight: pendingAlertsCount > 0
    },
    {
      to: '/analytics',
      label: 'Intervention Analytics',
      icon: BarChart3,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-[#0B2545] text-slate-300 flex flex-col shrink-0 border-r border-[#1A3A6B] min-h-[calc(100vh-61px)] shadow-lg select-none">
      {/* Navigation Links */}
      <div className="p-3">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2 font-mono">
          Command Operations
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-[4px] text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#1A4F8B] text-white shadow-sm border-l-4 border-[#FF6B1A] pl-2 font-semibold'
                      : 'hover:bg-[#133B6B]/60 hover:text-white text-slate-300'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 text-slate-300" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      item.highlight
                        ? 'bg-red-500 text-white animate-pulse'
                        : item.pulse
                        ? 'bg-[#0F7B3D] text-white flex items-center gap-1'
                        : 'bg-[#07162c] text-slate-300 border border-[#1A3A6B]'
                    }`}
                  >
                    {item.pulse && <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping"></span>}
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* System Telemetry Box */}
      <div className="mx-3 mt-2 p-3 bg-[#07162c]/90 rounded border border-[#1A3A6B] text-xs">
        <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] mb-2 border-b border-[#1A3A6B]/80 pb-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            TELEMETRY NODE
          </span>
          <span className="text-emerald-400 font-bold">ONLINE</span>
        </div>

        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-400">High-Risk Targets:</span>
            <span className="text-red-400 font-bold">{highRiskPredictionsCount} ATMs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Avg Lead-Time:</span>
            <span className="text-amber-400 font-bold">38 mins</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Graph Engine:</span>
            <span className="text-cyan-400 font-medium">Neo4j (Sim)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Ledger:</span>
            <span className="text-purple-300 font-medium">Algorand v4.0.2</span>
          </div>
        </div>
      </div>

      {/* Quick Intake Trigger Banner */}
      <div className="p-3 mt-auto">
        <NavLink
          to="/complaints"
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-[#FF6B1A] to-[#E0550B] hover:from-[#E0550B] hover:to-[#C2410C] text-white rounded-[4px] text-xs font-bold shadow-md transition-all uppercase tracking-wider"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ingest Complaint</span>
        </NavLink>

        <div className="mt-3 text-[10px] text-slate-400 text-center font-mono border-t border-[#1A3A6B] pt-2">
          Build with Bharat 2.0 • Team Coffee Coders<br />
          <span className="text-slate-500">JSS University Noida</span>
        </div>
      </div>
    </aside>
  );
}
