import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import {
  Share2,
  Filter,
  Shield,
  AlertTriangle,
  Lock,
  Download,
  Info,
  Layers,
  Database,
  RefreshCw,
  Eye,
  CheckCircle2,
  Zap,
  Building,
  CreditCard
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';

export default function FundFlowGraph() {
  const {
    graphNetworks,
    selectedComplaintId,
    setSelectedComplaintId,
    getUnifiedGraphData,
    updateAlertStatus,
    alerts
  } = usePlatform();

  const containerRef = useRef(null);
  const networkInstanceRef = useRef(null);

  // Active Selected Network Mode
  const [selectedRingKey, setSelectedRingKey] = useState(selectedComplaintId || 'NCRP-2026-89421');
  const [onlyHighConfidence, setOnlyHighConfidence] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [lienApplied, setLienApplied] = useState(false);

  // Load Graph Data
  useEffect(() => {
    if (!containerRef.current) return;

    let rawData;
    if (selectedRingKey === 'UNIFIED') {
      rawData = getUnifiedGraphData(onlyHighConfidence);
    } else {
      const ring = graphNetworks[selectedRingKey] || graphNetworks['NCRP-2026-89421'];
      if (!ring) return;
      rawData = {
        nodes: ring.nodes,
        edges: ring.edges
      };
    }

    // Format nodes for vis-network
    const formattedNodes = rawData.nodes.map((n) => {
      let shape = 'box';
      let bgColor = n.color || '#133B6B';
      let fontColor = '#FFFFFF';
      let borderColor = '#FFFFFF';

      if (n.role === 'VICTIM') {
        bgColor = '#1E40AF';
        borderColor = '#93C5FD';
      } else if (n.role === 'CASH_OUT_ATM') {
        bgColor = '#DC2626';
        borderColor = '#FCA5A5';
      } else {
        // Mule nodes
        bgColor = n.role === 'MULE_L3' ? '#C2410C' : n.role === 'MULE_L2' ? '#EA580C' : '#D97706';
        borderColor = '#FDE68A';
      }

      return {
        id: n.id,
        label: n.label,
        shape: 'box',
        margin: 12,
        color: {
          background: bgColor,
          border: borderColor,
          highlight: {
            background: bgColor,
            border: '#FF6B1A'
          }
        },
        font: {
          color: fontColor,
          face: 'Inter, sans-serif',
          size: 11,
          bold: true
        },
        borderWidth: 2,
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.2)',
          size: 6,
          x: 2,
          y: 2
        },
        originalData: n
      };
    });

    // Format edges for vis-network
    const formattedEdges = rawData.edges.map((e, index) => ({
      id: `edge-${index}`,
      from: e.from,
      to: e.to,
      label: e.label,
      arrows: {
        to: { enabled: true, scaleFactor: 1.2 }
      },
      width: Math.max(2, e.width || 3),
      color: e.color || { color: '#64748B' },
      dashes: !!e.dashes,
      font: {
        face: 'JetBrains Mono, monospace',
        size: 9,
        color: '#0B2545',
        strokeWidth: 3,
        strokeColor: '#FFFFFF',
        align: 'middle'
      },
      smooth: {
        type: 'cubicBezier',
        roundness: 0.3
      }
    }));

    const data = {
      nodes: new DataSet(formattedNodes),
      edges: new DataSet(formattedEdges)
    };

    const options = {
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -3500,
          centralGravity: 0.3,
          springLength: 140,
          springConstant: 0.05,
          damping: 0.09
        },
        stabilization: {
          iterations: 120
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        zoomView: true,
        dragView: true
      }
    };

    const network = new Network(containerRef.current, data, options);
    networkInstanceRef.current = network;

    // Node click handler
    network.on('click', (params) => {
      if (params.nodes.length > 0) {
        const clickedNodeId = params.nodes[0];
        const target = formattedNodes.find((n) => n.id === clickedNodeId);
        if (target) {
          setSelectedNodeData(target.originalData);
          setLienApplied(false);
        }
      } else {
        setSelectedNodeData(null);
      }
    });

    // Default select first mule or ATM node
    const firstMule = formattedNodes.find((n) => n.originalData.role.includes('MULE'));
    if (firstMule) {
      setSelectedNodeData(firstMule.originalData);
    }

    return () => {
      network.destroy();
    };
  }, [selectedRingKey, onlyHighConfidence, graphNetworks]);

  const handleApplyLien = () => {
    setLienApplied(true);
    const relatedAlert = alerts.find((a) => a.complaintId === selectedRingKey);
    if (relatedAlert) {
      updateAlertStatus(relatedAlert.id, 'Acknowledged', 'Automated Lien Executed');
    }
  };

  const handleRecenter = () => {
    if (networkInstanceRef.current) {
      networkInstanceRef.current.fit({ animation: { duration: 600, easingFunction: 'easeInOutQuad' } });
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B1A] font-bold">
              MODULE 04 • GRAPH ANALYTICS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-serif">
            Fund-Flow & Mule-Network Graph (Simulated Neo4j Engine)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time topology of victim debit routes, multi-hop mule aggregators, and target cash-out ATM terminals.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRecenter}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-semibold shadow-sm transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            <span>Reset Layout</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Ring Selector & Filter Toggle */}
      <div className="gov-card p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-[#FAFBFD]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Share2 className="w-4 h-4 text-[#0B2545]" />
            <span>Active Fraud Ring:</span>
          </div>

          <select
            value={selectedRingKey}
            onChange={(e) => {
              setSelectedRingKey(e.target.value);
              if (e.target.value !== 'UNIFIED') {
                setSelectedComplaintId(e.target.value);
              }
            }}
            className="px-3 py-1.5 border border-slate-300 rounded text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
          >
            <option value="NCRP-2026-89421">Case #89421: Digital Arrest Siphon (Connaught Place)</option>
            <option value="CFCFRMS-IN-77312">Case #77312: Telegram VIP Trading (BKC Mumbai)</option>
            <option value="NCRP-2026-89408">Case #89408: Part-Time Task Review (Noida Sec 18)</option>
            <option value="CFCFRMS-IN-77298">Case #77298: IPO Phishing Syndicate (Bengaluru Indiranagar)</option>
            <option value="NCRP-2026-89322">Case #89322: Pension KYC Fast-Drain (Nehru Place)</option>
            <option value="UNIFIED">⚡ Unified Multi-Complaint Mule Syndicate (Cross-Ring View)</option>
          </select>
        </div>

        {/* High Confidence Toggle */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
            <input
              type="checkbox"
              checked={onlyHighConfidence}
              onChange={(e) => setOnlyHighConfidence(e.target.checked)}
              className="rounded text-[#0B2545] focus:ring-0 w-4 h-4"
            />
            <span>Show only high-confidence fraud rings (&gt;90%)</span>
          </label>
        </div>
      </div>

      {/* Main Canvas + Right Side Dossier Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Graph Canvas */}
        <div className="lg:col-span-8 gov-card p-0 overflow-hidden relative min-h-[520px] flex flex-col bg-white">
          <div
            ref={containerRef}
            className="w-full h-[520px]"
            style={{ background: '#FAFBFD' }}
          />

          {/* Node Legend overlay */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-2.5 rounded border border-slate-200 shadow text-[11px] space-y-1.5 z-10">
            <div className="text-[10px] font-mono text-slate-500 font-bold uppercase">Role Legend:</div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#1E40AF]"></span>
              <span className="text-slate-700 font-medium">Victim Account (Origin)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#D97706]"></span>
              <span className="text-slate-700 font-medium">Mule Accounts (Layer 1-3 Hops)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#DC2626]"></span>
              <span className="text-slate-700 font-medium">Target Cash-Out ATM Terminal</span>
            </div>
          </div>

          {/* Neo4j Simulated Badge in bottom right */}
          <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded border border-slate-200 shadow z-10 flex items-center gap-1.5">
            <Database className="w-3 h-3 text-[#2563EB]" />
            <span>Powered by Neo4j graph database + GraphSAGE embeddings (simulated in this prototype)</span>
          </div>
        </div>

        {/* Right Entity Dossier Drawer */}
        <div className="lg:col-span-4 gov-card p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="gov-card-header -mx-4 -mt-4 mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0B2545]" />
                <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-serif">
                  Entity Intelligence Dossier
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                LIVE NODE INSPECTOR
              </span>
            </div>

            {selectedNodeData ? (
              <div className="space-y-3.5 text-xs">
                {/* Entity Role Header */}
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                        selectedNodeData.role === 'VICTIM'
                          ? 'bg-blue-100 text-blue-800'
                          : selectedNodeData.role === 'CASH_OUT_ATM'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {selectedNodeData.role.replace('_', ' ')}
                    </span>
                    <span className="font-mono text-slate-500 text-[11px]">
                      {selectedNodeData.riskScore}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">
                    {selectedNodeData.holder || selectedNodeData.location || selectedNodeData.label.replace('\n', ' ')}
                  </h4>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {selectedNodeData.bank}
                  </div>
                </div>

                {/* Account Details Table */}
                <div className="space-y-2 border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Account / Terminal:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {selectedNodeData.accountNo || selectedNodeData.atmId || 'N/A'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Jurisdiction City:</span>
                    <span className="font-medium text-slate-800">{selectedNodeData.city || 'Delhi-NCR'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">KYC Audit State:</span>
                    <span className="font-mono text-[11px] text-slate-700 text-right max-w-[180px]">
                      {selectedNodeData.kycStatus || 'Verified'}
                    </span>
                  </div>

                  {selectedNodeData.leadTime && (
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Predicted Lead-Time:</span>
                      <span className="font-mono font-bold text-red-600">
                        {selectedNodeData.leadTime}
                      </span>
                    </div>
                  )}

                  {selectedNodeData.balance && (
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Unwithdrawn Balance:</span>
                      <span className="font-mono font-bold text-slate-900">
                        {selectedNodeData.balance}
                      </span>
                    </div>
                  )}
                </div>

                {/* GraphSAGE Embedding Vector Sample */}
                <div className="p-2.5 bg-[#07162c] rounded border border-[#1A3A6B] text-[10px] font-mono text-slate-300">
                  <span className="text-[#FF6B1A] font-bold block mb-1">
                    GraphSAGE Node Embedding (Dim=64):
                  </span>
                  <div className="text-slate-400 truncate">
                    [0.4821, -0.1904, 0.8841, 0.3129, -0.0451, 0.9120, -0.7410, ...]
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                <Info className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                Click on any node in the graph to inspect account metadata, KYC status, and linked complaints.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {selectedNodeData && (
            <div className="space-y-2 pt-3 border-t border-slate-200">
              {lienApplied ? (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 flex items-center gap-2 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Smart Lien Recorded on Algorand Ledger!</span>
                </div>
              ) : (
                <button
                  onClick={handleApplyLien}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#FF6B1A] hover:bg-[#E0550B] text-white rounded text-xs font-bold shadow transition uppercase tracking-wider"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Apply Autonomous Lien (Sec 102 CrPC)</span>
                </button>
              )}

              <button
                onClick={() => alert(`Forensic dossier for ${selectedNodeData.holder || selectedNodeData.label} exported to I4C Evidence Locker.`)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium border border-slate-300 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Forensic Dossier</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
