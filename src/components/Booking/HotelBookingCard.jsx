import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function todayISO() { return new Date().toISOString().split("T")[0]; }
function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export default function HotelBookingCard() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState(todayISO());
  const [checkOut, setCheckOut] = useState(tomorrowISO());
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    if (!city) { alert("Please enter a city."); return; }
    const params = new URLSearchParams({ city, checkIn, checkOut, rooms, guests });
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6"
    >
      <div className="mb-4">
        <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">City / Area / Hotel Name</label>
        <div className="flex items-center gap-2 border-2 border-[#0A1A4F] rounded-lg px-3 py-2.5 focus-within:border-orange-500">
          <MapPin size={15} className="text-[#0A1A4F] shrink-0" />
          <input value={city} onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Mumbai, New Delhi, Goa"
            className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div>
          <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">Check In</label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-orange-500">
            <Calendar size={14} className="text-gray-400 shrink-0 pointer-events-none" />
            <input type="date" value={checkIn} min={todayISO()}
              onChange={(e) => { setCheckIn(e.target.value); if (e.target.value >= checkOut) setCheckOut(e.target.value); }}
              className="w-full outline-none text-sm text-gray-800 bg-transparent cursor-pointer" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">Check Out</label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-orange-500">
            <Calendar size={14} className="text-gray-400 shrink-0 pointer-events-none" />
            <input type="date" value={checkOut} min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full outline-none text-sm text-gray-800 bg-transparent cursor-pointer" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">Rooms</label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5">
            <Users size={14} className="text-gray-400 shrink-0" />
            <select value={rooms} onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full outline-none text-sm text-gray-800 bg-transparent cursor-pointer">
              {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} Room{n > 1 ? "s" : ""}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0A1A4F] mb-1">Guests</label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5">
            <Users size={14} className="text-gray-400 shrink-0" />
            <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full outline-none text-sm text-gray-800 bg-transparent cursor-pointer">
              {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>)}
            </select>
          </div>
        </div>
      </div>

      <button onClick={handleSearch}
        className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] transition-all text-white font-bold text-sm py-3.5 rounded-full shadow-lg shadow-orange-500/30">
        Search Hotels
      </button>
    </motion.div>
  );
}