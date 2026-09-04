/**
 * IntelliTrace - National Cyber Fraud Cash-Out Intelligence Platform
 * Mock Dataset: Graph Topology (Simulated Neo4j Node/Edge Schema)
 * Node Roles:
 *  - VICTIM: Blue (#1E40AF / #3B82F6)
 *  - MULE_L1 / MULE_L2 / MULE_L3: Amber / Orange (#D97706 / #EA580C)
 *  - CASH_OUT_ATM: Red / Crimson (#DC2626)
 */

export const MOCK_GRAPH_NETWORKS = {
  // Flagship Complaint: NCRP-2026-89421 (Digital Arrest Scam - Connaught Place Cash-Out)
  "NCRP-2026-89421": {
    name: "Syndicate Ring #421 (Digital Arrest Siphon)",
    confidence: 94,
    riskTier: "HIGH",
    nodes: [
      {
        id: "node-vic-421",
        label: "Victim: R.K. Sharma\n(SBI ****4819)",
        role: "VICTIM",
        group: "victim",
        color: "#1E40AF",
        bank: "State Bank of India",
        accountNo: "SBIN-00214819",
        holder: "Rajesh Kumar Sharma",
        kycStatus: "Full KYC (Govt Retd Employee)",
        city: "New Delhi",
        balance: "₹12,400 (Drained)",
        riskScore: "12/100 (Victim Profile)",
        title: "Victim Account: Rajesh Kumar Sharma"
      },
      {
        id: "node-mule1-421",
        label: "Layer-1 Mule: 'Arjun Ent.'\n(Yes Bank ****9902)",
        role: "MULE_L1",
        group: "mule",
        color: "#D97706",
        bank: "Yes Bank Ltd.",
        accountNo: "YESB-00449902",
        holder: "Arjun Global Enterprises (Shell Entity)",
        kycStatus: "Forged Aadhaar / Rent Agreement",
        city: "Noida, UP",
        balance: "₹45,200",
        riskScore: "88/100 (Flagged High Mule Velocity)",
        title: "Layer-1 Mule: Shell Merchant Account"
      },
      {
        id: "node-mule2-421",
        label: "Layer-2 Mule: 'Kishan Traders'\n(Bandhan Bank ****3114)",
        role: "MULE_L2",
        group: "mule",
        color: "#EA580C",
        bank: "Bandhan Bank",
        accountNo: "BDBL-00813114",
        holder: "Kishan Daily Traders",
        kycStatus: "Recent Jan Dhan Upgrade",
        city: "Ghaziabad, UP",
        balance: "₹18,000",
        riskScore: "93/100 (Multi-Complaint Nexus)",
        title: "Layer-2 Mule: Cash Aggregator Node"
      },
      {
        id: "node-mule3-421",
        label: "Layer-3 Mule: Card Mule\n(SBI Current ****0551)",
        role: "MULE_L3",
        group: "mule",
        color: "#C2410C",
        bank: "State Bank of India",
        accountNo: "SBIN-00990551",
        holder: "Deepak Rawat (Mule Carrier)",
        kycStatus: "Dormant account reactivated 3 days ago",
        city: "New Delhi",
        balance: "₹8,45,000 (Active Lien Request)",
        riskScore: "97/100 (Immediate Withdrawal Threat)",
        title: "Layer-3 Mule: Debit Card Carrier Node"
      },
      {
        id: "node-atm-421",
        label: "TARGET CASH-OUT:\nSBI ATM Regal Bldg CP",
        role: "CASH_OUT_ATM",
        group: "atm",
        color: "#DC2626",
        bank: "State Bank of India",
        atmId: "ATM-DL-CP-4011",
        location: "Regal Building, Connaught Place, New Delhi",
        coordinates: "28.6315, 77.2167",
        leadTime: "38 minutes remaining",
        riskScore: "94/100 (Predicted Cash-Out Terminal)",
        title: "Target Cash-Out ATM: Connaught Place"
      }
    ],
    edges: [
      {
        from: "node-vic-421",
        to: "node-mule1-421",
        label: "₹8,50,000 (RTGS)\n17:42 IST",
        amount: 850000,
        channel: "RTGS",
        timestamp: "17:42 IST",
        utr: "SBIIN26248901234",
        width: 6,
        color: { color: "#3B82F6" }
      },
      {
        from: "node-mule1-421",
        to: "node-mule2-421",
        label: "₹5,20,000 (IMPS)\n17:48 IST",
        amount: 520000,
        channel: "IMPS",
        timestamp: "17:48 IST",
        utr: "YESBIN26248905512",
        width: 4.5,
        color: { color: "#D97706" }
      },
      {
        from: "node-mule2-421",
        to: "node-mule3-421",
        label: "₹4,80,000 (UPI Fan-out)\n17:53 IST",
        amount: 480000,
        channel: "UPI",
        timestamp: "17:53 IST",
        utr: "UPI26248911009",
        width: 4,
        color: { color: "#EA580C" }
      },
      {
        from: "node-mule3-421",
        to: "node-atm-421",
        label: "ESTIMATED CASH-OUT\n(T+38m) ₹8.5L Target",
        amount: 850000,
        channel: "ATM-DEBIT",
        timestamp: "Projected ~18:25 IST",
        utr: "PENDING_WITHDRAWAL",
        width: 6,
        dashes: true,
        color: { color: "#DC2626" }
      }
    ]
  },

  // Complaint: CFCFRMS-IN-77312 (Institutional Trading Scam - BKC Mumbai Cash-Out)
  "CFCFRMS-IN-77312": {
    name: "Syndicate Ring #312 (Telegram VIP Trading)",
    confidence: 91,
    riskTier: "HIGH",
    nodes: [
      {
        id: "node-vic-312",
        label: "Victim: Sunita Deshmukh\n(HDFC ****9021)",
        role: "VICTIM",
        group: "victim",
        color: "#1E40AF",
        bank: "HDFC Bank",
        accountNo: "HDFC-00199021",
        holder: "Sunita Deshmukh",
        kycStatus: "Full KYC Verified",
        city: "Mumbai, MH",
        riskScore: "10/100",
        title: "Victim Account"
      },
      {
        id: "node-mule1-312",
        label: "Layer-1: Apex Solutions\n(ICICI ****5120)",
        role: "MULE_L1",
        group: "mule",
        color: "#D97706",
        bank: "ICICI Bank",
        accountNo: "ICIC-00915120",
        holder: "Apex Digital Solutions",
        kycStatus: "Shell Firm (Registered 2 months ago)",
        city: "Pune, MH",
        riskScore: "89/100",
        title: "Layer-1 Mule"
      },
      {
        id: "node-mule2-312",
        label: "Layer-2: Ganesh Bullion\n(Axis Bank ****7719)",
        role: "MULE_L2",
        group: "mule",
        color: "#EA580C",
        bank: "Axis Bank",
        accountNo: "UTIB-00217719",
        holder: "Ganesh Bullion Merchants",
        kycStatus: "Under Scanner (12 Suspicious SARs)",
        city: "Navi Mumbai, MH",
        riskScore: "94/100",
        title: "Layer-2 Mule"
      },
      {
        id: "node-mule3-312",
        label: "Layer-3: Cash Dispersal Unit\n(HDFC Current ****4301)",
        role: "MULE_L3",
        group: "mule",
        color: "#C2410C",
        bank: "HDFC Bank",
        accountNo: "HDFC-00814301",
        holder: "Manish Solanki",
        kycStatus: "Forged PAN / Address",
        city: "Mumbai, MH",
        riskScore: "98/100",
        title: "Layer-3 Mule"
      },
      {
        id: "node-atm-312",
        label: "TARGET CASH-OUT:\nHDFC 24x7 Lobby BKC",
        role: "CASH_OUT_ATM",
        group: "atm",
        color: "#DC2626",
        bank: "HDFC Bank",
        atmId: "ATM-MH-BKC-8812",
        location: "G-Block, BKC, Mumbai",
        coordinates: "19.0657, 72.8687",
        leadTime: "42 minutes remaining",
        riskScore: "91/100",
        title: "Target Cash-Out ATM: BKC Mumbai"
      }
    ],
    edges: [
      {
        from: "node-vic-312",
        to: "node-mule1-312",
        label: "₹14,20,000 (NEFT)\n17:35 IST",
        amount: 1420000,
        channel: "NEFT",
        timestamp: "17:35 IST",
        width: 7,
        color: { color: "#3B82F6" }
      },
      {
        from: "node-mule1-312",
        to: "node-mule2-312",
        label: "₹9,80,000 (RTGS)\n17:41 IST",
        amount: 980000,
        channel: "RTGS",
        timestamp: "17:41 IST",
        width: 6,
        color: { color: "#D97706" }
      },
      {
        from: "node-mule2-312",
        to: "node-mule3-312",
        label: "₹9,50,000 (IMPS)\n17:46 IST",
        amount: 950000,
        channel: "IMPS",
        timestamp: "17:46 IST",
        width: 5.5,
        color: { color: "#EA580C" }
      },
      {
        from: "node-mule3-312",
        to: "node-atm-312",
        label: "PROJECTED CASH-OUT\n(T+42m) ₹14.2L",
        amount: 1420000,
        channel: "ATM-DEBIT",
        timestamp: "Projected ~18:30 IST",
        width: 7,
        dashes: true,
        color: { color: "#DC2626" }
      }
    ]
  },

  // Complaint: NCRP-2026-89408 (Part-Time Review Scam - Sector 18 Noida Cash-Out)
  "NCRP-2026-89408": {
    name: "Syndicate Ring #408 (Noida Task Fraud)",
    confidence: 89,
    riskTier: "HIGH",
    nodes: [
      {
        id: "node-vic-408",
        label: "Victim: Amitabh Sen\n(ICICI ****3342)",
        role: "VICTIM",
        group: "victim",
        color: "#1E40AF",
        bank: "ICICI Bank",
        accountNo: "ICIC-00383342",
        holder: "Amitabh Sen",
        kycStatus: "Full KYC",
        city: "Noida, UP",
        riskScore: "15/100",
        title: "Victim Account"
      },
      {
        id: "node-mule1-408",
        label: "Layer-1 Mule: 'FastPay Direct'\n(Paytm PB ****8801)",
        role: "MULE_L1",
        group: "mule",
        color: "#D97706",
        bank: "Paytm Payments Bank",
        accountNo: "PYTM-00128801",
        holder: "FastPay Online Direct",
        kycStatus: "Virtual Prepaid Wallet Hub",
        city: "Noida, UP",
        riskScore: "91/100",
        title: "Layer-1 Mule"
      },
      {
        id: "node-mule2-408",
        label: "Layer-2 Mule: 'Suraj Enterprises'\n(ICICI ****7712)",
        role: "MULE_L2",
        group: "mule",
        color: "#EA580C",
        bank: "ICICI Bank",
        accountNo: "ICIC-00777712",
        holder: "Suraj Pal Singh",
        kycStatus: "Flagged in 4 NCRP complaints",
        city: "Noida, UP",
        riskScore: "95/100",
        title: "Layer-2 Mule"
      },
      {
        id: "node-atm-408",
        label: "TARGET CASH-OUT:\nICICI ATM Centerstage Sec 18",
        role: "CASH_OUT_ATM",
        group: "atm",
        color: "#DC2626",
        bank: "ICICI Bank",
        atmId: "ATM-UP-NOI-3109",
        location: "Sector 18 Market, Noida",
        coordinates: "28.5708, 77.3261",
        leadTime: "26 minutes remaining",
        riskScore: "89/100",
        title: "Target Cash-Out ATM: Sector 18 Noida"
      }
    ],
    edges: [
      {
        from: "node-vic-408",
        to: "node-mule1-408",
        label: "₹4,75,000 (UPI)\n17:28 IST",
        amount: 475000,
        channel: "UPI",
        timestamp: "17:28 IST",
        width: 5,
        color: { color: "#3B82F6" }
      },
      {
        from: "node-mule1-408",
        to: "node-mule2-408",
        label: "₹4,60,000 (IMPS)\n17:33 IST",
        amount: 460000,
        channel: "IMPS",
        timestamp: "17:33 IST",
        width: 4.8,
        color: { color: "#D97706" }
      },
      {
        from: "node-mule2-408",
        to: "node-atm-408",
        label: "PROJECTED CASH-OUT\n(T+26m) ₹4.75L",
        amount: 475000,
        channel: "ATM-DEBIT",
        timestamp: "Projected ~18:12 IST",
        width: 5,
        dashes: true,
        color: { color: "#DC2626" }
      }
    ]
  },

  // Complaint: CFCFRMS-IN-77298 (IPO Phishing - Indiranagar Bengaluru Cash-Out)
  "CFCFRMS-IN-77298": {
    name: "Syndicate Ring #298 (Bengaluru IPO Phishing)",
    confidence: 87,
    riskTier: "HIGH",
    nodes: [
      {
        id: "node-vic-298",
        label: "Victim: Dr. K.S. Venkatesh\n(Canara ****6112)",
        role: "VICTIM",
        group: "victim",
        color: "#1E40AF",
        bank: "Canara Bank",
        accountNo: "CNRB-00446112",
        holder: "Dr. K. S. Venkatesh",
        kycStatus: "Full KYC (Senior Doctor)",
        city: "Bengaluru, KA",
        riskScore: "11/100",
        title: "Victim Account"
      },
      {
        id: "node-mule1-298",
        label: "Layer-1 Mule: 'TechGrow Infra'\n(PNB ****1092)",
        role: "MULE_L1",
        group: "mule",
        color: "#D97706",
        bank: "Punjab National Bank",
        accountNo: "PUNB-00811092",
        holder: "TechGrow Infrastructure Ltd",
        kycStatus: "Shell Entity",
        city: "Hosur, TN",
        riskScore: "87/100",
        title: "Layer-1 Mule"
      },
      {
        id: "node-mule2-298",
        label: "Layer-2 Mule: 'Vikas Trading'\n(Federal Bank ****5512)",
        role: "MULE_L2",
        group: "mule",
        color: "#EA580C",
        bank: "Federal Bank",
        accountNo: "FDRL-00195512",
        holder: "Vikas Trading Agency",
        kycStatus: "Dormant Jan Dhan",
        city: "Bengaluru, KA",
        riskScore: "92/100",
        title: "Layer-2 Mule"
      },
      {
        id: "node-mule3-298",
        label: "Layer-3 Mule: Cash Mule\n(Canara Bank ****9014)",
        role: "MULE_L3",
        group: "mule",
        color: "#C2410C",
        bank: "Canara Bank",
        accountNo: "CNRB-00919014",
        holder: "Santosh Gowda",
        kycStatus: "Under Investigation",
        city: "Bengaluru, KA",
        riskScore: "96/100",
        title: "Layer-3 Mule"
      },
      {
        id: "node-atm-298",
        label: "TARGET CASH-OUT:\nCanara e-Lounge Indiranagar",
        role: "CASH_OUT_ATM",
        group: "atm",
        color: "#DC2626",
        bank: "Canara Bank",
        atmId: "ATM-KA-BLR-5542",
        location: "100ft Road, Indiranagar, Bengaluru",
        coordinates: "12.9784, 77.6408",
        leadTime: "45 minutes remaining",
        riskScore: "87/100",
        title: "Target Cash-Out ATM: Indiranagar Bengaluru"
      }
    ],
    edges: [
      {
        from: "node-vic-298",
        to: "node-mule1-298",
        label: "₹18,50,000 (RTGS)\n17:15 IST",
        amount: 1850000,
        channel: "RTGS",
        timestamp: "17:15 IST",
        width: 8,
        color: { color: "#3B82F6" }
      },
      {
        from: "node-mule1-298",
        to: "node-mule2-298",
        label: "₹12,00,000 (NEFT)\n17:22 IST",
        amount: 1200000,
        channel: "NEFT",
        timestamp: "17:22 IST",
        width: 6.5,
        color: { color: "#D97706" }
      },
      {
        from: "node-mule2-298",
        to: "node-mule3-298",
        label: "₹11,50,000 (IMPS)\n17:28 IST",
        amount: 1150000,
        channel: "IMPS",
        timestamp: "17:28 IST",
        width: 6,
        color: { color: "#EA580C" }
      },
      {
        from: "node-mule3-298",
        to: "node-atm-298",
        label: "PROJECTED CASH-OUT\n(T+45m) ₹18.5L",
        amount: 1850000,
        channel: "ATM-DEBIT",
        timestamp: "Projected ~18:40 IST",
        width: 8,
        dashes: true,
        color: { color: "#DC2626" }
      }
    ]
  },

  // Complaint: NCRP-2026-89322 (Pension Scam - Nehru Place Cash-Out)
  "NCRP-2026-89322": {
    name: "Syndicate Ring #322 (Pension KYC Scam)",
    confidence: 96,
    riskTier: "HIGH",
    nodes: [
      {
        id: "node-vic-322",
        label: "Victim: Lt. Col. Nair\n(SBI ****1120)",
        role: "VICTIM",
        group: "victim",
        color: "#1E40AF",
        bank: "State Bank of India",
        accountNo: "SBIN-00111120",
        holder: "Lt. Col. Sanjeev Nair (Retd.)",
        kycStatus: "Defence Pension Account",
        city: "New Delhi",
        riskScore: "8/100",
        title: "Victim Account"
      },
      {
        id: "node-mule1-322",
        label: "Layer-1 Mule: 'Metro Recharge'\n(Airtel PB ****9031)",
        role: "MULE_L1",
        group: "mule",
        color: "#D97706",
        bank: "Airtel Payments Bank",
        accountNo: "AIRP-00129031",
        holder: "Metro Digital Recharge Point",
        kycStatus: "SIM Point Fraudulent KYC",
        city: "Faridabad, HR",
        riskScore: "95/100",
        title: "Layer-1 Mule"
      },
      {
        id: "node-mule2-322",
        label: "Layer-2 Mule: 'Rahul Hardware'\n(SBI ****4011)",
        role: "MULE_L2",
        group: "mule",
        color: "#EA580C",
        bank: "State Bank of India",
        accountNo: "SBIN-00884011",
        holder: "Rahul Kumar Singh",
        kycStatus: "Flagged in Jamtara-Mewat cluster",
        city: "New Delhi",
        riskScore: "98/100",
        title: "Layer-2 Mule"
      },
      {
        id: "node-atm-322",
        label: "TARGET CASH-OUT:\nSBI ATM Nehru Place",
        role: "CASH_OUT_ATM",
        group: "atm",
        color: "#DC2626",
        bank: "State Bank of India",
        atmId: "ATM-DL-NP-3329",
        location: "Nehru Place Commercial Complex, New Delhi",
        coordinates: "28.5494, 77.2536",
        leadTime: "22 minutes remaining",
        riskScore: "96/100",
        title: "Target Cash-Out ATM: Nehru Place New Delhi"
      }
    ],
    edges: [
      {
        from: "node-vic-322",
        to: "node-mule1-322",
        label: "₹9,80,000 (IMPS)\n15:02 IST",
        amount: 980000,
        channel: "IMPS",
        timestamp: "15:02 IST",
        width: 6.5,
        color: { color: "#3B82F6" }
      },
      {
        from: "node-mule1-322",
        to: "node-mule2-322",
        label: "₹9,60,000 (UPI)\n15:06 IST",
        amount: 960000,
        channel: "UPI",
        timestamp: "15:06 IST",
        width: 6.2,
        color: { color: "#D97706" }
      },
      {
        from: "node-mule2-322",
        to: "node-atm-322",
        label: "CRITICAL CASH-OUT\n(T+22m) ₹9.8L",
        amount: 980000,
        channel: "ATM-DEBIT",
        timestamp: "Projected ~18:05 IST",
        width: 7,
        dashes: true,
        color: { color: "#DC2626" }
      }
    ]
  }
};

/**
 * Unified Multi-Syndicate Graph (Combined Interconnected Fraud Ring)
 */
export function getUnifiedGraphData(onlyHighConfidence = false) {
  const allNodesMap = new Map();
  const allEdges = [];

  // Combine known networks
  Object.values(MOCK_GRAPH_NETWORKS).forEach(network => {
    if (onlyHighConfidence && network.confidence < 90) return;

    network.nodes.forEach(node => {
      if (!allNodesMap.has(node.id)) {
        allNodesMap.set(node.id, { ...node });
      }
    });

    network.edges.forEach(edge => {
      allEdges.push({ ...edge });
    });
  });

  // Cross-syndicate mule link: Node 'Arjun Ent' (mule1-421) also launders for 'FastPay Direct' (mule1-408)
  allEdges.push({
    from: "node-mule1-408",
    to: "node-mule1-421",
    label: "Cross-Ring Spill ₹1.2L (UPI)",
    amount: 120000,
    channel: "UPI",
    timestamp: "17:38 IST",
    width: 2.5,
    color: { color: "#D97706" },
    dashes: [4, 4]
  });

  return {
    nodes: Array.from(allNodesMap.values()),
    edges: allEdges
  };
}
