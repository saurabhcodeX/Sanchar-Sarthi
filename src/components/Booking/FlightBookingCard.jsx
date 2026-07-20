import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation, MapPin, ArrowLeftRight, Calendar, Users, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchAirports } from "../../data/airports";

const TRIP_TYPES = ["One Way", "Round Trip"];
const CLASSES = ["Economy", "Business", "First"];

function todayISO() { return new Date().toISOString().split("T")[0]; }

export default function FlightBookingCard() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("One Way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depDate, setDepDate] = useState(todayISO());
  const [retDate, setRetDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [showClassMenu, setShowClassMenu] = useState(false);

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromList, setShowFromList] = useState(false);
  const [showToList, setShowToList] = useState(false);

  const swap = () => { setFrom(to); setTo(from); };

  const handleSearch = () => {
    if (!from || !to) { alert("Please fill origin and destination."); return; }
    const params = new URLSearchParams({ from, to, date: depDate, class: travelClass, passengers });
    navigate(`/flights?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6"
    >
      {/* Trip type */}
      <div className="flex gap-2 mb-5">
        {TRIP_TYPES.map((t) => (
          <button key={t} onClick={() => setTripType(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
              tripType === t ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 text-gray-500 hover:border-orange-300"
            }`}>{t}</button>
        ))}
      </div>

      {/* From / To */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">From</label>
          <div className="flex items-center gap-2 border-2 border-[#0A1A4F] rounded-lg px-3 py-2.5 focus-within:border-orange-500">
            <Navigation size={15} className="text-[#0A1A4F] shrink-0" />
            <input value={from}
              onChange={(e) => { setFrom(e.target.value); setFromSuggestions(searchAirports(e.target.value)); setShowFromList(true); }}
              onFocus={() => setShowFromList(true)}
              onBlur={() => setTimeout(() => setShowFromList(false), 150)}
              placeholder="Departure city"
              className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
            />
          </div>
          {showFromList && fromSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-1 max-h-56 overflow-auto">
              {fromSuggestions.map((a) => (
                <button key={a.code} onClick={() => { setFrom(`${a.city} (${a.code})`); setShowFromList(false); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 text-gray-700">
                  {a.city} <span className="text-gray-400 text-xs">({a.code}) — {a.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={swap} className="self-end mb-2.5 w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-[#0A1A4F] shrink-0">
          <ArrowLeftRight size={14} />
        </button>

        <div className="flex-1 relative">
          <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">To</label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-orange-500">
            <MapPin size={15} className="text-gray-400 shrink-0" />
            <input value={to}
              onChange={(e) => { setTo(e.target.value); setToSuggestions(searchAirports(e.target.value)); setShowToList(true); }}
              onFocus={() => setShowToList(true)}
              onBlur={() => setTimeout(() => setShowToList(false), 150)}
              placeholder="Arrival city"
              className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
            />
          </div>
          {showToList && toSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-1 max-h-56 overflow-auto">
              {toSuggestions.map((a) => (
                <button key={a.code} onClick={() => { setTo(`${a.city} (${a.code})`); setShowToList(false); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 text-gray-700">
                  {a.city} <span className="text-gray-400 text-xs">({a.code}) — {a.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Date / Passengers / Class */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div>
          <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">Departure</label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-orange-500">
            <Calendar size={14} className="text-gray-400 shrink-0 pointer-events-none" />
            <input type="date" value={depDate} min={todayISO()} onChange={(e) => setDepDate(e.target.value)}
              className="w-full outline-none text-sm text-gray-800 bg-transparent cursor-pointer" />
          </div>
        </div>

        {tripType === "Round Trip" && (
          <div>
            <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">Return</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-orange-500">
              <Calendar size={14} className="text-gray-400 shrink-0 pointer-events-none" />
              <input type="date" value={retDate} min={depDate} onChange={(e) => setRetDate(e.target.value)}
                className="w-full outline-none text-sm text-gray-800 bg-transparent cursor-pointer" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">Passengers</label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5">
            <Users size={14} className="text-gray-400 shrink-0" />
            <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full outline-none text-sm text-gray-800 bg-transparent cursor-pointer">
              {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>)}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">Class</label>
          <button onClick={() => setShowClassMenu(v => !v)}
            className="w-full flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 hover:border-orange-400 transition-colors">
            <span className="text-sm text-gray-800 flex-1 text-left">{travelClass}</span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${showClassMenu ? "rotate-180" : ""}`} />
          </button>
          {showClassMenu && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-1">
              {CLASSES.map((c) => (
                <button key={c} onClick={() => { setTravelClass(c); setShowClassMenu(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 ${travelClass === c ? "text-orange-600 font-semibold" : "text-gray-700"}`}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <button onClick={handleSearch}
        className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] transition-all text-white font-bold text-sm py-3.5 rounded-full shadow-lg shadow-orange-500/30">
        Search Flights
      </button>
    </motion.div>
  );
}