/**
 * IntelliTrace - National Cyber Fraud Cash-Out Intelligence Platform
 * Mock Dataset: Agentic Settlement & Immutable LEA Audit Ledger
 * Simulated x402 / Algorand-Testnet Protocol smart contract interdictions
 */

export const INITIAL_AUDIT_LOGS = [
  {
    txHash: "ALGO-TXN-98421-E839-4A7C-001F",
    blockHeight: 3892104,
    complaintId: "NCRP-2026-89421",
    action: "AUTONOMOUS_ACCOUNT_LIEN",
    entity: "YES Bank A/c YESB-00449902 (Arjun Ent.)",
    amountINR: 850000,
    timestamp: "2026-09-04 17:49:32 IST",
    status: "CONFIRMED_ON_CHAIN",
    network: "Algorand Testnet (v4.0.2)",
    validator: "I4C National Node #01 (New Delhi)",
    contractAddress: "APP-I4C-INTERDICT-00892",
    gasFee: "0.001 ALGO (Govt Sponsored)",
    payloadSignature: "0x4e8a1f3c9902...bca1"
  },
  {
    txHash: "ALGO-TXN-98322-B114-88C9-994E",
    blockHeight: 3892098,
    complaintId: "NCRP-2026-89322",
    action: "ATM_GEOFENCE_HARD_LOCK",
    entity: "Terminal ATM-DL-NP-3329 (Nehru Place)",
    amountINR: 980000,
    timestamp: "2026-09-04 17:45:18 IST",
    status: "CONFIRMED_ON_CHAIN",
    network: "Algorand Testnet (v4.0.2)",
    validator: "I4C National Node #03 (CFCFRMS Gate)",
    contractAddress: "APP-ATM-LOCK-22109",
    gasFee: "0.001 ALGO (Govt Sponsored)",
    payloadSignature: "0x789b1c2e4011...99ef"
  },
  {
    txHash: "ALGO-TXN-98408-C772-55D1-812A",
    blockHeight: 3892091,
    complaintId: "NCRP-2026-89408",
    action: "LEA_DISPATCH_AUTHORIZATION",
    entity: "Patrol Unit Noida QRT-03",
    amountINR: 475000,
    timestamp: "2026-09-04 17:39:45 IST",
    status: "CONFIRMED_ON_CHAIN",
    network: "Algorand Testnet (v4.0.2)",
    validator: "UP Police Cyber Node (Lucknow)",
    contractAddress: "APP-LEA-DISPATCH-7712",
    gasFee: "0.001 ALGO (Govt Sponsored)",
    payloadSignature: "0x12dc58e93342...aa12"
  },
  {
    txHash: "ALGO-TXN-77312-F901-22A4-331B",
    blockHeight: 3892085,
    complaintId: "CFCFRMS-IN-77312",
    action: "MULTI_MULE_CASCADE_FREEZE",
    entity: "HDFC A/c ****4301 & Axis A/c ****7719",
    amountINR: 1420000,
    timestamp: "2026-09-04 17:36:58 IST",
    status: "CONFIRMED_ON_CHAIN",
    network: "Algorand Testnet (v4.0.2)",
    validator: "Maharashtra Cyber Cell Node #02",
    contractAddress: "APP-CASCADE-FREEZE-901",
    gasFee: "0.001 ALGO (Govt Sponsored)",
    payloadSignature: "0x992fa1b8812...cd45"
  },
  {
    txHash: "ALGO-TXN-77298-D441-11B8-662C",
    blockHeight: 3892070,
    complaintId: "CFCFRMS-IN-77298",
    action: "PREDICTIVE_RESTITUTION_HOLD",
    entity: "Canara Bank Escrow Node #KA-04",
    amountINR: 1850000,
    timestamp: "2026-09-04 17:19:12 IST",
    status: "CONFIRMED_ON_CHAIN",
    network: "Algorand Testnet (v4.0.2)",
    validator: "Karnataka CID Cyber Node #01",
    contractAddress: "APP-RESTITUTE-HOLD-44",
    gasFee: "0.001 ALGO (Govt Sponsored)",
    payloadSignature: "0x33e8b09112...fe89"
  },
  {
    txHash: "ALGO-TXN-44102-A819-77F2-4410",
    blockHeight: 3892055,
    complaintId: "BANK-LE-44102",
    action: "BEAT_OFFICER_GEOFENCE_SYNC",
    entity: "Beat Officer Constable V. Yadav (CP-04)",
    amountINR: 680000,
    timestamp: "2026-09-04 16:48:30 IST",
    status: "CONFIRMED_ON_CHAIN",
    network: "Algorand Testnet (v4.0.2)",
    validator: "Delhi Police HQ Cyber Node",
    contractAddress: "APP-BEAT-SYNC-2201",
    gasFee: "0.001 ALGO (Govt Sponsored)",
    payloadSignature: "0x55aa91bc22...01ab"
  }
];
