import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, TrendingUp, Zap, CreditCard, MapPin,
  RefreshCw, ChevronDown, ChevronUp, Star, Shield,
  AlertTriangle, CheckCircle2, Clock, Users
} from "lucide-react";
import { getRecommendedTrains }           from "../../services/recommendation/trainRecommendation";
import { calculateSuccessProbability }    from "../../services/recommendation/successProbability";
import { getPaymentMethodRecommendation } from "../../services/recommendation/paymentMethod";
import { getBoardingStationRecommendations } from "../../services/recommendation/boardingStation";
import { generateBackupPlan }            from "../../services/recommendation/backupPlan";

function ProgressRing({ value, color = "#3B82F6", size = 64, stroke = 6 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} stroke="#E5E7EB" strokeWidth={stroke} fill="none" />
      <motion.circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut" }} />
    </svg>
  );
}

function ConfidenceMeter({ value }) {
  const color = value >= 75 ? "#22C55E" : value >= 50 ? "#F59E0B" : value >= 25 ? "#F97316" : "#EF4444";
  const label = value >= 75 ? "High" : value >= 50 ? "Medium" : value >= 25 ? "Low" : "Very Low";
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <ProgressRing value={value} color={color} size={72} stroke={7} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-black" style={{ color }}>{value}%</span>
        </div>
      </div>
      <span className="text-[11px] font-bold mt-1" style={{ color }}>{label}</span>
    </div>
  );
}

function Badge({ label, color = "blue" }) {
  const colors = {
    green:  "bg-green-100 text-green-700 border-green-200",
    blue:   "bg-blue-100 text-blue-700 border-blue-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    red:    "bg-red-100 text-red-700 border-red-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors[color] || colors.blue}`}>
      {label}
    </span>
  );
}

function Section({ title, icon: Icon, iconColor = "text-blue-500", children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50/80 hover:bg-gray-100/80 transition-colors">
        <div className="flex items-center gap-2">
          <Icon size={15} className={iconColor} />
          <span className="text-xs font-bold text-gray-800">{title}</span>
        </div>
        {open ? <ChevronUp size={13} className="text-gray-400" /> : <ChevronDown size={13} className="text-gray-400" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            className="overflow-hidden">
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SmartAssistPanel({ trains = [], origin = "", queuePosition = null, seatsRemaining = null, lockTtlMs = 300000 }) {
  const [ranked, setRanked]       = useState([]);
  const [successData, setSuccess] = useState(null);
  const [paymentRec, setPayment]  = useState(null);
  const [stations, setStations]   = useState([]);
  const [backup, setBackup]       = useState(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [r, p, s] = await Promise.all([
        trains.length ? getRecommendedTrains({ trains }) : Promise.resolve([]),
        getPaymentMethodRecommendation(lockTtlMs),
        origin ? getBoardingStationRecommendations(origin) : Promise.resolve(null),
      ]);
      setRanked(r);
      setPayment(p);
      setStations(s || []);
      if (trains.length) {
        const bp = await generateBackupPlan({ failedTrainNo: trains[0]?.number, trains, route: origin });
        setBackup(bp);
      }
      setLoading(false);
    }
    load();
  }, [trains.length, origin, lockTtlMs]);

  useEffect(() => {
    if (queuePosition !== null && seatsRemaining !== null) {
      setSuccess(calculateSuccessProbability({ queuePosition, seatsRemaining }));
    }
  }, [queuePosition, seatsRemaining]);

  // Dashboard scores
  const topTrain       = ranked[0];
  const bookingScore   = topTrain ? topTrain.successProbability : 72;
  const demandLevel    = topTrain ? (topTrain.score < 0.6 ? "High" : topTrain.score < 0.8 ? "Medium" : "Low") : "Medium";
  const demandColor    = demandLevel === "High" ? "red" : demandLevel === "Medium" ? "orange" : "green";
  const aiConfidence   = topTrain ? Math.round(topTrain.score * 95) : 78;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header card */}
      <div className="rounded-2xl overflow-hidden shadow-sm"
        style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)" }}>
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-yellow-300" />
            <span className="font-black text-white text-sm">Smart Assist</span>
            <span className="text-[10px] bg-yellow-400 text-yellow-900 font-black px-2 py-0.5 rounded-full">AI</span>
          </div>

          {/* Dashboard metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <ConfidenceMeter value={bookingScore} />
              <p className="text-[10px] text-blue-200 font-semibold mt-1">Booking Score</p>
            </div>
            <div className="text-center">
              <ConfidenceMeter value={aiConfidence} color="#A78BFA" />
              <p className="text-[10px] text-blue-200 font-semibold mt-1">AI Confidence</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Badge label={`${demandLevel} Demand`} color={demandColor} />
              <Badge label={`${trains.length} Trains`} color="blue" />
              {paymentRec?.recommended && (
                <Badge label={paymentRec.recommended.label} color="purple" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Best Train */}
      <Section title="Best Train Recommendations" icon={TrendingUp} iconColor="text-green-500">
        <div className="space-y-2">
          {ranked.slice(0, 3).map((t, i) => (
            <motion.div key={t.id || t.number}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 border ${
                i === 0 ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-100"
              }`}>
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                  i === 0 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                }`}>{i+1}</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">{t.name}</p>
                  <p className="text-[10px] text-gray-400 max-w-[140px] truncate">{t.recommendedReason}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-black ${i === 0 ? "text-green-600" : "text-gray-600"}`}>{t.successProbability}%</p>
                <p className="text-[10px] text-gray-400">{t.seatsInQuota} seats</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Success probability */}
      {successData && (
        <Section title="Booking Success Odds" icon={Zap} iconColor="text-yellow-500">
          <div className="text-center mb-3">
            <ConfidenceMeter value={successData.probability} />
            <p className="text-sm font-bold text-gray-800 mt-1">{successData.message}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Queue #", `#${successData.queuePosition}`],
              ["Seats",   successData.seatsRemaining],
              ["Rivals",  successData.effectiveCompetitors],
            ].map(([l, v]) => (
              <div key={l} className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-sm font-black text-gray-800">{v}</p>
                <p className="text-[10px] text-gray-400">{l}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Payment method */}
      {paymentRec?.recommended && (
        <Section title="Payment Recommendation" icon={CreditCard} iconColor="text-purple-500">
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-xl px-3 py-2.5">
              <span className="text-xl">{paymentRec.recommended.icon}</span>
              <div>
                <p className="text-xs font-bold text-purple-800">{paymentRec.recommended.label} recommended</p>