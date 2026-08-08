import { useState } from "react";
import { FileText, Download, X } from "lucide-react";

export default function BookingStrategyReport({ train, passenger, paymentRec, ranked, stations }) {
  const [open, setOpen] = useState(false);

  const topTrain  = ranked?.[0];
  const bestStn   = stations?.find(s => s.isBest);
  const bestPay   = paymentRec?.recommended;

  function handlePrint() {
    window.print();
  }

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0A1628] to-[#1a3a6f] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
        <FileText size={13} /> Generate Strategy Report
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
              <h2 className="font-black text-[#0A1628] flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-500" /> Booking Strategy Report
              </h2>
              <div className="flex items-center gap-2">
                <button onClick={handlePrint}
                  className="flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors">
                  <Download size={13} /> Download
                </button>
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5 print:p-4" id="strategy-report">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0A1628] to-[#1a3a6f] rounded-2xl px-5 py-4 text-white">
                <p className="text-[10px] text-blue-300 uppercase tracking-widest">Sanchar Sarthi</p>
                <h1 className="text-xl font-black mt-0.5">AI Booking Strategy Report</h1>
                <p className="text-blue-200 text-xs mt-1">{new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
              </div>

              {/* Journey */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Journey Details</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Passenger",    passenger?.name || "Not specified"],
                    ["Selected Train", train?.name || topTrain?.name || "—"],
                    ["Train Number",  train?.number || topTrain?.number || "—"],
                    ["Class",        train?.travelClass || "—"],
                    ["Seats in Quota", topTrain?.seatsInQuota || "—"],
                    ["Journey Date", train?.dep || "—"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-[10px] text-gray-400">{l}</p>
                      <p className="font-bold text-gray-800">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">AI Recommendations</p>

                {[
                  {
                    icon: "🚆",
                    title: "Best Train",
                    value: topTrain?.name || "—",
                    sub:   `${topTrain?.successProbability || 0}% tatkal success probability`,
                    color: "bg-green-50 border-green-200",
                  },
                  {
                    icon: "📈",
                    title: "Booking Success Probability",
                    value: `${topTrain?.successProbability || 72}%`,
                    sub:   topTrain?.recommendedReason || "Based on historical data",
                    color: "bg-blue-50 border-blue-200",
                  },
                  {
                    icon: "💳",
                    title: "Best Payment Method",
                    value: bestPay?.label || "UPI",
                    sub:   bestPay ? `Avg ${Math.round(bestPay.avgCompletionMs/1000)}s · ${Math.round(bestPay.successRate*100)}% success` : "Fastest completion time",
                    color: "bg-purple-50 border-purple-200",
                  },
                  {
                    icon: "🚉",
                    title: "Best Boarding Station",
                    value: bestStn?.name || "As per ticket",
                    sub:   bestStn?.tradeOff || "Optimal seat availability",
                    color: "bg-orange-50 border-orange-200",
                  },
                ].map(({ icon, title, value, sub, color }) => (
                  <div key={title} className={`flex items-center gap-4 border rounded-xl px-4 py-3 ${color}`}>
                    <span className="text-2xl shrink-0">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-400 font-semibold">{title}</p>
                      <p className="text-sm font-bold text-gray-800">{value}</p>
                      <p className="text-[10px] text-gray-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strategy */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Booking Strategy</p>
                <ol className="space-y-2 text-xs text-gray-700">
                  {[
                    "Open IRCTC exactly at 10:00 AM for Tatkal booking",
                    `Book ${topTrain?.name || "top recommended train"} for highest success rate`,
                    `Pay via ${bestPay?.label || "UPI"} — fastest completion, minimize seat-lock timeout risk`,
                    `Board from ${bestStn?.name || "nearest station"} for better seat availability`,
                    "Keep backup train details ready in case primary booking fails",
                    "Ensure net connection is stable — prefer 4G/5G over WiFi during booking",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i+1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-[10px] text-gray-400 text-center">
                Generated by Sanchar Sarthi AI · {new Date().toISOString().split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { Sparkles } from "lucide-react";