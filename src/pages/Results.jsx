import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Train, Clock, ArrowRight, Filter, IndianRupee, Zap, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const TRAINS = [
  { id: 1, name: "Vande Bharat Express", number: "22436", dep: "06:00", arr: "09:30", duration: "3h 30m", price: { "3A": 945, "2A": 1350, "1A": 2100 }, seats: { "3A": 152, "2A": 48, "1A": 12 }, type: "Premium" },
  { id: 2, name: "Shatabdi Express",     number: "12005", dep: "07:20", arr: "11:05", duration: "3h 45m", price: { CC: 745, EC: 1405 },                  seats: { CC: 210, EC: 40 },               type: "Superfast" },
  { id: 3, name: "Himalayan Queen",      number: "14095", dep: "05:40", arr: "10:35", duration: "4h 55m", price: { SL: 255, "3A": 665, "2A": 955 },       seats: { SL: 320, "3A": 90, "2A": 22 },  type: "Express" },
  { id: 4, name: "Jan Shatabdi",         number: "12055", dep: "14:30", arr: "18:10", duration: "3h 40m", price: { CC: 490, "2A": 895 },                  seats: { CC: 180, "2A": 30 },             type: "Superfast" },
  { id: 5, name: "Punjab Mail",          number: "12137", dep: "22:15", arr: "04:30", duration: "6h 15m", price: { SL: 220, "3A": 590, "2A": 850 },       seats: { SL: 0, "3A": 64, "2A": 10 },    type: "Mail" },
];

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
  const [sort, setSort]           = useState("dep");
  const [selectedClass, setSelectedClass] = useState({});

  const sorted = [...TRAINS].sort((a, b) => {
    if (sort === "dep")   return a.dep.localeCompare(b.dep);
    if (sort === "price") return Math.min(...Object.values(a.price)) - Math.min(...Object.values(b.price));
    if (sort === "dur")   return a.duration.localeCompare(b.duration);
    return 0;
  });

  function handleBook(train) {
    const cls = selectedClass[train.id] || Object.keys(train.price)[0];
    navigate("/passengers", { state: { train, selectedClass: cls } });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
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
          <p className="text-blue-300 text-sm mt-1">{TRAINS.length} trains available</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Sort */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-xs text-gray-400 font-semibold flex items-center gap-1 mr-1"><Filter size={12}/>Sort:</span>
          {[["dep","Departure"],["dur","Duration"],["price","Price"]].map(([k,l]) => (
            <button key={k} onClick={() => setSort(k)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${sort===k ? "bg-orange-500 text-white border-orange-500" : "bg-white border-gray-200 text-gray-500 hover:border-orange-300"}`}>
              {l}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {sorted.map((train, i) => (
            <motion.div key={train.id}
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay: i*0.06 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  {/* Name */}
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

                  {/* Timing */}
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

                  {/* Class pills */}
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(train.price).map(([cls, price]) => (
                      <ClassPill key={cls} cls={cls} price={price}
                        seats={train.seats[cls] ?? 0}
                        selected={selectedClass[train.id] === cls}
                        onClick={c => setSelectedClass(s => ({...s, [train.id]: c}))}/>
                    ))}
                  </div>

                  {/* Book btn */}
                  <button onClick={() => handleBook(train)}
                    className="shrink-0 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition-all">
                    <Zap size={14}/> Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}