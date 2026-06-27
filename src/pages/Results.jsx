import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Clock, ArrowRight, Filter, Zap, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTrainSearch } from "../hooks/useTrainSearch";

function ClassPill({ cls, price, seats, selected, onClick }) {
  const available = seats > 0;
  return (
    <button onClick={() => available && onClick(cls)}
      className={`text-center px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
        selected ? "border-orange-500 bg-orange-50 shadow-sm" :
        available ? "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50" :
        "border-gray-100 opacity-40 cursor-not-allowed"}`}>
      <p className="text-gray-500 text-[10px]">{cls}</p>
      <p className={`font-bold ${selected ? "text-orange-600" : "text-gray-800"}`}>₹{price}</p>
      {available
        ? <p className="text-green-500 text-[10px]">{seats} avail</p>
        : <p className="text-red-400 text-[10px]">Waitlist</p>}
    </button>
  );
}

export default function Results() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "New Delhi";
  const to   = searchParams.get("to")   || "Chandigarh";
  const date = searchParams.get("date") || "Sat, 27 Jun";

  const { trains, loading, error } = useTrainSearch({ from, to });

  const [sort, setSort] = useState("dep");
  const [selectedClass, setSelectedClass] = useState({});

  const sorted = [...trains].sort((a, b) => {
    if (sort === "dep")   return a.dep.localeCompare(b.dep);
    if (sort === "price") return Math.min(...Object.values(a.price)) - Math.min(...Object.values(b.price));
    if (sort === "dur")   return a.duration.localeCompare(b.duration);
    return 0;
  });

  function handleBook(train) {
    const cls = selectedClass[train.id] || Object.keys(train.price)[0];
    navigate(`/passengers?trainId=${train.id}&class=${encodeURIComponent(cls)}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0A1628] text-white px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-blue-300 hover:text-white text-xs mb-3 transition-colors">
            <ChevronLeft size={14}/> Modify Search
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-lg font-extrabold">
              <span>{from}</span><ArrowRight size={16} className="text-orange-400"/><span>{to}</span>
            </div>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs">{date}</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs">1 Adult</span>
          </div>
          <p className="text-blue-300 text-sm mt-1">
            {loading ? "Searching..." : `${trains.length} trains available`}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {loading && (
          <div className="space-y-4" aria-busy="true">
            {[1,2,3].map((i) => (
              <div key={i} className="h-28 bg-white rounded-2xl border border-gray-100 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div role="alert" className="text-center py-16 text-red-500 bg-white rounded-2xl border border-gray-100">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-xs text-gray-400 font-semibold flex items-center gap-1 mr-1"><Filter size={12}/>Sort:</span>
              {[["dep","Departure"],["dur","Duration"],["price","Price"]].map(([k,l]) => (
                <button key={k} onClick={() => setSort(k)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${sort===k ? "bg-orange-500 text-white border-orange-500" : "bg-white border-gray-200 text-gray-500 hover:border-orange-300"}`}>
                  {l}
                </button>
              ))}
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-100">
                No trains found for this route.
              </div>
            ) : (
              <div className="space-y-4" aria-label="Train search results">
                {sorted.map((train, i) => (
                  <motion.div key={train.id}
                    initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                    transition={{ delay: i*0.06 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="p-5">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                        <div className="lg:w-48 shrink-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              train.type==="Premium" ? "bg-orange-100 text-orange-600" :
                              train.type==="Superfast" ? "bg-blue-100 text-blue-600" :
                              "bg-gray-100 text-gray-500"}`}>{train.type}</span>
                            <span className="text-[10px] text-gray-400 font-mono">#{train.number}</span>
                          </div>
                          <p className="font-bold text-gray-900 text-sm leading-tight">{train.name}</p>
                        </div>

                        <div className="flex items-center gap-3 flex-1">
                          <div>
                            <p className="text-2xl font-extrabold text-gray-900">{train.dep}</p>
                            <p className="text-xs text-gray-400">{from.split(" ")[0]}</p>
                          </div>
                          <div className="flex-1 flex flex-col items-center gap-1">
                            <p className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={9}/>{train.duration}</p>
                            <div className="w-full flex items-center gap-1">
                              <div className="flex-1 h-px bg-gray-200"/>
                              <ArrowRight size={12} className="text-orange-400 shrink-0"/>
                            </div>
                          </div>
                          <div>
                            <p className="text-2xl font-extrabold text-gray-900">{train.arr}</p>
                            <p className="text-xs text-gray-400">{to.split(" ")[0]}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {Object.entries(train.price).map(([cls, price]) => (
                            <ClassPill key={cls} cls={cls} price={price}
                              seats={train.seats[cls] ?? 0}
                              selected={selectedClass[train.id] === cls}
                              onClick={c => setSelectedClass(s => ({...s, [train.id]: c}))}/>
                          ))}
                        </div>

                        <button onClick={() => handleBook(train)}
                          className="shrink-0 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition-all">
                          <Zap size={14}/> Book Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}