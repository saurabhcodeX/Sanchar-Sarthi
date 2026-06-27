import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Train, Clock, ArrowRight, Download, Eye, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const BOOKINGS = [
  { id:"BK001", pnr:"4521876543", train:"Vande Bharat Express", number:"22436", from:"New Delhi", to:"Chandigarh", dep:"06:00", arr:"09:30", date:"27 Jun 2026", class:"3A", passengers:1, fare:980, status:"Confirmed" },
  { id:"BK002", pnr:"7834521098", train:"Rajdhani Express",     number:"12301", from:"New Delhi", to:"Howrah",     dep:"16:55", arr:"09:55", date:"15 Jun 2026", class:"2A", passengers:2, fare:3240, status:"Completed" },
  { id:"BK003", pnr:"9012345678", train:"Shatabdi Express",     number:"12005", from:"New Delhi", to:"Chandigarh", dep:"07:20", arr:"11:05", date:"02 Jul 2026", class:"CC", passengers:1, fare:780, status:"Confirmed" },
  { id:"BK004", pnr:"3456789012", train:"Himalayan Queen",      number:"14095", from:"New Delhi", to:"Kalka",      dep:"05:40", arr:"10:35", date:"10 May 2026", class:"SL", passengers:3, fare:765, status:"Cancelled" },
];

const STATUS_STYLES = {
  Confirmed: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-600",
};

export default function Bookings() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = BOOKINGS.filter(b => {
    if (filter !== "All" && b.status !== filter) return false;
    if (search && !b.train.toLowerCase().includes(search.toLowerCase()) && !b.pnr.includes(search)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0A1628] text-white px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-extrabold">My Bookings</h1>
          <p className="text-blue-300 text-sm mt-1">All your train bookings in one place</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
            <Search size={15} className="text-gray-400"/>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search by train name or PNR..."
              className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-300"/>
          </div>
          <div className="flex gap-2">
            {["All","Confirmed","Completed","Cancelled"].map(f => (
              <button key={f} onClick={()=>setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${filter===f?"bg-orange-500 text-white border-orange-500":"bg-white border-gray-200 text-gray-500 hover:border-orange-300"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Train size={40} className="mx-auto mb-3 opacity-30"/>
            <p className="font-semibold">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b, i) => (
              <motion.div key={b.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                        <span className="text-[10px] text-gray-400 font-mono">PNR: {b.pnr}</span>
                      </div>
                      <p className="font-bold text-gray-900">{b.train}</p>
                      <p className="text-xs text-gray-400 font-mono">#{b.number} · {b.date}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="font-extrabold text-gray-900">{b.dep}</p>
                        <p className="text-xs text-gray-400">{b.from}</p>
                      </div>
                      <ArrowRight size={14} className="text-orange-400"/>
                      <div className="text-center">
                        <p className="font-extrabold text-gray-900">{b.arr}</p>
                        <p className="text-xs text-gray-400">{b.to}</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-400">{b.class} · {b.passengers} pax</p>
                      <p className="font-extrabold text-orange-600">₹{b.fare.toLocaleString()}</p>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/ticket/${b.id}`, { state: { train: { name: b.train, number: b.number, dep: b.dep, arr: b.arr }, selectedClass: b.class, passengers: Array(b.passengers).fill({ name:"Passenger", age:25, gender:"Male", berth:"Lower" }), total: b.fare }})}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 hover:border-orange-400 text-xs font-semibold text-gray-600 hover:text-orange-600 transition-all">
                        <Eye size={13}/> View
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 hover:border-orange-400 text-xs font-semibold text-gray-600 hover:text-orange-600 transition-all">
                        <Download size={13}/> Download
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}