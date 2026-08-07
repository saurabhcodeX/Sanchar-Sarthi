// Seeded mock historical data — replace with real DB calls when Spring Boot is live

export const trainSuccessHistory = [
  { trainNo: "12951", name: "Mumbai Rajdhani",    successRate: 0.91, avgWaitMs: 1200, quotaSize: 72,  demand: 210 },
  { trainNo: "12301", name: "Howrah Rajdhani",    successRate: 0.87, avgWaitMs: 1800, quotaSize: 60,  demand: 190 },
  { trainNo: "22436", name: "Vande Bharat",       successRate: 0.94, avgWaitMs: 900,  quotaSize: 80,  demand: 160 },
  { trainNo: "12005", name: "Shatabdi Express",   successRate: 0.82, avgWaitMs: 2100, quotaSize: 50,  demand: 220 },
  { trainNo: "14095", name: "Himalayan Queen",    successRate: 0.76, avgWaitMs: 2800, quotaSize: 45,  demand: 180 },
  { trainNo: "12055", name: "Jan Shatabdi",       successRate: 0.79, avgWaitMs: 2400, quotaSize: 48,  demand: 170 },
  { trainNo: "12137", name: "Punjab Mail",        successRate: 0.68, avgWaitMs: 3200, quotaSize: 38,  demand: 240 },
  { trainNo: "12259", name: "Sealdah Duronto",    successRate: 0.88, avgWaitMs: 1500, quotaSize: 65,  demand: 155 },
  { trainNo: "12627", name: "Karnataka Express",  successRate: 0.73, avgWaitMs: 2900, quotaSize: 42,  demand: 200 },
  { trainNo: "12621", name: "Tamil Nadu Express", successRate: 0.71, avgWaitMs: 3100, quotaSize: 40,  demand: 215 },
];

export const stationAlternatives = {
  "Delhi":     [
    { code: "NDLS", name: "New Delhi",           distanceKm: 0,  tatkalFillRate: 0.82 },
    { code: "DLI",  name: "Old Delhi",           distanceKm: 8,  tatkalFillRate: 0.71 },
    { code: "NZM",  name: "Hazrat Nizamuddin",   distanceKm: 7,  tatkalFillRate: 0.65 },
    { code: "ANVT", name: "Anand Vihar Terminal", distanceKm: 14, tatkalFillRate: 0.58 },
  ],
  "Mumbai":    [
    { code: "CSTM", name: "Mumbai CST",          distanceKm: 0,  tatkalFillRate: 0.88 },
    { code: "BCT",  name: "Mumbai Central",      distanceKm: 3,  tatkalFillRate: 0.79 },
    { code: "DDR",  name: "Dadar",               distanceKm: 6,  tatkalFillRate: 0.62 },
    { code: "LTT",  name: "Lokmanya Tilak",      distanceKm: 12, tatkalFillRate: 0.55 },
  ],
  "Kolkata":   [
    { code: "HWH",  name: "Howrah",              distanceKm: 0,  tatkalFillRate: 0.85 },
    { code: "SDAH", name: "Sealdah",             distanceKm: 5,  tatkalFillRate: 0.74 },
    { code: "KOA",  name: "Kolkata",             distanceKm: 8,  tatkalFillRate: 0.61 },
  ],
  "Chennai":   [
    { code: "MAS",  name: "Chennai Central",     distanceKm: 0,  tatkalFillRate: 0.86 },
    { code: "MSB",  name: "Chennai Beach",       distanceKm: 3,  tatkalFillRate: 0.67 },
    { code: "MBM",  name: "Chennai Egmore",      distanceKm: 2,  tatkalFillRate: 0.72 },
  ],
  "Bangalore": [
    { code: "SBC",  name: "Bangalore City",      distanceKm: 0,  tatkalFillRate: 0.83 },
    { code: "YPR",  name: "Yesvantpur",          distanceKm: 9,  tatkalFillRate: 0.69 },
    { code: "BNC",  name: "Bangalore Cantonment", distanceKm: 5, tatkalFillRate: 0.61 },
  ],
};

export const paymentMethodStats = [
  { method: "UPI",        label: "UPI",                  avgCompletionMs: 8000,  successRate: 0.97, icon: "📱" },
  { method: "CARD",       label: "Credit / Debit Card",  avgCompletionMs: 22000, successRate: 0.89, icon: "💳" },
  { method: "NETBANKING", label: "Net Banking",          avgCompletionMs: 35000, successRate: 0.78, icon: "🏦" },
  { method: "WALLET",     label: "Wallet",               avgCompletionMs: 6000,  successRate: 0.95, icon: "👛" },
];