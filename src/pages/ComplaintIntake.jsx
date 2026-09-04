import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FilePlus,
  Search,
  Filter,
  ArrowRight,
  Shield,
  Clock,
  Building,
  CheckCircle2,
  Sparkles,
  MapPin,
  Share2
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { StatusBadge } from '../components/common/Badge';

export default function ComplaintIntake() {
  const { complaints, ingestComplaint, setSelectedComplaintId } = usePlatform();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    victimName: '',
    victimAccount: '',
    victimBank: 'State Bank of India',
    amount: '',
    fraudType: 'Digital Arrest / CBI Impersonation',
    source: 'NCRP 1930 Helpline',
    state: 'Delhi',
    phone: '',
    utrNumber: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState('ALL');
  const [filterState, setFilterState] = useState('ALL');

  // Quick Demo Presets
  const presets = [
    {
      label: 'Digital Arrest ₹8.5L (Delhi)',
      data: {
        victimName: 'Harish Chandra Pant',
        victimAccount: 'XXXX-XXXX-9023',
        victimBank: 'State Bank of India',
        amount: '850000',
        fraudType: 'Digital Arrest / CBI Impersonation',
        source: 'NCRP 1930 Helpline',
        state: 'Delhi',
        phone: '+91 98102-XXXXX',
        utrNumber: 'SBIIN26249918230'
      }
    },
    {
      label: 'Telegram VIP Trading ₹14.2L (Mumbai)',
      data: {
        victimName: 'Pooja Kulkarni',
        victimAccount: 'XXXX-XXXX-4412',
        victimBank: 'HDFC Bank',
        amount: '1420000',
        fraudType: 'Institutional Trading Scam (Telegram VIP)',
        source: 'CFCFRMS Direct',
        state: 'Maharashtra',
        phone: '+91 98200-XXXXX',
        utrNumber: 'HDFCN26248901244'
      }
    },
    {
      label: 'Part-Time Task ₹4.75L (Noida)',
      data: {
        victimName: 'Abhishek Singhania',
        victimAccount: 'XXXX-XXXX-7711',
        victimBank: 'ICICI Bank',
        amount: '475000',
        fraudType: 'Part-Time Task & YouTube Review Fraud',
        source: 'NCRP 1930 Helpline',
        state: 'Uttar Pradesh',
        phone: '+91 97110-XXXXX',
        utrNumber: 'ICICIN26248810901'
      }
    },
    {
      label: 'Senior Pension Scam ₹9.8L (Delhi)',
      data: {
        victimName: 'Maj. Gen. A. S. Brar (Retd.)',
        victimAccount: 'XXXX-XXXX-3301',
        victimBank: 'Punjab National Bank',
        amount: '980000',
        fraudType: 'Pension KYC Update Vishing',
        source: 'NCRP 1930 Helpline',
        state: 'Delhi',
        phone: '+91 98114-XXXXX',
        utrNumber: 'PUNBN26247712399'
      }
    }
  ];

  const handleApplyPreset = (presetData) => {
    setFormData(presetData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.victimName || !formData.amount) {
      alert('Please enter Victim Name and Amount');
      return;
    }

    await ingestComplaint(formData);

    // Reset Form
    setFormData({
      victimName: '',
      victimAccount: '',
      victimBank: 'State Bank of India',
      amount: '',
      fraudType: 'Digital Arrest / CBI Impersonation',
      source: 'NCRP 1930 Helpline',
      state: 'Delhi',
      phone: '',
      utrNumber: ''
    });
  };

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.victimName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.victimBank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.fraudType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSource = filterSource === 'ALL' || c.source.includes(filterSource);
    const matchesState = filterState === 'ALL' || c.state === filterState;

    return matchesSearch && matchesSource && matchesState;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B1A] font-bold">
              MODULE 01 • INGESTION & REGISTRY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-serif">
            Cyber Fraud Complaint Intake & Live Pipeline Trigger
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ingest cases via NCRP 1930 Helpline, CFCFRMS portal, or Bank Sentinel APIs. Automatically triggers simulated multi-hop GraphSAGE graph traversal and cash-out prediction.
          </p>
        </div>
      </div>

      {/* Ingestion Form Card */}
      <div className="gov-card p-5 border-l-4 border-l-[#FF6B1A]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-[#FF6B1A]" />
            <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wide">
              Case Ingestion Console (Live Demonstration)
            </h3>
          </div>

          {/* Quick Preset Buttons for Presenters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Demo Presets:
            </span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p.data)}
                className="text-[11px] px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-300 transition"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Victim Name */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Complainant / Victim Name *
              </label>
              <input
                type="text"
                required
                value={formData.victimName}
                onChange={(e) => setFormData({ ...formData, victimName: e.target.value })}
                placeholder="e.g. Ramesh Chandra Verma"
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0B2545] focus:outline-none bg-white font-sans text-xs"
              />
            </div>

            {/* Siphoned Amount */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Fraud Amount (INR ₹) *
              </label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="e.g. 850000"
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0B2545] focus:outline-none bg-white font-mono text-xs font-bold text-slate-900"
              />
            </div>

            {/* Victim Bank */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Debited Origin Bank
              </label>
              <select
                value={formData.victimBank}
                onChange={(e) => setFormData({ ...formData, victimBank: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0B2545] focus:outline-none bg-white text-xs"
              >
                <option value="State Bank of India">State Bank of India</option>
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Punjab National Bank">Punjab National Bank</option>
                <option value="Canara Bank">Canara Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
              </select>
            </div>

            {/* State / Jurisdiction */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Jurisdiction / State
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0B2545] focus:outline-none bg-white text-xs"
              >
                <option value="Delhi">Delhi (NCR)</option>
                <option value="Uttar Pradesh">Uttar Pradesh (Noida/Ghaziabad)</option>
                <option value="Haryana">Haryana (Gurugram)</option>
                <option value="Maharashtra">Maharashtra (Mumbai MMR)</option>
                <option value="Karnataka">Karnataka (Bengaluru)</option>
                <option value="Gujarat">Gujarat (Ahmedabad)</option>
                <option value="West Bengal">West Bengal (Kolkata)</option>
              </select>
            </div>

            {/* Fraud Typology */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Fraud Typology / MO
              </label>
              <select
                value={formData.fraudType}
                onChange={(e) => setFormData({ ...formData, fraudType: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0B2545] focus:outline-none bg-white text-xs"
              >
                <option value="Digital Arrest / CBI Impersonation">Digital Arrest / CBI Impersonation</option>
                <option value="Institutional Trading Scam (Telegram VIP)">Institutional Trading Scam (Telegram VIP)</option>
                <option value="Part-Time Task & YouTube Review Fraud">Part-Time Task & YouTube Review Fraud</option>
                <option value="Stock IPO Allotment Phishing">Stock IPO Allotment Phishing</option>
                <option value="Pension KYC Update Vishing">Pension KYC Update Vishing</option>
                <option value="FedEx Narcotics Courier Scam">FedEx Narcotics Courier Scam</option>
                <option value="Instant Loan App Harassment">Instant Loan App Harassment</option>
              </select>
            </div>

            {/* Ingestion Source */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Reporting Channel / Source
              </label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0B2545] focus:outline-none bg-white text-xs"
              >
                <option value="NCRP 1930 Helpline">NCRP 1930 Helpline</option>
                <option value="CFCFRMS Direct">CFCFRMS Direct API</option>
                <option value="Bank API (Axis Fraud Engine)">Bank API (Host Integration)</option>
              </select>
            </div>

            {/* Victim Account Number */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Debited Account (Masked)
              </label>
              <input
                type="text"
                value={formData.victimAccount}
                onChange={(e) => setFormData({ ...formData, victimAccount: e.target.value })}
                placeholder="XXXX-XXXX-8921"
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0B2545] focus:outline-none bg-white font-mono text-xs"
              />
            </div>

            {/* Transaction Reference / UTR */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Transaction Reference / UTR
              </label>
              <input
                type="text"
                value={formData.utrNumber}
                onChange={(e) => setFormData({ ...formData, utrNumber: e.target.value })}
                placeholder="Auto-generated if empty"
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0B2545] focus:outline-none bg-white font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <span className="text-[11px] text-slate-500">
              * On submission, our autonomous pipeline immediately performs GraphSAGE subgraph expansion and predicts the imminent ATM cash-out point.
            </span>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0B2545] hover:bg-[#133B6B] text-white font-bold rounded text-xs tracking-wider uppercase shadow-md transition"
            >
              <FilePlus className="w-4 h-4 text-[#FF6B1A]" />
              <span>Submit & Execute Pipeline</span>
            </button>
          </div>
        </form>
      </div>

      {/* Complaints Directory & Search Table */}
      <div className="gov-card overflow-hidden">
        <div className="gov-card-header flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#0B2545] font-serif">
              National Cyber Crime Registry ({filteredComplaints.length} Records)
            </h3>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search case, name, bank..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-[#0B2545] text-xs bg-white w-48 sm:w-60 font-sans"
              />
            </div>

            {/* Source Filter */}
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="px-2 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
            >
              <option value="ALL">All Sources</option>
              <option value="NCRP">NCRP 1930</option>
              <option value="CFCFRMS">CFCFRMS</option>
              <option value="Bank">Bank API</option>
            </select>

            {/* State Filter */}
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="px-2 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
            >
              <option value="ALL">All States</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Haryana">Haryana</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F1F5F9] text-slate-600 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-4">Complaint ID</th>
                <th className="py-2.5 px-3">Victim Name</th>
                <th className="py-2.5 px-3">Amount (₹)</th>
                <th className="py-2.5 px-3">Bank & Origin</th>
                <th className="py-2.5 px-3">Fraud MO Category</th>
                <th className="py-2.5 px-3">Source Channel</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Pipeline Status</th>
                <th className="py-2.5 px-4 text-right">Drill-Down</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
              {filteredComplaints.map((c) => (
                <tr key={c.id} className="hover:bg-blue-50/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#0B2545]">
                    {c.id}
                  </td>

                  <td className="py-3 px-3 font-semibold text-slate-800">
                    {c.victimName}
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    ₹{c.amount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-800">{c.victimBank}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{c.victimAccount} • {c.state}</div>
                  </td>

                  <td className="py-3 px-3 text-[11px] text-slate-600 max-w-[200px] truncate">
                    {c.fraudType}
                  </td>

                  <td className="py-3 px-3 text-[11px]">
                    <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[10px]">
                      {c.source}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-[11px] text-slate-500 font-mono">
                    {c.timestamp.split(' ')[1]} {c.timestamp.split(' ')[2]}
                  </td>

                  <td className="py-3 px-3">
                    <StatusBadge status={c.status} />
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedComplaintId(c.id);
                          navigate('/heatmap');
                        }}
                        title="Locate Prediction on Map"
                        className="p-1.5 text-[#FF6B1A] hover:bg-orange-50 rounded border border-orange-200 transition"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedComplaintId(c.id);
                          navigate('/fund-flow');
                        }}
                        title="View Mule Graph"
                        className="p-1.5 text-[#133B6B] hover:bg-blue-50 rounded border border-blue-200 transition"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
