import { useLocation, useNavigate } from "react-router-dom";
import { Train, Download, Share2, CheckCircle2, MapPin, Clock, Users, IndianRupee, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, selectedClass, passengers = [{ name:"Traveller", age:25, gender:"Male", berth:"Lower" }], contact = {}, total = 980 } = location.state || {};

  const pnr = "PNR" + Math.floor(Math.random() * 9000000000 + 1000000000);
  const bookingId = "BK" + Date.now();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Success banner */}
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
          className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={36} className="text-green-500"/>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Booking Confirmed!</h1>
          <p className="text-gray-400 text-sm mt-1">Your ticket has been booked successfully.</p>
        </motion.div>

        {/* Ticket card */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Top */}
          <div className="bg-[#0A1628] px-6 py-5 text-white">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Train size={18} className="text-orange-400"/>
                <span className="font-bold">{train?.name || "Vande Bharat Express"}</span>
              </div>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-1 rounded-full">#{train?.number || "22436"}</span>
            </div>
            <p className="text-blue-300 text-xs">PNR: <span className="font-bold text-white font-mono">{pnr}</span></p>
          </div>

          {/* Route */}
          <div className="px-6 py-5 border-b border-dashed border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-extrabold text-gray-900">{train?.dep || "06:00"}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin size={10}/>New Delhi</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={9}/>{train?.duration || "3h 30m"}</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full border-2 border-orange-400"/>
                  <div className="w-16 h-px bg-orange-300"/>
                  <Train size={12} className="text-orange-500"/>
                  <div className="w-16 h-px bg-orange-300"/>
                  <div className="w-2 h-2 rounded-full bg-orange-400"/>
                </div>
                <p className="text-[10px] text-orange-500 font-semibold">{selectedClass || "3A"}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-gray-900">{train?.arr || "09:30"}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1 justify-end mt-0.5"><MapPin size={10}/>Chandigarh</p>
              </div>
            </div>
          </div>

          {/* Passengers */}
          <div className="px-6 py-4 border-b border-dashed border-gray-200">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5"><Users size={12}/>Passengers</p>
            <div className="space-y-2">
              {passengers.map((p, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.age} yrs · {p.gender}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-orange-500">{p.berth || "No Preference"}</p>
                    <p className="text-xs text-gray-400">Berth</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fare */}
          <div className="px-6 py-4 border-b border-dashed border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><IndianRupee size={12}/>Total Paid</p>
              <p className="text-xl font-extrabold text-green-600">₹{total.toLocaleString()}</p>
            </div>
            <p className="text-xs text-green-500 mt-1 text-right">Payment Successful ✓</p>
          </div>

          {/* Booking ID */}
          <div className="px-6 py-4 bg-gray-50">
            <p className="text-xs text-gray-400">Booking ID</p>
            <p className="font-bold text-gray-700 font-mono text-sm">{bookingId}</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
          className="flex gap-3 mt-5">
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-all">
            <Download size={15}/> Download
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-all">
            <Share2 size={15}/> Share
          </button>
          <button onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-sm transition-all active:scale-95">
            <Home size={15}/> Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}