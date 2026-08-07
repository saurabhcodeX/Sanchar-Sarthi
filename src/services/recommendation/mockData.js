// src/services/recommendation/mockData.js
// TODO: replace with real backend data once Spring Boot APIs are live.

export const trainSuccessHistory = [
  { trainNo: "12301", successRate: 0.91, avgWaitMs: 1800, quotaSize: 60, demand: 150 },
  { trainNo: "12302", successRate: 0.84, avgWaitMs: 2200, quotaSize: 45, demand: 170 },
  { trainNo: "12951", successRate: 0.78, avgWaitMs: 2600, quotaSize: 40, demand: 190 },
  { trainNo: "12952", successRate: 0.72, avgWaitMs: 3000, quotaSize: 35, demand: 200 },
  { trainNo: "22691", successRate: 0.65, avgWaitMs: 3400, quotaSize: 30, demand: 210 },
];

export const paymentMethodStats = [
  { method: "upi",        label: "UPI",               icon: "📱", avgCompletionMs: 8000,  successRate: 0.96 },
  { method: "netbanking", label: "Net Banking",        icon: "🏦", avgCompletionMs: 25000, successRate: 0.88 },
  { method: "card",       label: "Debit/Credit Card",  icon: "💳", avgCompletionMs: 18000, successRate: 0.90 },
  { method: "wallet",     label: "Wallet",             icon: "👛", avgCompletionMs: 6000,  successRate: 0.93 },
];