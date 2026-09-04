import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_COMPLAINTS } from '../data/complaints';
import { INITIAL_PREDICTIONS } from '../data/predictions';
import { MOCK_GRAPH_NETWORKS, getUnifiedGraphData } from '../data/graphData';
import { INITIAL_ALERTS } from '../data/alerts';
import { INITIAL_AUDIT_LOGS } from '../data/auditLedger';

const PlatformContext = createContext(null);

export function PlatformProvider({ children }) {
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [predictions, setPredictions] = useState(INITIAL_PREDICTIONS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [graphNetworks, setGraphNetworks] = useState(MOCK_GRAPH_NETWORKS);
  
  const [selectedComplaintId, setSelectedComplaintId] = useState("NCRP-2026-89421");
  const [notification, setNotification] = useState(null);

  // Ingestion Simulation Modal State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStage, setSimulationStage] = useState(0);
  const [latestIngestedComplaint, setLatestIngestedComplaint] = useState(null);

  // Compute Live System KPIs
  const stats = useMemo(() => {
    const totalComplaints = complaints.length;
    const activeHighRisk = predictions.filter(p => p.riskTier === 'HIGH').length;
    const alertsToday = alerts.length;
    const totalAmountAtRisk = predictions.reduce((acc, curr) => acc + (curr.amountAtRisk || 0), 0);
    const avgLeadTime = Math.round(
      predictions.reduce((acc, curr) => acc + curr.leadTimeMinutes, 0) / (predictions.length || 1)
    );
    const resolvedCount = alerts.filter(a => a.status === 'Resolved' || a.status === 'Field Unit Dispatched').length;

    return {
      totalComplaints,
      activeHighRisk,
      alertsToday,
      totalAmountAtRisk,
      avgLeadTime,
      resolvedCount,
      restitutionProtectedCr: (totalAmountAtRisk / 10000000).toFixed(2)
    };
  }, [complaints, predictions, alerts]);

  /**
   * Ingest a new complaint with live pipeline progression
   */
  const ingestComplaint = async (formData) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const complaintId = formData.id || `NCRP-2026-${randomSuffix}`;
    const predictionId = `PRED-2026-${Math.floor(100 + Math.random() * 900)}`;
    const alertId = `ALT-2026-${Math.floor(1100 + Math.random() * 900)}`;
    const now = new Date();
    const timestampStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]} IST`;

    const newComplaint = {
      id: complaintId,
      victimName: formData.victimName || "Suresh Menon",
      victimAccount: formData.victimAccount || "XXXX-XXXX-7128",
      victimBank: formData.victimBank || "State Bank of India",
      amount: Number(formData.amount) || 550000,
      timestamp: timestampStr,
      source: formData.source || "NCRP 1930 Helpline",
      status: "Received",
      state: formData.state || "Delhi",
      fraudType: formData.fraudType || "Digital Arrest / CBI Impersonation",
      utrNumber: formData.utrNumber || `UTR2624${Math.floor(10000000 + Math.random() * 90000000)}`,
      phone: formData.phone || "+91 9811X-XXXXX",
      urgency: "HIGH"
    };

    setLatestIngestedComplaint(newComplaint);
    setIsSimulating(true);
    setSimulationStage(1);

    // Stage 1: Ingested & Validated
    await new Promise(res => setTimeout(res, 900));
    setSimulationStage(2);

    // Stage 2: GraphSAGE Subgraph Traversal
    await new Promise(res => setTimeout(res, 1100));
    setSimulationStage(3);

    // Stage 3: Spatial KDE / DBSCAN Cluster Match
    await new Promise(res => setTimeout(res, 1000));
    setSimulationStage(4);

    // Stage 4: Alert Generation & Ledger Entry
    await new Promise(res => setTimeout(res, 800));

    // Choose coordinates based on selected state
    let lat = 28.6289;
    let lng = 77.2065;
    let locationName = "SBI ATM, Parliament Street Branch, New Delhi";
    let atmId = `ATM-DL-ND-${Math.floor(1000 + Math.random() * 9000)}`;

    if (newComplaint.state === "Maharashtra") {
      lat = 19.0760;
      lng = 72.8777;
      locationName = "HDFC Bank ATM, Kurla West Station Road, Mumbai";
      atmId = `ATM-MH-MUM-${Math.floor(1000 + Math.random() * 9000)}`;
    } else if (newComplaint.state === "Karnataka") {
      lat = 12.9716;
      lng = 77.5946;
      locationName = "Canara Bank ATM, MG Road Metro Station, Bengaluru";
      atmId = `ATM-KA-BLR-${Math.floor(1000 + Math.random() * 9000)}`;
    } else if (newComplaint.state === "Uttar Pradesh") {
      lat = 28.5355;
      lng = 77.3910;
      locationName = "ICICI ATM, Express Trade Towers, Sector 132, Noida";
      atmId = `ATM-UP-NOI-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const newPrediction = {
      id: predictionId,
      complaintId: complaintId,
      predictedAtmId: atmId,
      predictedLocation: locationName,
      lat,
      lng,
      city: newComplaint.state === "Delhi" ? "New Delhi" : (newComplaint.state === "Maharashtra" ? "Mumbai" : "Noida"),
      state: newComplaint.state,
      timeWindow: "T+35 mins (Imminent Interdiction Window)",
      leadTimeMinutes: 35,
      confidenceScore: 93,
      riskTier: "HIGH",
      primaryRationale: `Autonomous GraphSAGE pipeline detected high-velocity 3-hop fanout to habitual cash-out corridor. DBSCAN spatial density epsilon=200m; 93% interdiction probability.`,
      muleHopCount: 3,
      flaggedBank: newComplaint.victimBank,
      jurisdiction: `${newComplaint.state} Cyber Crime Police Station`,
      nearestPoliceStation: "Local Patrol Station (400m)",
      amountAtRisk: newComplaint.amount
    };

    const newAlert = {
      id: alertId,
      complaintId: complaintId,
      predictionId: predictionId,
      riskTier: "HIGH",
      predictedAtmLocation: locationName,
      atmId: atmId,
      coordinates: [lat, lng],
      leadTimeDisplay: "35m (T-Minus 00:35:00)",
      confidenceScore: 93,
      jurisdiction: `${newComplaint.state} State Cyber Command Cell`,
      nearestPS: "Local Sector PS (350m)",
      recommendedAction: "Human review & Immediate ATM freeze / Field dispatch",
      status: "Pending",
      assignedUnit: "Unassigned",
      amountAtRisk: newComplaint.amount,
      timestamp: timestampStr,
      triggerRule: "Rule 100-AI: Live Autonomous Ingestion Intercept"
    };

    const newAuditLog = {
      txHash: `ALGO-TXN-${randomSuffix}-AI77-88C1-002F`,
      blockHeight: 3892110 + Math.floor(Math.random() * 20),
      complaintId: complaintId,
      action: "AUTONOMOUS_INTERDICTION_SIGNAL",
      entity: `ATM Terminal ${atmId}`,
      amountINR: newComplaint.amount,
      timestamp: timestampStr,
      status: "CONFIRMED_ON_CHAIN",
      network: "Algorand Testnet (v4.0.2)",
      validator: "I4C National Autonomous Gate #01",
      contractAddress: "APP-AUTO-DISPATCH-99",
      gasFee: "0.001 ALGO (Govt Sponsored)",
      payloadSignature: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`
    };

    // Construct dynamically generated graph topology for the new complaint
    const newGraphTopology = {
      name: `Syndicate Ring #${randomSuffix.toString().slice(-3)} (${newComplaint.victimName})`,
      confidence: 93,
      riskTier: "HIGH",
      nodes: [
        {
          id: `node-vic-${randomSuffix}`,
          label: `Victim: ${newComplaint.victimName}\n(${newComplaint.victimBank})`,
          role: "VICTIM",
          group: "victim",
          color: "#1E40AF",
          bank: newComplaint.victimBank,
          accountNo: newComplaint.victimAccount,
          holder: newComplaint.victimName,
          kycStatus: "Full KYC Verified",
          city: newComplaint.state,
          riskScore: "10/100 (Victim)",
          title: `Victim: ${newComplaint.victimName}`
        },
        {
          id: `node-mule1-${randomSuffix}`,
          label: `Layer-1 Mule: Rapid Pay\n(HDFC ****1829)`,
          role: "MULE_L1",
          group: "mule",
          color: "#D97706",
          bank: "HDFC Bank",
          accountNo: `HDFC-00${Math.floor(100000 + Math.random() * 900000)}`,
          holder: "Rapid Pay Merchant Hub",
          kycStatus: "Prepaid Wallet API Link",
          city: newComplaint.state,
          riskScore: "89/100",
          title: "Layer-1 Mule Account"
        },
        {
          id: `node-mule2-${randomSuffix}`,
          label: `Layer-2 Mule: Aggregator\n(Axis ****6610)`,
          role: "MULE_L2",
          group: "mule",
          color: "#EA580C",
          bank: "Axis Bank",
          accountNo: `UTIB-00${Math.floor(100000 + Math.random() * 900000)}`,
          holder: "Kiran Soni (Mule Holder)",
          kycStatus: "Jan Dhan Account (Flagged)",
          city: newComplaint.state,
          riskScore: "95/100",
          title: "Layer-2 Mule Aggregator"
        },
        {
          id: `node-atm-${randomSuffix}`,
          label: `TARGET CASH-OUT:\n${locationName.slice(0, 24)}...`,
          role: "CASH_OUT_ATM",
          group: "atm",
          color: "#DC2626",
          bank: newComplaint.victimBank,
          atmId: atmId,
          location: locationName,
          coordinates: `${lat}, ${lng}`,
          leadTime: "35 minutes remaining",
          riskScore: "93/100",
          title: `Predicted Cash-Out Terminal: ${atmId}`
        }
      ],
      edges: [
        {
          from: `node-vic-${randomSuffix}`,
          to: `node-mule1-${randomSuffix}`,
          label: `₹${(newComplaint.amount).toLocaleString('en-IN')} (IMPS)`,
          amount: newComplaint.amount,
          channel: "IMPS",
          timestamp: "Just Now",
          width: 6,
          color: { color: "#3B82F6" }
        },
        {
          from: `node-mule1-${randomSuffix}`,
          to: `node-mule2-${randomSuffix}`,
          label: `₹${(newComplaint.amount * 0.95).toLocaleString('en-IN')} (UPI)`,
          amount: newComplaint.amount * 0.95,
          channel: "UPI",
          timestamp: "T+2m",
          width: 5,
          color: { color: "#D97706" }
        },
        {
          from: `node-mule2-${randomSuffix}`,
          to: `node-atm-${randomSuffix}`,
          label: `PROJECTED CASH-OUT\n(T+35m) ₹${(newComplaint.amount).toLocaleString('en-IN')}`,
          amount: newComplaint.amount,
          channel: "ATM-DEBIT",
          timestamp: "Projected 35m",
          width: 6,
          dashes: true,
          color: { color: "#DC2626" }
        }
      ]
    };

    // Update Platform State
    setComplaints(prev => [{ ...newComplaint, status: "Predicted" }, ...prev]);
    setPredictions(prev => [newPrediction, ...prev]);
    setAlerts(prev => [newAlert, ...prev]);
    setAuditLogs(prev => [newAuditLog, ...prev]);
    setGraphNetworks(prev => ({
      ...prev,
      [complaintId]: newGraphTopology
    }));
    setSelectedComplaintId(complaintId);

    setNotification({
      type: "SUCCESS",
      title: "PROACTIVE INTERDICTION TRIGGERED",
      message: `Complaint ${complaintId} processed. Predicted Cash-Out ATM: ${locationName}. Alert ${alertId} raised.`
    });

    return complaintId;
  };

  /**
   * Action dispatch on alerts
   */
  const updateAlertStatus = (alertId, newStatus, unit = "N/A") => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          status: newStatus,
          assignedUnit: unit !== "N/A" ? unit : (newStatus === "Field Unit Dispatched" ? "PCR Quick Intercept #07" : a.assignedUnit)
        };
      }
      return a;
    }));

    // Add corresponding audit log
    const updatedAlert = alerts.find(a => a.id === alertId);
    if (updatedAlert) {
      const logEntry = {
        txHash: `ALGO-DISP-${Math.floor(10000 + Math.random() * 90000)}-${Date.now().toString().slice(-4)}`,
        blockHeight: 3892125,
        complaintId: updatedAlert.complaintId,
        action: newStatus === "Resolved" ? "ATM_INTERDICTION_SUCCESSFUL" : "FIELD_UNIT_DISPATCHED",
        entity: unit !== "N/A" ? unit : "PCR Quick Intercept #07",
        amountINR: updatedAlert.amountAtRisk,
        timestamp: new Date().toLocaleTimeString('en-IN') + " IST",
        status: "CONFIRMED_ON_CHAIN",
        network: "Algorand Testnet (v4.0.2)",
        validator: "LEA Tactical Gateway (Verified)",
        contractAddress: "APP-INTERCEPT-RESOLVE-10",
        gasFee: "0.001 ALGO",
        payloadSignature: "0x89bb2100ff12...cc91"
      };
      setAuditLogs(prev => [logEntry, ...prev]);
    }
  };

  return (
    <PlatformContext.Provider
      value={{
        complaints,
        predictions,
        alerts,
        auditLogs,
        graphNetworks,
        selectedComplaintId,
        setSelectedComplaintId,
        stats,
        ingestComplaint,
        updateAlertStatus,
        notification,
        setNotification,
        isSimulating,
        setIsSimulating,
        simulationStage,
        latestIngestedComplaint,
        getUnifiedGraphData
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}
