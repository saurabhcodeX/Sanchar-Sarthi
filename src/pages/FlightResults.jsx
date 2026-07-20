import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Clock, Filter, Zap, Plane, Luggage, RefreshCw } from "lucide-react";
import { searchFlights } from "../services/flightService";
import Loader from "../components/Common/Loader";

function FlightCard({ flight, i, onBook }) {
  const [selected, setSelected] = useState("Economy");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Airline */}
        <div className="lg:w-44 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
              {flight.airlineCode}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">{flight.flightNo}</span>
          </div>
          <p className="font-bold text-gray-900 text-sm">{flight.airline}</p>
          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
            <Luggage size={10} /> {flight.baggage}
            {flight.refundable && <span className="ml-1 text-green-500">• Refundable</span>}
          </p>
        </div>

        {/* Timing */}
        <div className="flex items-center gap-3 flex-1">
          <div>
            <p className="text-2xl font-extrabold text-gray-900">{flight.dep}</p>
            <p className="text-xs text-gray-400">{flight.from.split("(")[0].trim()}</p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <p className="text-[10px] text-gray-400 flex items-center gap-1">
              <Clock size={9} /> {flight.duration}
            </p>
            <div className="w-full flex items-center gap-1">
              <div className="flex-1 h-px bg-gray-200" />
              <Plane size={12} className="text-orange-400 shrink-0" />
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <p className="text-[10px] text-gray-400">
              {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
            </p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-900">{flight.arr}</p>
            <p className="text-xs text-gray-400">{flight.to.split("(")[0].trim()}</p>
          </div>
        </div>

        {/* Class pills */}
        <div className="flex gap-2 flex-wrap">
          {Object.entries(flight.price).map(([cls, price]) => (
            <button key={cls} onClick={() => setSelected(cls)}
              className={`text-center px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                selected === cls
                  ? "border-orange-500 bg-orange-50 shadow-sm"
                  : "border-gray-200 hover:border-orange-300"
              }`}>
              <p className="text-gray-500 text-[10px]">{cls}</p>
              <p className={`font-bold ${selected === cls ? "text-orange-600" : "text-gray-800"}`}>
                ₹{price.toLocaleString()}
              </p>
              <p className="text-green-500 text-[10px]">{flight.seats[cls]} seats</p>
            </button>
          ))}
        </div>

        {/* Book button */}
        <button
          onClick={() => onBook(flight, selected)}
          className="shrink-0 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition-all"
        >
          <Zap size={14} /> Book Now
        </button>
      </div>
    </motion.div>
  );
}

export default function FlightResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const from = searchParams.get("from") || "";
  const to   = searchParams.get("to")   || "";
  const date = searchParams.get("date") || "";
  const cls  = searchParams.get("class") || "Economy";
  const passengers = Number(searchParams.get("passengers") || 1);

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [sort, setSort]       = useState("dep");

  useEffect(() => {
    setLoading(true);
    searchFlights({ from, to, date, travelClass: cls, passengers })
      .then(setFlights)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [from, to, date, cls, passengers]);

  const sorted = [...flights].sort((a, b) => {
    if (sort === "dep")   return a.dep.localeCompare(b.dep);
    if (sort === "price") return a.price[cls] - b.price[cls];
    if (sort === "dur")   return a.durationMins - b.durationMins;
    return 0;
  });

  function handleBook(flight, selectedClass) {
    navigate(`/payment?type=flight&flightId=${flight.id}&class=${encodeURIComponent(selectedClass)}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0A1628] text-white px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-blue-300 hover:text-white text-xs mb-3 transition-colors">
            <ChevronLeft size={14} /> Modify Search
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-lg font-extrabold">
              <span>{from.split("(")[0].trim()}</span>
              <Plane size={16} className="text-orange-400" />
              <span>{to.split("(")[0].trim()}</span>
            </div>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs">{date}</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs">{passengers} Adult{passengers > 1 ? "s" : ""}</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs">{cls}</span>
          </div>
          <p className="text-blue-300 text-sm mt-1">
            {loading ? "Searching flights..." : `${flights.length} flights available`}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {loading && (
          <div className="space-y-4">
            {[1,2,3].map((i) => (
              <div key={i} className="h-28 bg-white rounded-2xl border border-gray-100 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-16 text-red-500 bg-white rounded-2xl border border-gray-100" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-xs text-gray-400 font-semibold flex items-center gap-1 mr-1">
                <Filter size={12} /> Sort:
              </span>
              {[["dep","Departure"],["dur","Duration"],["price","Price"]].map(([k, l]) => (
                <button key={k} onClick={() => setSort(k)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    sort === k ? "bg-orange-500 text-white border-orange-500" : "bg-white border-gray-200 text-gray-500 hover:border-orange-300"
                  }`}>
                  {l}
                </button>
              ))}
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-100">
                No flights found for this route.
              </div>
            ) : (
              <div className="space-y-4" aria-label="Flight search results">
                {sorted.map((flight, i) => (
                  <FlightCard key={flight.id} flight={flight} i={i} onBook={handleBook} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}