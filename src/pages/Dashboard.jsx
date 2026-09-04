import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Share2,
  FileText,
  DollarSign,
  ArrowRight,
  Activity,
  Flame,
  Search
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { usePlatform } from '../context/PlatformContext';
import StatCard from '../components/common/StatCard';
import { RiskBadge, StatusBadge } from '../components/common/Badge';

export default function Dashboard() {
  const { complaints, predictions, alerts, stats, setSelectedComplaintId } = usePlatform();
  const navigate = useNavigate();

  // Risk Tier Distribution Data for Donut Chart
  const riskCounts = {
    HIGH: predictions.filter((p) => p.riskTier === 'HIGH').length,
    MEDIUM: predictions.filter((p) => p.riskTier === 'MEDIUM').length,
    LOW: predictions.filter((p) => p.riskTier === 'LOW').length
  };

  const donutData = [
    { name: 'High Risk (>85% Conf)', value: riskCounts.HIGH, color: '#DC2626' },
    { name: 'Medium Risk (65-85%)', value: riskCounts.MEDIUM, color: '#D97706' },
    { name: 'Low Risk (<65%)', value: riskCounts.LOW, color: '#0F7B3D' }
  ];

  // Hotspots by Metro Jurisdiction
  const metroData = [
    { city: 'Delhi-NCR', count: 7, valueCr: 4.8 },
    { city: 'Mumbai MMR', count: 5, valueCr: 3.6 },
    { city: 'Bengaluru', count: 3, valueCr: 3.1 },
    { city: 'Ahmedabad', count: 1, valueCr: 0.72 },
    { city: 'Kolkata', count: 1, valueCr: 1.1 }
  ];

  const handleInspectComplaint = (complaintId, route) => {
    setSelectedComplaintId(complaintId);
    navigate(route);
  };

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Top Banner: Official National Alert Level */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#133B6B] to-[#0B2545] text-white p-4 rounded-[4px] border border-[#1A3A6B] shadow-gov flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 text-red-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                NATIONAL CYBER THREAT LEVEL: ELEVATED
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Code: ORANGE-MULE-INTERDICT
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-1">
              Active cash-out prediction engine scanning across <strong>Delhi-NCR, Mumbai & Bengaluru</strong> corridors. Average interdiction window: <strong>38 minutes prior to ATM debit</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
          <button
            onClick={() => navigate('/heatmap')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-[#FF6B1A] hover:bg-[#E0550B] text-white text-xs font-bold rounded shadow transition"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Open GIS Map</span>
          </button>
          <button
            onClick={() => navigate('/complaints')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded border border-white/20 transition"
          >
            <span>+ Ingest Case</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Ingested Cyber Complaints"
          value={stats.totalComplaints}
          subvalue="cases logged"
          icon={FileText}
          trend="+4 in last 2 hours"
          trendType="neutral"
          accentColor="#0B2545"
          tag="NCRP / CFCFRMS"
        />

        <StatCard
          title="High-Risk Predicted Cash-Outs"
          value={stats.activeHighRisk}
          subvalue="ATMs under watch"
          icon={AlertTriangle}
          trend="Confidence > 85%"
          trendType="negative"
          colorClass="text-red-600"
          accentColor="#DC2626"
          tag="IMMINENT CASH-OUT"
        />

        <StatCard
          title="Avg Predictive Lead-Time"
          value={`${stats.avgLeadTime} min`}
          subvalue="prior to withdrawal"
          icon={Clock}
          trend="Target: >30 min"
          trendType="positive"
          colorClass="text-blue-900"
          accentColor="#1A4F8B"
          tag="GraphSAGE + DBSCAN"
        />

        <StatCard
          title="Funds Protected / Intercepted"
          value={`₹${stats.restitutionProtectedCr} Cr`}
          subvalue="at-risk capital"
          icon={Shield}
          trend="92.4% success rate"
          trendType="positive"
          colorClass="text-emerald-700"
          accentColor="#0F7B3D"
          tag="RESTITUTION HOLD"
        />
      </div>

      {/* Hero Visualizer Split: Risk Distribution & Metropolitan Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Risk Tier Donut Distribution */}
        <div className="lg:col-span-5 gov-card p-4 flex flex-col justify-between">
          <div className="gov-card-header -mx-4 -mt-4 mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#0B2545]" />
              <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-serif">
                Cash-Out Risk-Tier Distribution
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border">
              TOTAL {predictions.length} PREDICTIONS
            </span>
          </div>

          <div className="h-60 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B2545',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '12px',
                    border: '1px solid #1A3A6B'
                  }}
                  formatter={(value, name) => [`${value} Alerts`, name]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Centered Donut Summary */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-800 font-sans">{riskCounts.HIGH}</span>
              <span className="text-[10px] font-mono text-red-600 uppercase font-bold tracking-wider">
                High Risk
              </span>
            </div>
          </div>

          {/* Legend Custom */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
            {donutData.map((item) => (
              <div key={item.name} className="p-2 rounded bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-[11px] font-bold text-slate-700">{item.value}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium block truncate">
                  {item.name.split(' ')[0]} {item.name.split(' ')[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Metropolitan Hotspot Volumes */}
        <div className="lg:col-span-7 gov-card p-4 flex flex-col justify-between">
          <div className="gov-card-header -mx-4 -mt-4 mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF6B1A]" />
              <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-serif">
                Regional Mule Cash-Out Volumes & Exposure (₹ Cr)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              REAL-TIME CLUSTERING
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metroData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="city" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B2545',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                  formatter={(val, name) => [
                    name === 'count' ? `${val} Active Hotspots` : `₹${val} Cr Capital`,
                    name === 'count' ? 'Hotspots' : 'Total Volume'
                  ]}
                />
                <Bar dataKey="count" name="Hotspots" fill="#133B6B" radius={[3, 3, 0, 0]} />
                <Bar dataKey="valueCr" name="Exposure (₹ Cr)" fill="#FF6B1A" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>Primary Focus Corridors: <strong>Connaught Place, BKC, Indiranagar, Noida Sec 18</strong></span>
            <button
              onClick={() => navigate('/prediction-engine')}
              className="text-[#2563EB] hover:text-[#1A4F8B] font-semibold flex items-center gap-1"
            >
              <span>Explain Model</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent High-Priority Predictions Table */}
      <div className="gov-card overflow-hidden">
        <div className="gov-card-header">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-serif">
              Live Interdiction Queue — Imminent Cash-Out Predictions
            </h3>
          </div>
          <button
            onClick={() => navigate('/alerts')}
            className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
          >
            <span>View All {alerts.length} Tactical Alerts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F1F5F9] text-slate-600 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-4">Complaint / Case ID</th>
                <th className="py-2.5 px-3">Victim & Fraud Type</th>
                <th className="py-2.5 px-3">Amount at Risk</th>
                <th className="py-2.5 px-3">Predicted Cash-Out ATM</th>
                <th className="py-2.5 px-3">Lead-Time</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3">Risk Tier</th>
                <th className="py-2.5 px-4 text-right">Command Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
              {predictions.slice(0, 6).map((pred) => {
                const linkedComplaint = complaints.find((c) => c.id === pred.complaintId);
                return (
                  <tr key={pred.id} className="hover:bg-blue-50/40 transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#0B2545]">
                      {pred.complaintId}
                      <span className="block text-[10px] font-normal text-slate-400 font-mono">
                        {pred.id}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">
                        {linkedComplaint?.victimName || 'N/A'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                        {linkedComplaint?.fraudType || 'Cyber Fraud'}
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      ₹{(pred.amountAtRisk || 0).toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800 truncate max-w-[220px]">
                        {pred.predictedLocation}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {pred.predictedAtmId} • {pred.city}
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono">
                      <span className="text-red-700 font-bold bg-red-50 border border-red-200 px-1.5 py-0.5 rounded text-[11px]">
                        {pred.leadTimeMinutes} mins
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0F7B3D] h-full"
                            style={{ width: `${pred.confidenceScore}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-slate-800 text-[11px]">
                          {pred.confidenceScore}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <RiskBadge tier={pred.riskTier} size="small" />
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleInspectComplaint(pred.complaintId, '/heatmap')}
                          title="Locate on GIS Map"
                          className="px-2 py-1 bg-white hover:bg-slate-100 text-[#0B2545] border border-slate-300 rounded text-[11px] font-medium transition flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3 text-[#FF6B1A]" />
                          <span>Map</span>
                        </button>
                        <button
                          onClick={() => handleInspectComplaint(pred.complaintId, '/fund-flow')}
                          title="View Mule Graph"
                          className="px-2 py-1 bg-[#0B2545] hover:bg-[#133B6B] text-white rounded text-[11px] font-medium transition flex items-center gap-1"
                        >
                          <Share2 className="w-3 h-3 text-amber-300" />
                          <span>Graph</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
