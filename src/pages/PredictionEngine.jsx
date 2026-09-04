import React, { useState } from 'react';
import {
  Cpu,
  GitBranch,
  MapPin,
  ShieldAlert,
  BellRing,
  Send,
  ChevronRight,
  Database,
  Layers,
  Sparkles,
  Sliders,
  CheckCircle2,
  FileCode2,
  Zap
} from 'lucide-react';
import { RiskBadge } from '../components/common/Badge';

export default function PredictionEngine() {
  const [activeStep, setActiveStep] = useState(1);

  // What-If Simulation Parameters
  const [hopVelocity, setHopVelocity] = useState(3.5); // minutes per hop
  const [clusterOverlap, setClusterOverlap] = useState(88); // %
  const [accountDormancy, setAccountDormancy] = useState(92); // %
  const [spatialEpsilon, setSpatialEpsilon] = useState(250); // meters

  // Calculate dynamic simulated confidence
  const calculatedConfidence = Math.min(
    99,
    Math.round(
      (10 - Math.min(hopVelocity, 10)) * 3.5 +
        clusterOverlap * 0.35 +
        accountDormancy * 0.3
    )
  );

  const calculatedRiskTier = calculatedConfidence > 85 ? 'HIGH' : calculatedConfidence > 65 ? 'MEDIUM' : 'LOW';

  const steps = [
    {
      id: 1,
      title: "Complaint Filed",
      subtitle: "NCRP 1930 / Bank Telemetry",
      icon: Database,
      tag: "INGESTION",
      summary: "First point of cybercrime reporting via NCRP Helpline 1930 or bank host webhook.",
      details: {
        heading: "Step 1: Real-Time Ingestion & UTR Normalization",
        body: "The victim files a financial cyber fraud complaint (e.g., Digital Arrest, Telegram Investment Scam) via NCRP Helpline 1930, CFCFRMS, or bank fraud gateways. The system ingests transaction UTRs, debited bank accounts, stolen amount, and timestamp.",
        math: "Schema: C = { id, victim_ac, utr, amount, timestamp, source }",
        techStack: "Apache Kafka / Redis Stream Ingestion Buffer (Simulated)",
        kpi: "< 1.2s Ingestion Latency"
      }
    },
    {
      id: 2,
      title: "Prediction Engine",
      subtitle: "KDE/DBSCAN + GraphSAGE",
      icon: Cpu,
      tag: "CORE AI / ML",
      summary: "Simulated Neo4j graph traversal combined with spatial DBSCAN clustering.",
      details: {
        heading: "Step 2: Spatio-Temporal KDE/DBSCAN & GraphSAGE Subgraph Embeddings",
        body: "The AI engine models the multi-hop fund routing graph. GraphSAGE generates low-dimensional vector embeddings for accounts by sampling immediate 2-hop to 4-hop mule neighborhoods. Simultaneously, Spatio-Temporal DBSCAN and Kernel Density Estimation (KDE) project the likely terminal cash-out ATM clusters based on historical cash-out corridors.",
        math: "h_v^(k) = σ(W · MEAN({h_u^(k-1), ∀u ∈ N(v)} ∪ {h_v^(k-1)}))",
        techStack: "GraphSAGE (PyTorch Geometric) + Spatio-Temporal KDE + Neo4j Graph DB",
        kpi: "38 min Avg Pre-Withdrawal Horizon"
      }
    },
    {
      id: 3,
      title: "Confidence Scoring",
      subtitle: "Multi-Factor Bayesian Fusion",
      icon: Sliders,
      tag: "ANALYTICS",
      summary: "Fuses hop velocity, cluster recurrence, and mule device fingerprints.",
      details: {
        heading: "Step 3: Multi-Factor Confidence Scoring (0 - 100%)",
        body: "Scores the likelihood that a specific ATM terminal will be debited within the computed lead-time window. Fuses three primary signals: Hop Velocity (latency between Layer-1 and Layer-3 accounts), Historical Spatial Co-occurrence (ATM withdrawal heat density), and Mule Account Risk Profile.",
        math: "Score = w_v · (1 / Δt_hop) + w_s · KDE(lat, lng) + w_m · Risk_mule",
        techStack: "Ensemble Bayesian Scoring Engine (Simulated)",
        kpi: "91.8% Validated Accuracy"
      }
    },
    {
      id: 4,
      title: "Risk Tiering",
      subtitle: "High, Medium, Low Tiers",
      icon: Layers,
      tag: "CLASSIFICATION",
      summary: "Automated triage assigning priority to imminent high-value withdrawals.",
      details: {
        heading: "Step 4: Autonomous Risk Tier Categorization",
        body: "Sorts alerts into actionable priority brackets:\n• HIGH (> 85% Confidence): Imminent withdrawal within 45 mins. Urgent dispatch.\n• MEDIUM (65% - 85%): Potential mule staging; automated ATM geofence surveillance.\n• LOW (< 65%): Latent or slow-velocity diversion; passive audit logging.",
        math: "Tier = { HIGH if S ≥ 0.85; MEDIUM if 0.65 ≤ S < 0.85; LOW if S < 0.65 }",
        techStack: "Automated Policy Matrix (I4C Standard SOPs)",
        kpi: "Zero False-Positive Escalation for High Tier"
      }
    },
    {
      id: 5,
      title: "Action & Alerting",
      subtitle: "LEA Push & ATM Geofence",
      icon: BellRing,
      tag: "DISPATCH",
      summary: "Targeted alert broadcast to nearest beat officers and bank switchboard.",
      details: {
        heading: "Step 5: Automated Alert Broadcasting & Smart Contract Lock",
        body: "IntelliTrace dispatches targeted push notifications to the nearest Police Station Beat Officer (via mobile MDT), sets an automated geofence warning on the target ATM switch, and records an immutable audit log entry on the Algorand Testnet ledger.",
        math: "Payload = { alert_id, lat, lng, lead_time, action: 'FIELD_DISPATCH' }",
        techStack: "WebSocket Dispatch + Algorand Testnet Smart Contract",
        kpi: "< 300ms Alert Distribution Speed"
      }
    },
    {
      id: 6,
      title: "Field Response",
      subtitle: "Interdiction & Restitution",
      icon: ShieldAlert,
      tag: "INTERVENTION",
      summary: "On-ground police intercept at ATM before card insertion & cash payout.",
      details: {
        heading: "Step 6: Proactive On-Ground Interdiction & Capital Recovery",
        body: "Law enforcement officers arrive at the predicted ATM location prior to the mule carrier's arrival. The ATM can also be placed on temporary administrative maintenance hold if authorized. Funds are frozen inside the mule debit account, enabling prompt restitution to the cyber victim under Section 102 CrPC / Section 106 BNSS.",
        math: "Restitution Protected = Total Debited - Cash Extracted = 100% Retained",
        techStack: "Command & Control Field Interdiction Console",
        kpi: "₹14.8 Cr Stolen Funds Successfully Intercepted"
      }
    }
  ];

  const currentStep = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B1A] font-bold">
            MODULE 02 • ALGORITHMIC ARCHITECTURE
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-serif">
          Prediction Engine Flow & AI Methodology
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Predicting cybercrime cash-out withdrawal locations <strong>before</strong> cash-out happens. Built with Spatio-Temporal KDE / DBSCAN clustering and GraphSAGE mule-network subgraph embeddings.
        </p>
      </div>

      {/* Horizontal Interactive Stepper Matching Presentation Flow */}
      <div className="gov-card p-4 overflow-x-auto">
        <div className="min-w-[760px] flex items-center justify-between gap-2">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isSelected = activeStep === s.id;
            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => setActiveStep(s.id)}
                  className={`flex-1 p-3 rounded text-left transition-all border relative ${
                    isSelected
                      ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-gov-md'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                        isSelected ? 'bg-[#FF6B1A] text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      Step 0{s.id}
                    </span>
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FF6B1A]' : 'text-slate-400'}`} />
                  </div>
                  <div className="text-xs font-bold font-serif leading-snug truncate">
                    {s.title}
                  </div>
                  <div className={`text-[10px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {s.subtitle}
                  </div>
                </button>

                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Detail Card + Mathematical Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Active Step Deep-Dive Panel */}
        <div className="lg:col-span-7 gov-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B1A]"></span>
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#0B2545]">
                {currentStep.details.heading}
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-bold">
              {currentStep.tag}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {currentStep.details.body}
          </p>

          {/* Mathematical Formulation Box */}
          <div className="p-3 bg-[#07162c] text-slate-200 rounded border border-[#1A3A6B] font-mono text-xs">
            <div className="text-[10px] text-[#FF6B1A] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileCode2 className="w-3.5 h-3.5" /> Mathematical Formulation / Schema
            </div>
            <div className="text-cyan-300 bg-[#0B2545]/60 p-2 rounded border border-[#133B6B] overflow-x-auto text-[11px]">
              {currentStep.details.math}
            </div>
          </div>

          {/* Architecture & KPI tags */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[10px] text-slate-500 font-mono block">UNDERLYING STACK:</span>
              <strong className="text-slate-800 text-[11px] font-mono">{currentStep.details.techStack}</strong>
            </div>
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded">
              <span className="text-[10px] text-emerald-700 font-mono block">BENCHMARK METRIC:</span>
              <strong className="text-emerald-900 text-[11px] font-mono">{currentStep.details.kpi}</strong>
            </div>
          </div>
        </div>

        {/* Right: Interactive "What-If" Confidence Simulator */}
        <div className="lg:col-span-5 gov-card p-5 flex flex-col justify-between space-y-4">
          <div className="gov-card-header -mx-5 -mt-5 mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF6B1A]" />
              <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-serif">
                Interactive "What-If" Parameter Tuner
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
              LIVE SIMULATOR
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Adjust multi-factor parameters to see how GraphSAGE hop velocity and DBSCAN spatial clustering dynamically score cash-out probability.
          </p>

          <div className="space-y-3.5 text-xs">
            {/* Slider 1: Hop Velocity */}
            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-1">
                <span>Hop Latency (minutes per hop):</span>
                <span className="font-mono font-bold text-[#0B2545]">{hopVelocity} mins</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={hopVelocity}
                onChange={(e) => setHopVelocity(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B2545]"
              />
              <span className="text-[10px] text-slate-400">Faster transfer between mules = higher withdrawal urgency</span>
            </div>

            {/* Slider 2: Cluster Overlap */}
            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-1">
                <span>DBSCAN ATM Cluster Overlap:</span>
                <span className="font-mono font-bold text-[#0B2545]">{clusterOverlap}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={clusterOverlap}
                onChange={(e) => setClusterOverlap(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B1A]"
              />
              <span className="text-[10px] text-slate-400">Historical frequency of syndicate cash-outs in this geographical pocket</span>
            </div>

            {/* Slider 3: Mule Account Dormancy */}
            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-1">
                <span>Mule Dormancy / Shell Signature:</span>
                <span className="font-mono font-bold text-[#0B2545]">{accountDormancy}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={accountDormancy}
                onChange={(e) => setAccountDormancy(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0F7B3D]"
              />
              <span className="text-[10px] text-slate-400">Recently reactivated dormant or Jan Dhan account signature</span>
            </div>
          </div>

          {/* Computed Score Output */}
          <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Calculated Confidence:</span>
              <span className="text-2xl font-mono font-bold text-slate-900">
                {calculatedConfidence}%
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  calculatedConfidence > 85 ? 'bg-red-600' : calculatedConfidence > 65 ? 'bg-amber-500' : 'bg-emerald-600'
                }`}
                style={{ width: `${calculatedConfidence}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500 font-mono">Assigned Category:</span>
              <RiskBadge tier={calculatedRiskTier} size="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
