import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation, MapPin, ArrowLeftRight, Calendar, Briefcase, Grid2x2, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchStations } from "../../data/stations";

const CLASSES = [
  { code: "ALL", label: "All Classes" },
  { code: "SL", label: "Sleeper" },
  { code: "3A", label: "3 Tier AC" },
  { code: "2A", label: "2 Tier AC" },
  { code: "1A", label: "First AC" },
  { code: "CC", label: "Chair Car" },
  { code: "EC", label: "Exec. Chair" },
];

const QUOTAS = [
  { code: "GENERAL", label: "GENERAL" },
  { code: "LADIES", label: "LADIES" },
  { code: "TATKAL", label: "TATKAL" },
  { code: "PREMIUM_TATKAL", label: "PREMIUM TATKAL" },
];

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function formatDisplayDate(isoStr) {
  const [y, m, d] = isoStr.split("-");
  return `${d}/${m}/${y}`;
}

export default function BookingCard() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isoDate, setIsoDate] = useState(todayISO());
  const [travelClass, setTravelClass] = useState("ALL");
  const [quota, setQuota] = useState("GENERAL");
  const [showClassMenu, setShowClassMenu] = useState(false);
  const [showQuotaMenu, setShowQuotaMenu] = useState(false);
  const [pwd, setPwd] = useState(false);
  const [flexible, setFlexible] = useState(false);
  const [railwayPass, setRailwayPass] = useState(false);

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromList, setShowFromList] = useState(false);
  const [showToList, setShowToList] = useState(false);

  const swapStations = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please fill in origin and destination.");
      return;
    }
    const params = new URLSearchParams({
      from,
      to,
      date: formatDisplayDate(isoDate),
      class: travelClass,
      quota,
    });
    navigate(`/results?${params.toString()}`);
  };

  return (
    <section className="relative -mt-16 z-20 px-4 md:px-0 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-[#0A1A4F]/10"
      >
        <div className="grid grid-cols-2">
          <button onClick={() => navigate("/pnr-status")} className="bg-[#0A1A4F] text-white text-sm font-bold py-3 flex items-center justify-center gap-2 hover:bg-[#0d2266] transition-colors">
            <Briefcase size={16} /> PNR STATUS
          </button>
          <button onClick={() => navigate("/live-status")} className="bg-[#0A1A4F] text-white text-sm font-bold py-3 flex items-center justify-center gap-2 border-l border-white/10 hover:bg-[#0d2266] transition-colors">
            <Grid2x2 size={16} /> CHARTS / VACANCY
          </button>
        </div>

        <div className="bg-white px-6 py-6">
          <h2 className="text-center text-2xl font-extrabold text-[#0A1A4F] tracking-wide mb-6">
            BOOK TICKET
          </h2>

          {/* From / To */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">From</label>
              <div className="flex items-center gap-2 border-2 border-[#0A1A4F] rounded-lg px-3 py-2.5 focus-within:border-orange-500">
                <Navigation size={16} className="text-[#0A1A4F] shrink-0" />
                <input
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    setFromSuggestions(searchStations(e.target.value));
                    setShowFromList(true);
                  }}
                  onFocus={() => setShowFromList(true)}
                  onBlur={() => setTimeout(() => setShowFromList(false), 150)}
                  placeholder="Origin Station"
                  className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
                />
              </div>

              {showFromList && fromSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-1 max-h-56 overflow-auto">
                  {fromSuggestions.map((s) => (
                    <button
                      key={s.code}
                      onClick={() => { setFrom(`${s.name} (${s.code})`); setShowFromList(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 text-gray-700"
                    >
                      {s.name} <span className="text-gray-400 text-xs">({s.code})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={swapStations}
              aria-label="Swap stations"
              className="self-end mb-2.5 w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-[#0A1A4F] transition-colors shrink-0"
            >
              <ArrowLeftRight size={14} />
            </button>

            <div className="flex-1 relative">
              <label className="block text-xs font-semibold text-[#0A1A4F] mb-1 invisible md:visible">To</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-orange-500">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <input
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    setToSuggestions(searchStations(e.target.value));
                    setShowToList(true);
                  }}
                  onFocus={() => setShowToList(true)}
                  onBlur={() => setTimeout(() => setShowToList(false), 150)}
                  placeholder="Destination Station"
                  className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
                />
              </div>

              {showToList && toSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-1 max-h-56 overflow-auto">
                  {toSuggestions.map((s) => (
                    <button
                      key={s.code}
                      onClick={() => { setTo(`${s.name} (${s.code})`); setShowToList(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 text-gray-700"
                    >
                      {s.name} <span className="text-gray-400 text-xs">({s.code})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date / Class */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">Journey Date *</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-orange-500">
                <Calendar size={15} className="text-gray-400 shrink-0 pointer-events-none" />
                <input
                  type="date"
                  value={isoDate}
                  min={todayISO()}
                  onChange={(e) => setIsoDate(e.target.value)}
                  className="w-full outline-none text-sm text-gray-800 bg-transparent cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
            </div>

            <div className="flex-1 relative">
              <label className="block text-xs font-semibold text-transparent mb-1">Class</label>
              <button
                onClick={() => { setShowClassMenu(v => !v); setShowQuotaMenu(false); }}
                className="w-full flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 hover:border-orange-400 transition-colors"
              >
                <Briefcase size={15} className="text-gray-400 shrink-0" />
                <span className="text-sm text-gray-800 flex-1 text-left">
                  {CLASSES.find(c => c.code === travelClass)?.label}
                </span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${showClassMenu ? "rotate-180" : ""}`} />
              </button>

              {showClassMenu && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-1 max-h-56 overflow-auto">
                  {CLASSES.map(c => (
                    <button
                      key={c.code}
                      onClick={() => { setTravelClass(c.code); setShowClassMenu(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 ${travelClass === c.code ? "text-orange-600 font-semibold" : "text-gray-700"}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quota */}
          <div className="relative mb-5">
            <button
              onClick={() => { setShowQuotaMenu(v => !v); setShowClassMenu(false); }}
              className="w-full flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 hover:border-orange-400 transition-colors"
            >
              <Grid2x2 size={15} className="text-gray-400 shrink-0" />
              <span className="text-sm font-semibold text-[#0A1A4F] flex-1 text-left">
                {QUOTAS.find(q => q.code === quota)?.label}
              </span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${showQuotaMenu ? "rotate-180" : ""}`} />
            </button>

            {showQuotaMenu && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-1">
                {QUOTAS.map(q => (
                  <button
                    key={q.code}
                    onClick={() => { setQuota(q.code); setShowQuotaMenu(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 ${quota === q.code ? "text-orange-600 font-semibold" : "text-gray-700"}`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#0A1A4F] cursor-pointer">
              <input type="checkbox" checked={pwd} onChange={(e) => setPwd(e.target.checked)}
                className="w-4 h-4 accent-[#0A1A4F] rounded" />
              Person With Disability Concession
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#0A1A4F] cursor-pointer">
              <input type="checkbox" checked={flexible} onChange={(e) => setFlexible(e.target.checked)}
                className="w-4 h-4 accent-[#0A1A4F] rounded" />
              Flexible With Date
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#0A1A4F] cursor-pointer">
              <input type="checkbox" checked={railwayPass} onChange={(e) => setRailwayPass(e.target.checked)}
                className="w-4 h-4 accent-[#0A1A4F] rounded" />
              Railway Pass Concession
            </label>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] transition-all text-white font-bold text-sm py-3.5 rounded-full shadow-lg shadow-orange-500/30"
          >
            Search Trains
          </button>
        </div>
      </motion.div>
    </section>
  );
}