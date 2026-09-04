import React from 'react';
import { Shield, Info, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#D7E2EE] text-slate-600 text-xs py-3 px-6 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        {/* Hackathon Disclaimer */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
          <p className="text-[11px]">
            <strong className="text-slate-800">IntelliTrace</strong> — Prototype for demonstration purposes •{' '}
            <span className="text-[#FF6B1A] font-semibold">Build with Bharat 2.0 Hackathon</span> • Team Coffee Coders (JSS University Noida).
          </p>
        </div>

        {/* Technical Notice */}
        <div className="text-[11px] text-slate-500 flex items-center gap-4">
          <span>Simulation Mode: Neo4j GraphSAGE Embeddings & Algorand Ledger mock</span>
          <span className="text-slate-300">|</span>
          <span className="font-mono text-[10px] text-slate-400">BUILD v2.0.4-PROD-MOCK</span>
        </div>
      </div>
    </footer>
  );
}
