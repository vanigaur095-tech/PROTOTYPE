import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Loader2, 
  Network, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight,
  Database,
  ExternalLink
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export default function PipelineAnimationModal() {
  const { isSimulating, setIsSimulating, simulationStage, latestIngestedComplaint, setSelectedComplaintId } = usePlatform();
  const navigate = useNavigate();

  if (!isSimulating || !latestIngestedComplaint) return null;

  const steps = [
    {
      step: 1,
      title: "Complaint Ingested & Telemetry Linked",
      desc: "Validated victim UTR, mapped bank origin (SBI/HDFC/ICICI) into unified cyber ledger.",
      icon: Database
    },
    {
      step: 2,
      title: "GraphSAGE Multi-Hop Mule Traversal",
      desc: "Simulated Neo4j graph engine detected 3-hop mule fanout; latency: 3.4 mins/hop.",
      icon: Network
    },
    {
      step: 3,
      title: "Spatio-Temporal KDE / DBSCAN Spatial Match",
      desc: "Matched withdrawal trajectory to active ATM cluster (Density epsilon = 200m).",
      icon: MapPin
    },
    {
      step: 4,
      title: "Risk Tier Assigned & LEA Alert Dispatched",
      desc: "Confidence: 93% | Tier: HIGH | Algorand Testnet block mined & dispatch signal sent.",
      icon: AlertTriangle
    }
  ];

  const handleInspectMap = () => {
    setSelectedComplaintId(latestIngestedComplaint.id);
    setIsSimulating(false);
    navigate('/heatmap');
  };

  const handleInspectGraph = () => {
    setSelectedComplaintId(latestIngestedComplaint.id);
    setIsSimulating(false);
    navigate('/fund-flow');
  };

  const handleDismiss = () => {
    setIsSimulating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07162c]/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-[4px] border border-[#1A3A6B] shadow-2xl max-w-xl w-full overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0B2545] text-white px-5 py-4 border-b border-[#1A3A6B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#FF6B1A]/20 border border-[#FF6B1A]/40 flex items-center justify-center text-[#FF6B1A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#FF6B1A] uppercase tracking-wider block font-bold">
                INTELLITRACE AUTONOMOUS PIPELINE
              </span>
              <h3 className="font-serif font-bold text-base">
                Processing Complaint: {latestIngestedComplaint.id}
              </h3>
            </div>
          </div>

          <span className="text-xs font-mono bg-[#07162c] text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded">
            ₹{(latestIngestedComplaint.amount).toLocaleString('en-IN')}
          </span>
        </div>

        {/* Stepper Progress */}
        <div className="p-6 space-y-4">
          <div className="space-y-3.5">
            {steps.map((s) => {
              const Icon = s.icon;
              const isDone = simulationStage > s.step;
              const isCurrent = simulationStage === s.step;
              const isPending = simulationStage < s.step;

              return (
                <div
                  key={s.step}
                  className={`p-3 rounded border transition-all duration-300 flex items-start gap-3.5 ${
                    isDone
                      ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                      : isCurrent
                      ? 'bg-blue-50/90 border-[#2563EB] text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isCurrent ? (
                      <Loader2 className="w-5 h-5 text-[#2563EB] animate-spin" />
                    ) : (
                      <Icon className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold font-sans ${isCurrent ? 'text-blue-900' : isDone ? 'text-emerald-900' : 'text-slate-500'}`}>
                        Step {s.step}: {s.title}
                      </h4>
                      {isDone && (
                        <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                          COMPLETED
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-100 px-1.5 py-0.2 rounded animate-pulse">
                          EXECUTING
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Actions */}
          {simulationStage >= 4 && (
            <div className="mt-6 pt-4 border-t border-slate-200 bg-slate-50 -mx-6 -mb-6 p-5">
              <div className="flex items-center justify-between gap-3 mb-3 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pipeline Completed in 3.8 seconds</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">
                  Lead-Time: 35 mins before cash-out
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={handleInspectMap}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0B2545] hover:bg-[#133B6B] text-white rounded text-xs font-bold transition-all shadow"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B1A]" />
                  <span>Inspect on Map</span>
                </button>

                <button
                  onClick={handleInspectGraph}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1A4F8B] hover:bg-[#2563EB] text-white rounded text-xs font-bold transition-all shadow"
                >
                  <Network className="w-3.5 h-3.5 text-amber-300" />
                  <span>Inspect Graph</span>
                </button>

                <button
                  onClick={handleDismiss}
                  className="col-span-2 sm:col-span-1 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-medium transition-all"
                >
                  Close & Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
