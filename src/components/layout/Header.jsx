import React, { useState, useEffect } from 'react';
import { Shield, AlertCircle, Clock, CheckCircle2, Terminal } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export default function Header() {
  const { stats } = usePlatform();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' IST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-[#0B2545] text-white border-b border-[#1A3A6B] select-none sticky top-0 z-40 shadow-md">
      {/* Tricolor Accent Ribbon */}
      <div className="tricolor-stripe w-full" />

      <div className="px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Emblem & National Title */}
        <div className="flex items-center gap-3.5">
          {/* Official Emblem Placeholder */}
          <div className="relative flex items-center justify-center w-11 h-11 bg-white rounded-[3px] border border-[#FF6B1A]/40 shadow-inner p-1">
            <svg viewBox="0 0 100 100" className="w-9 h-9">
              {/* Ashoka Chakra & Lions Graphic Representation */}
              <circle cx="50" cy="50" r="45" fill="#0B2545" />
              <circle cx="50" cy="50" r="40" fill="#FFFFFF" stroke="#0B2545" strokeWidth="2" />
              <circle cx="50" cy="50" r="18" fill="none" stroke="#0B2545" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="3" fill="#0B2545" />
              {/* 24 spokes */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="32"
                  x2="50"
                  y2="68"
                  stroke="#0B2545"
                  strokeWidth="1.2"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
              {/* Saffron & Green side accents */}
              <path d="M12,50 Q20,20 50,14" fill="none" stroke="#FF6B1A" strokeWidth="3" />
              <path d="M88,50 Q80,80 50,86" fill="none" stroke="#0F7B3D" strokeWidth="3" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B1A] bg-[#FF6B1A]/10 px-1.5 py-0.5 rounded border border-[#FF6B1A]/30">
                GOVT OF INDIA • LEA PORTAL
              </span>
              <span className="text-[11px] text-slate-300 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
                NCRP-CFCFRMS FEED ACTIVE
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white font-serif leading-tight">
              IntelliTrace <span className="font-sans font-normal text-xs sm:text-sm text-slate-300">— National Cyber Fraud Cash-Out Intelligence</span>
            </h1>
          </div>
        </div>

        {/* Center: Realtime National Threat Level */}
        <div className="hidden lg:flex items-center gap-3 bg-[#07162c] px-3.5 py-1.5 rounded-[4px] border border-[#1A3A6B]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-radar"></div>
          <div className="text-xs">
            <span className="text-slate-400 block font-mono text-[10px] uppercase tracking-wider">National Alert Posture</span>
            <span className="text-red-400 font-semibold tracking-wide flex items-center gap-1.5">
              <span>ELEVATED</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-200">{stats.activeHighRisk} Active Mule Rings Tracked</span>
            </span>
          </div>
        </div>

        {/* Right: Agency Badges & Time */}
        <div className="flex items-center gap-3 text-right">
          {/* Agency Badges */}
          <div className="hidden md:flex items-center gap-2">
            <div className="px-2 py-1 bg-[#133B6B]/80 rounded border border-[#1A4F8B] text-[11px] font-medium text-slate-200">
              <span className="text-[#FF6B1A] font-bold">I4C</span> • MHA
            </div>
            <div className="px-2 py-1 bg-[#133B6B]/80 rounded border border-[#1A4F8B] text-[11px] font-medium text-slate-200">
              <span className="text-[#0F7B3D] font-bold">CFCFRMS</span> 1930
            </div>
            <div className="px-2 py-1 bg-amber-500/15 rounded border border-amber-500/40 text-[11px] font-semibold text-amber-300">
              Build with Bharat 2.0
            </div>
          </div>

          {/* Clock & Status */}
          <div className="bg-[#07162c] px-3 py-1 rounded border border-[#1A3A6B] font-mono text-xs text-slate-200">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
              <Clock className="w-3 h-3 text-[#FF6B1A]" />
              <span>COMMAND CLOCK</span>
            </div>
            <div className="font-bold text-white tracking-wider">{timeStr || '18:40:00 IST'}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
