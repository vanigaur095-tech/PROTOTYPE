import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subvalue,
  icon: Icon,
  trend,
  trendType = 'neutral', // 'positive', 'negative', 'neutral'
  colorClass = 'text-slate-800',
  accentColor = '#0B2545',
  tag
}) {
  return (
    <div className="gov-card p-4 relative overflow-hidden transition-all duration-200 hover:shadow-gov-md hover:border-[#B4C7DD]">
      {/* Top indicator stripe */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: accentColor }}></div>

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            {title}
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-bold font-sans ${colorClass}`}>
              {value}
            </span>
            {subvalue && (
              <span className="text-xs text-slate-500 font-medium">
                {subvalue}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div
            className="w-10 h-10 rounded-[4px] flex items-center justify-center shrink-0 border"
            style={{
              backgroundColor: `${accentColor}12`,
              borderColor: `${accentColor}30`,
              color: accentColor
            }}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(trend || tag) && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          {trend && (
            <div className="flex items-center gap-1">
              {trendType === 'positive' && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />}
              {trendType === 'negative' && <ArrowDownRight className="w-3.5 h-3.5 text-red-600" />}
              {trendType === 'neutral' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
              <span
                className={`text-[11px] font-medium ${
                  trendType === 'positive'
                    ? 'text-emerald-700'
                    : trendType === 'negative'
                    ? 'text-red-700'
                    : 'text-slate-500'
                }`}
              >
                {trend}
              </span>
            </div>
          )}

          {tag && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              {tag}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
