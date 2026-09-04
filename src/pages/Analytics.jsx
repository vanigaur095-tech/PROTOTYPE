import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Clock,
  DollarSign,
  Download,
  Calendar,
  Building,
  Target
} from 'lucide-react';
import StatCard from '../components/common/StatCard';

export default function Analytics() {
  // 1. Complaints vs Proactive Interventions Over Time
  const timelineData = [
    { date: 'Aug 10', complaints: 14, intercepted: 11, savedLakhs: 48 },
    { date: 'Aug 14', complaints: 19, intercepted: 16, savedLakhs: 72 },
    { date: 'Aug 18', complaints: 24, intercepted: 21, savedLakhs: 94 },
    { date: 'Aug 22', complaints: 28, intercepted: 25, savedLakhs: 118 },
    { date: 'Aug 26', complaints: 32, intercepted: 29, savedLakhs: 145 },
    { date: 'Aug 30', complaints: 39, intercepted: 36, savedLakhs: 182 },
    { date: 'Sep 04', complaints: 45, intercepted: 41, savedLakhs: 210 }
  ];

  // 2. Risk-Tier Distribution Across Metropolitan Jurisdictions
  const stateRiskData = [
    { state: 'Delhi (NCR)', high: 14, medium: 8, low: 3 },
    { state: 'Maharashtra (MMR)', high: 12, medium: 9, low: 4 },
    { state: 'Karnataka (BLR)', high: 9, medium: 6, low: 2 },
    { state: 'Uttar Pradesh', high: 8, medium: 5, low: 2 },
    { state: 'Haryana (GGN)', high: 6, medium: 4, low: 1 },
    { state: 'West Bengal', high: 4, medium: 3, low: 2 }
  ];

  // 3. Accuracy Trend & Average Lead-Time Saved (Composed)
  const accuracyTrendData = [
    { week: 'W1 (Jul)', accuracy: 82.4, leadTime: 24 },
    { week: 'W2', accuracy: 84.8, leadTime: 27 },
    { week: 'W3', accuracy: 87.1, leadTime: 31 },
    { week: 'W4 (Aug)', accuracy: 88.9, leadTime: 33 },
    { week: 'W5', accuracy: 89.6, leadTime: 35 },
    { week: 'W6', accuracy: 91.2, leadTime: 37 },
    { week: 'W7 (Sep)', accuracy: 92.5, leadTime: 39 }
  ];

  // 4. Targeted Bank Networks & Mule Concentration
  const bankVulnerabilityData = [
    { bank: 'State Bank of India', muleAccounts: 48, volumeCr: 3.8 },
    { bank: 'HDFC Bank', muleAccounts: 39, volumeCr: 3.2 },
    { bank: 'ICICI Bank', muleAccounts: 31, volumeCr: 2.4 },
    { bank: 'Punjab National Bank', muleAccounts: 22, volumeCr: 1.6 },
    { bank: 'Canara Bank', muleAccounts: 18, volumeCr: 1.4 },
    { bank: 'Axis Bank', muleAccounts: 17, volumeCr: 1.1 }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B1A] font-bold">
              MODULE 06 • PERFORMANCE METRICS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-serif">
            Intervention Analytics & Model Benchmarks
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Empirical evaluation of GraphSAGE cash-out prediction lead-time, spatial clustering accuracy, and capital recovery rates.
          </p>
        </div>

        <button
          onClick={() => alert('Official Law Enforcement Performance Report (PDF) generated.')}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#0B2545] hover:bg-[#133B6B] text-white text-xs font-bold rounded shadow transition self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#FF6B1A]" />
          <span>Export LEA Performance Dossier</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Model Precision"
          value="92.5%"
          subvalue="spatial precision"
          icon={Target}
          trend="+10.1% since baseline"
          trendType="positive"
          colorClass="text-emerald-700"
          accentColor="#0F7B3D"
          tag="CONFIRMED STRIKES"
        />

        <StatCard
          title="Average Pre-Withdrawal Lead"
          value="39 mins"
          subvalue="before ATM debit"
          icon={Clock}
          trend="+15 min over reactive"
          trendType="positive"
          colorClass="text-blue-900"
          accentColor="#1A4F8B"
          tag="LEA FIELD WINDOW"
        />

        <StatCard
          title="Total Restitution Protected"
          value="₹14.8 Cr"
          subvalue="victim capital saved"
          icon={ShieldCheck}
          trend="89.2% restitution rate"
          trendType="positive"
          colorClass="text-[#FF6B1A]"
          accentColor="#FF6B1A"
          tag="SECTION 102 BNSS"
        />

        <StatCard
          title="Mule Rings Neutralized"
          value="48 Rings"
          subvalue="across 5 states"
          icon={Building}
          trend="+7 this fortnight"
          trendType="positive"
          colorClass="text-purple-700"
          accentColor="#6B21A8"
          tag="SYNCHRONIZED SHUTDOWN"
        />
      </div>

      {/* Chart Row 1: Timeline Volume & Composed Accuracy Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Complaints Influx vs Proactive Interceptions */}
        <div className="lg:col-span-7 gov-card p-4">
          <div className="gov-card-header -mx-4 -mt-4 mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0B2545]" />
              <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-serif">
                Complaint Influx vs Proactive Interceptions (30 Days)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              91.1% INTERDICTION RATIO
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B2545" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0B2545" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorIntercepted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F7B3D" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#0F7B3D" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B2545',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area
                  type="monotone"
                  dataKey="complaints"
                  name="Total Ingested Complaints"
                  stroke="#0B2545"
                  fillOpacity={1}
                  fill="url(#colorComplaints)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="intercepted"
                  name="Proactive ATM Interceptions"
                  stroke="#0F7B3D"
                  fillOpacity={1}
                  fill="url(#colorIntercepted)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model Accuracy & Lead-Time Trend (Composed) */}
        <div className="lg:col-span-5 gov-card p-4">
          <div className="gov-card-header -mx-4 -mt-4 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF6B1A]" />
              <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-serif">
                Accuracy (%) & Lead-Time (mins) Evolution
              </h3>
            </div>
            <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              GRAPH-SAGE ITERATIONS
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={accuracyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748B' }} domain={[60, 100]} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748B' }} domain={[15, 45]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B2545',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar yAxisId="left" dataKey="accuracy" name="Accuracy (%)" fill="#133B6B" radius={[3, 3, 0, 0]} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="leadTime"
                  name="Lead-Time (mins)"
                  stroke="#FF6B1A"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#FF6B1A' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart Row 2: State Distribution & Bank Vulnerability */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Risk-Tier Distribution Across Metropolitan Jurisdictions */}
        <div className="lg:col-span-6 gov-card p-4">
          <div className="gov-card-header -mx-4 -mt-4 mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-serif">
              Risk-Tier Frequency by Metropolitan Police Jurisdiction
            </h3>
            <span className="text-[10px] font-mono text-slate-500">
              STACKED FREQUENCY
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateRiskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="state" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B2545',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="high" name="High Risk" fill="#DC2626" stackId="a" />
                <Bar dataKey="medium" name="Medium Risk" fill="#D97706" stackId="a" />
                <Bar dataKey="low" name="Low Risk" fill="#0F7B3D" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bank Network Vulnerability */}
        <div className="lg:col-span-6 gov-card p-4">
          <div className="gov-card-header -mx-4 -mt-4 mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-serif">
              Mule Account Concentrations by Banking Network
            </h3>
            <span className="text-[10px] font-mono text-slate-500">
              TOP VULNERABLE INSTITUTIONS
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bankVulnerabilityData}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis dataKey="bank" type="category" tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B2545',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                  formatter={(val, name) => [
                    name === 'muleAccounts' ? `${val} Identified Accounts` : `₹${val} Cr Siphoned`,
                    name === 'muleAccounts' ? 'Mule Accounts' : 'Exposure'
                  ]}
                />
                <Bar dataKey="muleAccounts" name="Mule Accounts" fill="#1A4F8B" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
