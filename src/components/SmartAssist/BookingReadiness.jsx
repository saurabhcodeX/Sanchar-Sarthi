import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Ticket } from "lucide-react";

const CHECKLIST = [
  { id: "passengers", label: "Passenger Details Completed",  desc: "Name, age, gender, berth preference filled" },
  { id: "journey",    label: "Journey Verified",             desc: "Train, date, class confirmed" },
  { id: "payment",    label: "Payment Method Selected",      desc: "UPI / Card / Net Banking ready" },
  { id: "booking",    label: "Booking Started",              desc: "Initiated on Sanchar Sarthi" },
  { id: "confirmed",  label: "Ticket Confirmed",             desc: "PNR generated, ticket received" },
  { id: "backup",     label: "Backup Plan Generated",        desc: "Alternative train identified" },
];

const STORAGE_KEY = "ss_booking_readiness";

export default function BookingReadiness() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const completedCount = Object.values(checked).filter(Boolean).length;
  const percent        = Math.round((completedCount / CHECKLIST.length) * 100);

  function toggle(id) {
    setChecked(c => ({ ...c, [id]: !c[id] }));
  }

  function reset() {
    setChecked({});
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket size={15} className="text-orange-500" />
          <span className="text-xs font-bold text-gray-800">Booking Readiness</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">{percent}%</span>
          <button onClick={reset} className="text-[10px] text-gray-400 hover:text-red-500 transition-colors">Reset</button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-3 pb-1">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <p className="text-[10px] text-gray-400 mt-1">
          {completedCount} of {CHECKLIST.length} steps completed
          {percent === 100 && " 🎉 All set!"}
        </p>
      </div>

      <div className="p-3 space-y-1">
        {CHECKLIST.map((item, i) => {
          const done = !!checked[item.id];
          return (
            <motion.button key={item.id} onClick={() => toggle(item.id)}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                done ? "bg-green-50 border border-green-100" : "bg-gray-50 border border-gray-100 hover:border-gray-200"
              }`}>
              {done
                ? <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                : <Circle      size={16} className="text-gray-300 shrink-0" />}
              <div>
                <p className={`text-xs font-semibold ${done ? "text-green-700 line-through" : "text-gray-700"}`}>
                  {item.label}
                </p>
                <p className="text-[10px] text-gray-400">{item.desc}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}