import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, ChevronUp, TrendingUp, MapPin, Zap, CreditCard, RefreshCw } from "lucide-react";
import { getRecommendedTrains }         from "../../services/recommendation/trainRecommendation";
import { calculateSuccessProbability }  from "../../services/recommendation/successProbability";
import { getPaymentMethodRecommendation } from "../../services/recommendation/paymentMethod";

export default function SmartAssist({ trains = [], queuePosition = null, seatsRemaining = null, lockTtlMs = 300000 }) {
  const [open, setOpen]             = useState(true);
  const [ranked, setRanked]         = useState([]);
  const [successData, setSuccessData] = useState(null);
  const [paymentRec, setPaymentRec] = useState(null);
  const [activeTab, setActiveTab]   = useState("trains");

  useEffect(() => {
    if (trains.length) {
      getRecommendedTrains({ trains }).then(setRanked);
    }
  }, [trains]);

  useEffect(() => {
    if (queuePosition !== null && seatsRemaining !== null) {
      setSuccessData(calculateSuccessProbability({ queuePosition, seatsRemaining }));
    }
  }, [queuePosition, seatsRemaining]);

  useEffect(() => {
    getPaymentMethodRecommendation(lockTtlMs).then(setPaymentRec);
  }, [lockTtlMs]);

  const COLOR_MAP = {
    green:  "text-green-600 bg-green-50 border-green-200",
    yellow: "text-yellow-600 bg-yellow-50 border-yellow-200",
    orange: "text-orange-600 bg-orange-50 border-orange-200",
    red:    "text-red-600 bg-red-50 border-red-200",
    blue:   "text-blue-600 bg-blue-50 border-blue-200",
  };

  const TABS = [
    { id: "trains",  label: "Best Trains",   icon: TrendingUp },
    { id: "payment", label: "Payment",       icon: CreditCard },
    ...(queuePosition ? [{ id: "queue", label: "Success Odds", icon: Zap }] : []),
  ];

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={17} className="text-yellow-300" />
          <span className="font-bold text-sm">Smart Assist</span>
          <span className="text-[10px] bg-yellow-400 text-yellow-900 font-bold px-2 py-0.5 rounded-full">AI</span>
        </div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Tabs */}
            <div className="flex border-b border-gray-100 px-4 pt-2 gap-1">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition-colors relative ${
                    activeTab === id ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                  }`}>
                  <Icon size={12} /> {label}
                  {activeTab === id && (
                    <motion.div layoutId="assist-tab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-4">
              {/* Best Trains tab */}
              {activeTab === "trains" && (
                <div className="space-y-2">
                  <p className="text-[11px] text-gray-400 font-semibold mb-2">Ranked by tatkal success probability</p>
                  {ranked.slice(0, 3).map((train, i) => (
                    <div key={train.id || train.number}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 border ${
                        i === 0 ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-100"
                      }`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ${
                          i === 0 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                        }`}>{i + 1}</span>
                        <div>
                          <p className="text-xs font-bold text-gray-800">{train.name}</p>
                          <p className="text-[10px] text-gray-400">{train.recommendedReason}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-sm font-black ${i === 0 ? "text-green-600" : "text-gray-600"}`}>
                          {train.successProbability}%
                        </p>
                        <p className="text-[10px] text-gray-400">success</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Payment tab */}
              {activeTab === "payment" && paymentRec && (
                <div className="space-y-2">
                  {paymentRec.recommended && (
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 mb-3">
                      <Zap size={14} className="text-blue-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-blue-800">
                          {paymentRec.recommended.icon} {paymentRec.recommended.label} recommended
                        </p>
                        <p className="text-[10px] text-blue-600">
                          Avg {Math.round(paymentRec.recommended.avgCompletionMs / 1000)}s · {Math.round(paymentRec.recommended.successRate * 100)}% success rate
                        </p>
                      </div>
                    </div>
                  )}
                  {paymentRec.all?.map(p => (
                    <div key={p.method}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 border ${
                        p.isRecommended ? "bg-blue-50 border-blue-200" :
                        p.isViable ? "bg-gray-50 border-gray-100" :
                        "opacity-40 bg-gray-50 border-gray-100"
                      }`}>
                      <div className="flex items-center gap-2">
                        <span className="text-base">{p.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-gray-800">{p.label}</p>
                          <p className="text-[10px] text-gray-400">{p.reason}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-xs font-black ${p.isRecommended ? "text-blue-600" : "text-gray-500"}`}>
                          {Math.round(p.successRate * 100)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Success Odds tab */}
              {activeTab === "queue" && successData && (
                <div className="space-y-3">
                  <div className={`rounded-xl px-4 py-4 border text-center ${COLOR_MAP[successData.color] || COLOR_MAP.blue}`}>
                    <p className="text-4xl font-black mb-1">{successData.probability}%</p>
                    <p className="text-sm font-semibold">{successData.message}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      ["Queue Position", `#${successData.queuePosition}`],
                      ["Seats Left",     successData.seatsRemaining],
                      ["Competitors",    successData.effectiveCompetitors],
                    ].map(([label, val]) => (
                      <div key={label} className="bg-gray-50 rounded-xl px-2 py-2.5">
                        <p className="text-sm font-black text-gray-800">{val}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 text-center">
                    Estimate accounts for {Math.round((1 - 0.22) * 100)}% of users who complete payment
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}