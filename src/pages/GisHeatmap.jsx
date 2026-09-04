import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Filter,
  Shield,
  Clock,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Sliders,
  Send
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { RiskBadge } from '../components/common/Badge';

export default function GisHeatmap() {
  const { predictions, selectedComplaintId, setSelectedComplaintId, updateAlertStatus, alerts } = usePlatform();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const heatLayerRef = useRef(null);

  // Filters
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [filterState, setFilterState] = useState('ALL');
  const [filterBank, setFilterBank] = useState('ALL');
  const [minConfidence, setMinConfidence] = useState(60);
  const [showHeatmap, setShowHeatmap] = useState(true);

  // Selected marker for detail drawer
  const [activePrediction, setActivePrediction] = useState(null);

  // Filtered Predictions
  const filteredPredictions = predictions.filter((p) => {
    const matchesRisk = filterRisk === 'ALL' || p.riskTier === filterRisk;
    const matchesState = filterState === 'ALL' || p.state === filterState;
    const matchesBank = filterBank === 'ALL' || p.flaggedBank === filterBank;
    const matchesConf = p.confidenceScore >= minConfidence;
    return matchesRisk && matchesState && matchesBank && matchesConf;
  });

  // Center locations for quick jump
  const cityPresets = [
    { name: 'Delhi-NCR (HQ)', lat: 28.6139, lng: 77.2090, zoom: 11 },
    { name: 'Connaught Place', lat: 28.6315, lng: 77.2167, zoom: 15 },
    { name: 'Noida Sec 18', lat: 28.5708, lng: 77.3261, zoom: 15 },
    { name: 'Mumbai BKC', lat: 19.0657, lng: 72.8687, zoom: 14 },
    { name: 'Bengaluru Indiranagar', lat: 12.9784, lng: 77.6408, zoom: 14 }
  ];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create map instance
      const map = L.map(mapContainerRef.current, {
        center: [28.6250, 77.2200], // Delhi-NCR
        zoom: 11,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Clean OpenStreetMap CartoDB Positron / OSM tiles matching gov portal
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // Keep map instance mounted across tab switches or cleanup if unmounted
    };
  }, []);

  // Update Markers & Heatmap Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // Remove existing heatlayer if any
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null;
    }

    // Prepare Heatmap Data
    if (showHeatmap && typeof L.heatLayer === 'function') {
      const heatPoints = filteredPredictions.map((p) => [
        p.lat,
        p.lng,
        (p.confidenceScore / 100) * (p.riskTier === 'HIGH' ? 1.0 : 0.6)
      ]);

      try {
        heatLayerRef.current = L.heatLayer(heatPoints, {
          radius: 35,
          blur: 25,
          maxZoom: 16,
          gradient: {
            0.4: '#0F7B3D', // Low (Green)
            0.65: '#D97706', // Medium (Amber)
            0.85: '#DC2626'  // High (Red)
          }
        }).addTo(map);
      } catch (err) {
        console.warn('Heatmap layer initialisation deferred:', err);
      }
    }

    // Add Markers
    filteredPredictions.forEach((pred) => {
      const isHigh = pred.riskTier === 'HIGH';
      const isMedium = pred.riskTier === 'MEDIUM';

      const markerColor = isHigh ? '#DC2626' : isMedium ? '#D97706' : '#0F7B3D';
      const isSelected = pred.complaintId === selectedComplaintId;

      // Custom SVG Pin Icon
      const customIcon = L.divIcon({
        className: 'custom-atm-marker',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            ${
              isHigh
                ? `<div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: rgba(220, 38, 38, 0.35); animation: radar-pulse 2s infinite;"></div>`
                : ''
            }
            <div style="
              width: ${isSelected ? '32px' : '26px'};
              height: ${isSelected ? '32px' : '26px'};
              background: ${markerColor};
              border: 2.5px solid #FFFFFF;
              border-radius: 50%;
              box-shadow: 0 4px 10px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #FFFFFF;
              font-size: 11px;
              font-weight: bold;
              cursor: pointer;
            ">
              ₹
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([pred.lat, pred.lng], { icon: customIcon });

      // Click handler
      marker.on('click', () => {
        setActivePrediction(pred);
        setSelectedComplaintId(pred.complaintId);
      });

      // Bind rich popup
      const popupContent = document.createElement('div');
      popupContent.className = 'p-3 text-slate-800 font-sans min-w-[240px]';
      popupContent.innerHTML = `
        <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
          <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
            ${pred.predictedAtmId}
          </span>
          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${
            isHigh
              ? 'bg-red-100 text-red-700'
              : isMedium
              ? 'bg-amber-100 text-amber-700'
              : 'bg-emerald-100 text-emerald-700'
          }">
            ${pred.riskTier} RISK (${pred.confidenceScore}%)
          </span>
        </div>
        <div class="text-xs font-bold text-slate-900 mb-1 leading-snug">
          ${pred.predictedLocation}
        </div>
        <div class="text-[11px] text-slate-600 mb-2">
          <strong>Remaining Lead-Time:</strong> <span class="text-red-600 font-mono font-bold">${pred.timeWindow}</span>
        </div>
        <div class="text-[10px] text-slate-500 mb-2">
          Case ID: <span class="font-mono text-slate-800 font-bold">${pred.complaintId}</span>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersLayerRef.current.addLayer(marker);
    });

    // Auto-focus if there is a selected complaint
    if (selectedComplaintId) {
      const selectedPred = predictions.find((p) => p.complaintId === selectedComplaintId);
      if (selectedPred) {
        map.setView([selectedPred.lat, selectedPred.lng], 14, { animate: true });
        setActivePrediction(selectedPred);
      }
    }
  }, [filteredPredictions, showHeatmap, selectedComplaintId]);

  const handlePanTo = (preset) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([preset.lat, preset.lng], preset.zoom, { animate: true });
    }
  };

  const handleDispatchOfficer = (complaintId) => {
    const alertItem = alerts.find((a) => a.complaintId === complaintId);
    if (alertItem) {
      updateAlertStatus(alertItem.id, 'Field Unit Dispatched', 'PCR Intercept Unit #04 (Assigned)');
      alert(`Field Unit Dispatched to ATM for Case ${complaintId}! Audit transaction recorded on Algorand testnet.`);
    } else {
      alert(`Dispatch signal broadcasted for ${complaintId}`);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B1A] font-bold">
              MODULE 03 • GEOGRAPHICAL INTELLIGENCE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-serif">
            GIS Risk Heatmap — Cash-Out ATM Hotspot Interception
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Predictive KDE density surface and active ATM interdiction zones across Delhi-NCR, Mumbai & Bengaluru.
          </p>
        </div>

        {/* City Quick Jumps */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#0B2545]" /> Jump:
          </span>
          {cityPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePanTo(preset)}
              className="text-[11px] px-2 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 font-medium border border-slate-300 shadow-sm transition"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Filters + Map + Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Filter Control Bar */}
        <div className="lg:col-span-3 gov-card p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-[#0B2545]" />
              <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                Tactical Filters
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {filteredPredictions.length} Visible
            </span>
          </div>

          {/* Risk Tier Filter */}
          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700 block">Risk Priority Tier</label>
            <div className="grid grid-cols-3 gap-1">
              {['ALL', 'HIGH', 'MEDIUM'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setFilterRisk(tier)}
                  className={`py-1.5 text-[11px] font-bold rounded border transition ${
                    filterRisk === tier
                      ? 'bg-[#0B2545] text-white border-[#0B2545]'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Jurisdiction / State */}
          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700 block">State Jurisdiction</label>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
            >
              <option value="ALL">All Jurisdictions</option>
              <option value="Delhi">Delhi (NCR Central)</option>
              <option value="Uttar Pradesh">Uttar Pradesh (Noida/Ghaziabad)</option>
              <option value="Haryana">Haryana (Gurugram)</option>
              <option value="Maharashtra">Maharashtra (Mumbai MMR)</option>
              <option value="Karnataka">Karnataka (Bengaluru)</option>
            </select>
          </div>

          {/* Target Bank */}
          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700 block">Bank ATM Network</label>
            <select
              value={filterBank}
              onChange={(e) => setFilterBank(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
            >
              <option value="ALL">All Banking Networks</option>
              <option value="State Bank of India">State Bank of India</option>
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Punjab National Bank">Punjab National Bank</option>
              <option value="Canara Bank">Canara Bank</option>
              <option value="Axis Bank">Axis Bank</option>
            </select>
          </div>

          {/* Minimum Confidence Slider */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <label className="font-bold text-slate-700">Min Confidence:</label>
              <span className="font-mono font-bold text-[#0B2545]">{minConfidence}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={minConfidence}
              onChange={(e) => setMinConfidence(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B2545]"
            />
          </div>

          {/* Toggle Heatmap Overlay */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={showHeatmap}
                onChange={(e) => setShowHeatmap(e.target.checked)}
                className="rounded text-[#0B2545] focus:ring-0 w-4 h-4"
              />
              <span>Render Spatio-Temporal Heat Layer</span>
            </label>
          </div>

          {/* Tactical Legend */}
          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1.5">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
              Marker Classifications:
            </span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 border border-white shrink-0 animate-pulse"></span>
              <span className="text-[11px] text-slate-700">High Risk (&gt;85% Conf, Lead-Time &lt;45m)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-white shrink-0"></span>
              <span className="text-[11px] text-slate-700">Medium Risk (65-85% Conf)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white shrink-0"></span>
              <span className="text-[11px] text-slate-700">Low Risk (&lt;65% Conf)</span>
            </div>
          </div>
        </div>

        {/* Center: Leaflet Map Container */}
        <div className="lg:col-span-9 gov-card p-0 overflow-hidden relative min-h-[540px] flex flex-col">
          <div
            ref={mapContainerRef}
            className="w-full h-[540px] z-10"
            style={{ background: '#F8FAFC' }}
          />

          {/* Floating Selected Prediction Drawer */}
          {activePrediction && (
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-[4px] border border-[#1A3A6B] shadow-2xl p-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <RiskBadge tier={activePrediction.riskTier} size="small" />
                    <span className="text-xs font-mono font-bold text-[#0B2545]">
                      {activePrediction.complaintId}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      • ATM ID: {activePrediction.predictedAtmId}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">
                    {activePrediction.predictedLocation}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    <strong>AI Rationale:</strong> {activePrediction.primaryRationale}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">
                      Confidence Score
                    </span>
                    <span className="text-xl font-bold font-mono text-emerald-700">
                      {activePrediction.confidenceScore}%
                    </span>
                  </div>

                  <button
                    onClick={() => handleDispatchOfficer(activePrediction.complaintId)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0B2545] hover:bg-[#133B6B] text-white rounded text-xs font-bold shadow transition uppercase tracking-wider"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FF6B1A]" />
                    <span>Dispatch Beat Unit</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
