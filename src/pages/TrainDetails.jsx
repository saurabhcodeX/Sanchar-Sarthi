import { useNavigate, useParams } from "react-router-dom";
import { Train, Clock, MapPin, ChevronLeft, Zap, Info } from "lucide-react";

const STOPS = [
  { station:"New Delhi (NDLS)",    arr:"—",     dep:"06:00", day:1, dist:"0 km" },
  { station:"Ambala Cant (UMB)",   arr:"07:48", dep:"07:50", day:1, dist:"194 km" },
  { station:"Chandigarh (CDG)",    arr:"09:25", dep:"09:30", day:1, dist:"256 km" },
];

export default function TrainDetails() {
  const navigate = useNavigate();
  const { trainId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0A1628] text-white px-6 py-5">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-blue-300 hover:text-white text-xs mb-3 transition-colors">
            <ChevronLeft size={14}/> Back
          </button>
          <div className="flex items-center gap-3">
            <Train size={20} className="text-orange-400"/>
            <div>
              <h1 className="text-xl font-extrabold">Vande Bharat Express</h1>
              <p className="text-blue-300 text-sm">#22436 · Premium · Daily</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* Route summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-extrabold text-gray-900">06:00</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin size={10}/>New Delhi</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 flex items-center justify-center gap-1"><Clock size={10}/>3h 30m</p>
              <div className="w-24 h-px bg-orange-300 my-1"/>
              <p className="text-[10px] text-orange-500 font-semibold">2 Stops</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-gray-900">09:30</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 justify-end mt-0.5"><MapPin size={10}/>Chandigarh</p>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="font-bold text-gray-800 mb-4 text-sm">Seat Availability & Fare</p>
          <div className="grid grid-cols-3 gap-3">
            {[["3A","3 Tier AC",945,152],["2A","2 Tier AC",1350,48],["1A","First AC",2100,12]].map(([cls,label,price,seats]) => (
              <div key={cls} className="border border-gray-100 rounded-xl p-3 text-center hover:border-orange-300 transition-all cursor-pointer">
                <p className="font-bold text-gray-900 text-sm">{cls}</p>
                <p className="text-[10px] text-gray-400 mb-1">{label}</p>
                <p className="text-orange-500 font-extrabold">₹{price}</p>
                <p className="text-[10px] text-green-500 mt-0.5">{seats} available</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <p className="px-5 py-4 font-bold text-gray-800 border-b border-gray-100 text-sm flex items-center gap-2"><Info size={14} className="text-orange-500"/>Station Schedule</p>
          <div className="divide-y divide-gray-100">
            {STOPS.map((s, i) => (
              <div key={s.station} className="flex items-center gap-4 px-5 py-4">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-3 h-3 rounded-full border-2 ${i===0||i===STOPS.length-1?"bg-orange-500 border-orange-500":"bg-white border-orange-300"}`}/>
                  {i < STOPS.length - 1 && <div className="w-px h-8 bg-orange-100"/>}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-sm">{s.station}</p>
                  <p className="text-xs text-gray-400">{s.dist}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="text-gray-400">Arr: <span className="font-semibold text-gray-700">{s.arr}</span></p>
                  <p className="text-gray-400">Dep: <span className="font-semibold text-gray-700">{s.dep}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => navigate("/passengers")}
          className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all text-sm">
          <Zap size={16}/> Book This Train
        </button>
      </div>
    </div>
  );
}