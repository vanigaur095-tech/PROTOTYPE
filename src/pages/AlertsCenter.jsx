import React, { useState } from 'react';
import {
  AlertTriangle,
  Shield,
  Send,
  CheckCircle2,
  Lock,
  Clock,
  ExternalLink,
  Search,
  Filter,
  Terminal,
  Database,
  Eye,
  FileCheck2
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { RiskBadge, StatusBadge } from '../components/common/Badge';

export default function AlertsCenter() {
  const { alerts, updateAlertStatus, auditLogs } = usePlatform();

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuditLog, setSelectedAuditLog] = useState(null);

  // Filter alerts
  const filteredAlerts = alerts.filter((a) => {
    const matchesTab =
      activeTab === 'ALL'
        ? true
        : activeTab === 'PENDING'
        ? a.status === 'Pending'
        : activeTab === 'DISPATCHED'
        ? a.status === 'Field Unit Dispatched' || a.status === 'Acknowledged'
        : a.status === 'Resolved';

    const matchesSearch =
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.complaintId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.predictedAtmLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleAction = (alertId, newStatus, unit) => {
    updateAlertStatus(alertId, newStatus, unit);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B1A] font-bold">
              MODULE 05 • COMMAND DISPATCH & SETTLEMENT
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-serif">
            Alerts & Field Action Center
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Dispatch beat officers, trigger ATM geofence holds, and record immutable interdiction proofs on the Algorand smart ledger.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded border border-slate-300 text-xs self-start sm:self-auto">
          {['ALL', 'PENDING', 'DISPATCHED', 'RESOLVED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition font-mono ${
                activeTab === tab
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Table */}
      <div className="gov-card overflow-hidden">
        <div className="gov-card-header flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-bold text-[#0B2545] font-serif">
              Tactical Dispatch Queue ({filteredAlerts.length} Alerts)
            </h3>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search alert, ATM, jurisdiction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none w-52 sm:w-64 font-sans"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F1F5F9] text-slate-600 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-4">Alert ID</th>
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Predicted ATM & Jurisdiction</th>
                <th className="py-2.5 px-3">Lead-Time</th>
                <th className="py-2.5 px-3">Risk Tier</th>
                <th className="py-2.5 px-3">Recommended Action</th>
                <th className="py-2.5 px-3">Operational Status</th>
                <th className="py-2.5 px-4 text-right">Intervention Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
              {filteredAlerts.map((a) => (
                <tr key={a.id} className="hover:bg-blue-50/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#0B2545]">
                    {a.id}
                  </td>

                  <td className="py-3 px-3 font-mono font-semibold text-slate-800">
                    {a.complaintId}
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800 max-w-[220px] truncate">
                      {a.predictedAtmLocation}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {a.jurisdiction} • {a.nearestPS}
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-red-600">
                    {a.leadTimeDisplay.split(' ')[0]}
                  </td>

                  <td className="py-3 px-3">
                    <RiskBadge tier={a.riskTier} size="small" />
                  </td>

                  <td className="py-3 px-3 text-[11px] font-medium text-slate-700 max-w-[200px]">
                    {a.recommendedAction}
                  </td>

                  <td className="py-3 px-3">
                    <StatusBadge status={a.status} />
                    {a.assignedUnit !== 'Unassigned' && (
                      <span className="block text-[10px] font-mono text-slate-500 mt-0.5">
                        {a.assignedUnit}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {a.status === 'Pending' && (
                        <button
                          onClick={() => handleAction(a.id, 'Field Unit Dispatched', 'PCR Intercept QRT-02')}
                          className="px-2.5 py-1 bg-[#0B2545] hover:bg-[#133B6B] text-white rounded text-[11px] font-bold transition flex items-center gap-1 shadow-sm uppercase tracking-wide"
                        >
                          <Send className="w-3 h-3 text-[#FF6B1A]" />
                          <span>Dispatch</span>
                        </button>
                      )}

                      {a.status === 'Field Unit Dispatched' && (
                        <button
                          onClick={() => handleAction(a.id, 'Resolved', a.assignedUnit)}
                          className="px-2.5 py-1 bg-[#0F7B3D] hover:bg-[#0A5C2D] text-white rounded text-[11px] font-bold transition flex items-center gap-1 shadow-sm uppercase tracking-wide"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Resolve (Saved)</span>
                        </button>
                      )}

                      {a.status === 'Resolved' && (
                        <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          INTERCEPTED
                        </span>
                      )}

                      {a.status === 'Acknowledged' && (
                        <button
                          onClick={() => handleAction(a.id, 'Field Unit Dispatched', 'Beat Officer Assigned')}
                          className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-bold transition flex items-center gap-1 shadow-sm"
                        >
                          <Send className="w-3 h-3" />
                          <span>Send Beat</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agentic Settlement & Immutable Audit Ledger Panel */}
      <div className="gov-card p-4 space-y-3 bg-[#07162c] text-white border-[#1A3A6B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A3A6B] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold font-serif text-white">
                  Agentic Settlement & Autonomous LEA Audit Ledger
                </h3>
                <span className="text-[10px] font-mono bg-purple-900/60 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded font-bold">
                  ALGORAND TESTNET v4.0.2 (SIMULATED)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Every proactive freeze order, geofence trigger, and field dispatch generates an immutable cryptographic receipt for judicial compliance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-right">
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-[#0B2545] px-2.5 py-1 rounded border border-[#1A3A6B]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              LATEST BLOCK #3892125
            </span>
          </div>
        </div>

        {/* Ledger Rows */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1A3A6B]">
                <th className="py-2 px-3">Tx Hash</th>
                <th className="py-2 px-3">Block</th>
                <th className="py-2 px-3">Case ID</th>
                <th className="py-2 px-3">Smart Interdiction Action</th>
                <th className="py-2 px-3">Affected Target / Entity</th>
                <th className="py-2 px-3">Value (₹)</th>
                <th className="py-2 px-3">Validator Node</th>
                <th className="py-2 px-3 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A3A6B]/60 text-slate-300">
              {auditLogs.slice(0, 7).map((log, index) => (
                <tr key={index} className="hover:bg-[#133B6B]/40 transition">
                  <td className="py-2.5 px-3 text-purple-300 font-bold truncate max-w-[150px]">
                    {log.txHash}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">
                    #{log.blockHeight}
                  </td>
                  <td className="py-2.5 px-3 text-[#FF6B1A] font-bold">
                    {log.complaintId}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-950 text-cyan-300 border border-cyan-800/40">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 truncate max-w-[200px]">
                    {log.entity}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">
                    ₹{(log.amountINR || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] truncate max-w-[140px]">
                    {log.validator}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => setSelectedAuditLog(log)}
                      className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-[#0B2545] border border-[#1A3A6B] hover:border-slate-400 transition"
                    >
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* On-Chain Receipt Modal */}
      {selectedAuditLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07162c]/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[4px] border border-[#1A3A6B] shadow-2xl max-w-lg w-full overflow-hidden text-slate-800">
            <div className="bg-[#0B2545] text-white px-4 py-3 flex items-center justify-between border-b border-[#1A3A6B]">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <h4 className="font-serif font-bold text-xs sm:text-sm">
                  Immutable LEA Smart Contract Interdiction Receipt
                </h4>
              </div>
              <button
                onClick={() => setSelectedAuditLog(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-4 space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction Hash:</span>
                  <span className="font-bold text-[#0B2545] text-[11px]">{selectedAuditLog.txHash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Block Height:</span>
                  <span className="font-bold">#{selectedAuditLog.blockHeight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Action:</span>
                  <span className="text-cyan-700 font-bold">{selectedAuditLog.action}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Entity:</span>
                  <span className="text-slate-800 font-bold">{selectedAuditLog.entity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Value Frozen:</span>
                  <span className="text-emerald-700 font-bold">₹{selectedAuditLog.amountINR?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Consensus Status:</span>
                  <span className="text-emerald-600 font-bold">CONFIRMED (Zero-Knowledge Verified)</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#07162c] text-slate-300 rounded text-[11px] space-y-1">
                <span className="text-slate-500 block text-[10px]">RAW PAYLOAD PROOF:</span>
                <div className="text-emerald-400 truncate">
                  sig: {selectedAuditLog.payloadSignature || '0x48f9a2...98c1'}
                </div>
                <div className="text-slate-400 text-[10px]">
                  Contract: APP-I4C-INTERDICT-SEC102BNSS | Network: Algorand Testnet v4.0.2
                </div>
              </div>

              <button
                onClick={() => setSelectedAuditLog(null)}
                className="w-full py-2 bg-[#0B2545] hover:bg-[#133B6B] text-white rounded text-xs font-bold transition"
              >
                Dismiss Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
