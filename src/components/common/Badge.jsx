import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export function RiskBadge({ tier, showIcon = true, size = 'normal' }) {
  const t = (tier || 'LOW').toUpperCase();

  const configs = {
    HIGH: {
      bg: 'bg-red-50 text-red-700 border-red-200',
      dot: 'bg-red-500',
      icon: AlertTriangle,
      label: 'High Risk'
    },
    MEDIUM: {
      bg: 'bg-amber-50 text-amber-750 border-amber-200 text-amber-800',
      dot: 'bg-amber-500',
      icon: AlertCircle,
      label: 'Medium Risk'
    },
    LOW: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dot: 'bg-emerald-500',
      icon: CheckCircle,
      label: 'Low Risk'
    }
  };

  const config = configs[t] || configs.LOW;
  const Icon = config.icon;

  const sizeClasses = size === 'small' 
    ? 'px-1.5 py-0.5 text-[10px]' 
    : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-[3px] border ${config.bg} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${t === 'HIGH' ? 'animate-pulse' : ''}`} />
      {showIcon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{config.label}</span>
    </span>
  );
}

export function StatusBadge({ status }) {
  const s = (status || '').toLowerCase();

  let style = 'bg-slate-100 text-slate-700 border-slate-200';
  let dot = 'bg-slate-400';

  if (s.includes('predict') || s.includes('graph')) {
    style = 'bg-blue-50 text-blue-700 border-blue-200';
    dot = 'bg-blue-500';
  } else if (s.includes('valid')) {
    style = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    dot = 'bg-indigo-500';
  } else if (s.includes('dispatch') || s.includes('acknowledged')) {
    style = 'bg-amber-50 text-amber-800 border-amber-200';
    dot = 'bg-amber-500';
  } else if (s.includes('resolve') || s.includes('intervened')) {
    style = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    dot = 'bg-emerald-500';
  } else if (s.includes('pending')) {
    style = 'bg-rose-50 text-rose-700 border-rose-200';
    dot = 'bg-rose-500';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] text-[11px] font-semibold tracking-wide border ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      <span>{status}</span>
    </span>
  );
}
