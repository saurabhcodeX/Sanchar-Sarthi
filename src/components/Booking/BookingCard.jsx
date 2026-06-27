import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, ChevronDown } from "lucide-react";
import StationInput from "./StationInput";
import SwapButton from "./SwapButton";
import JourneyDate from "./JourneyDate";

const POPULAR_ROUTES = [
  { from: "New Delhi (NDLS)", to: "Chandigarh (CDG)" },
  { from: "New Delhi (NDLS)", to: "Mumbai Central (BCT)" },
  { from: "Lucknow (LKO)", to: "New Delhi (NDLS)" },
  { from: "Chennai Central (MAS)", to: "Bangalore City (SBC)" },
];

const CLASSES = [
  { code: "SL", label: "Sleeper" },
  { code: "3A", label: "3 Tier AC" },
  { code: "2A", label: "2 Tier AC" },
  { code: "1A", label: "First AC" },
  { code: "CC", label: "Chair Car" },
  { code: "EC", label: "Exec. Chair" },
];

export default function BookingCard() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("3A");
  const [showClassMenu, setShowClassMenu] = useState(false);

  const swapStations = () => {
    setFrom(to);
    setTo(from);
  };

  const handlePopularRoute = (route) => {
    setFrom(route.from);
    setTo(route.to);
  };

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please fill in origin, destination, and date.");
      return;
    }
    console.log({ from, to, date, passengers, travelClass });
  };

  return (
    <section className="relative -mt-16 z-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {/* Title */}
        <div className="text-center mb-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow">
            Book Train Tickets
          </h2>
          <p className="text-blue-200 text-sm mt-1">
            Search trains &bull; Compare fares &bull; Reserve seats instantly
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-visible">

          {/* Search Row */}
          <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-100">

            {/* FROM */}
            <div className="flex-1 min-w-0">
              <StationInput
                label="From"
                value={from}
                placeholder="Origin Station"
                onChange={setFrom}
              />
            </div>

            {/* SWAP */}
            <div className="hidden md:flex items-center justify-center px-0 relative z-10">
              <div className="absolute">
                <SwapButton onClick={swapStations} />
              </div>
            </div>

            {/* TO */}
            <div className="flex-1 min-w-0">
              <StationInput
                label="To"
                value={to}
                placeholder="Destination Station"
                onChange={setTo}
              />
            </div>

            {/* DATE */}
            <div className="w-full md:w-48 shrink-0">
              <JourneyDate value={date} onChange={setDate} />
            </div>

            {/* PASSENGERS + CLASS combined */}
            <div className="w-full md:w-44 shrink-0 relative">
              <button
                onClick={() => setShowClassMenu(!showClassMenu)}
                className="w-full h-full px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
                  Passengers & Class
                </p>
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-orange-500" />
                  <span className="font-bold text-gray-800 text-sm">
                    {passengers} Adult
                  </span>
                  <span className="ml-auto text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
                    {travelClass}
                  </span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${showClassMenu ? "rotate-180" : ""}`} />
                </div>
              </button>

              {/* Dropdown */}
              {showClassMenu && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-4">
                  {/* Passenger count */}
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Passengers</p>
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => passengers > 1 && setPassengers(p => p - 1)}
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-orange-100 flex items-center justify-center font-bold text-gray-600 disabled:opacity-30"
                      disabled={passengers <= 1}
                    >−</button>
                    <span className="font-bold text-lg text-gray-900 w-6 text-center">{passengers}</span>
                    <button
                      onClick={() => passengers < 6 && setPassengers(p => p + 1)}
                      className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 flex items-center justify-center font-bold text-white disabled:opacity-30"
                      disabled={passengers >= 6}
                    >+</button>
                    <span className="text-xs text-gray-400">Max 6</span>
                  </div>

                  {/* Class pills */}
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Travel Class</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {CLASSES.map(cls => (
                      <button
                        key={cls.code}
                        onClick={() => { setTravelClass(cls.code); setShowClassMenu(false); }}
                        className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          travelClass === cls.code
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                        }`}
                      >
                        {cls.code}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    {CLASSES.find(c => c.code === travelClass)?.label}
                  </p>
                </div>
              )}
            </div>

            {/* SEARCH BUTTON */}
            <button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-bold tracking-widest text-sm flex flex-col items-center justify-center gap-1.5 px-8 py-5 md:rounded-r-2xl"
            >
              <Search size={20} strokeWidth={2.5} />
              SEARCH
            </button>
          </div>

          {/* Popular Routes */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/60 rounded-b-2xl flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Popular
            </span>
            {POPULAR_ROUTES.map(route => (
              <button
                key={`${route.from}-${route.to}`}
                onClick={() => handlePopularRoute(route)}
                className="px-3 py-1 rounded-full text-xs bg-white border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-all"
              >
                {route.from.split("(")[0].trim()} → {route.to.split("(")[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}