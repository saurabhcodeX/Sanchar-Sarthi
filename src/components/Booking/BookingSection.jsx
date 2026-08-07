import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navigation, MapPin, ArrowLeftRight, Calendar, Users,
  ChevronDown, Search, Plane, Train, Hotel, Bus,
  Shield, RefreshCw, Headphones, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchStations } from "../../data/stations";
import { searchAirports } from "../../data/airports";

const TABS = [
  { id: "trains",  label: "Trains",  icon: Train,  accent: "#2563EB" },
  { id: "flights", label: "Flights", icon: Plane,   accent: "#0EA5E9" },
  { id: "hotels",  label: "Hotels",  icon: Hotel,   accent: "#10B981" },
  { id: "buses",   label: "Buses",   icon: Bus,     accent: "#8B5CF6" },
];

const TRAIN_CLASSES  = ["All Classes","Sleeper","3 Tier AC","2 Tier AC","First AC","Chair Car"];
const FLIGHT_CLASSES = ["Economy","Business","First"];

function todayISO()    { return new Date().toISOString().split("T")[0]; }
function tomorrowISO() { const d = new Date(); d.setDate(d.getDate()+1); return d.toISOString().split("T")[0]; }

/* ── Shared field wrapper ── */
function Field({ label, children }) {
  return (
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      {children}
    </div>
  );
}

/* ── Input with autocomplete ── */
function AutoInput({ value, onChange, onFocus, onBlur, placeholder, icon: Icon, suggestions, showList, onSelect }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2.5 border-2 border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 focus-within:bg-white focus-within:border-blue-500 focus-within:shadow-[0_0_0_4px_rgba(37,99,235,0.08)] transition-all">
        <Icon size={16} className="text-gray-400 shrink-0" />
        <input value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur}
          placeholder={placeholder}
          className="w-full outline-none text-sm font-semibold text-gray-800 placeholder:text-gray-300 bg-transparent" />
      </div>
      {showList && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2 max-h-52 overflow-auto">
          {suggestions.map((s) => (
            <button key={s.code} onClick={() => onSelect(s)}
              className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 transition-colors">
              <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg shrink-0">{s.code}</span>
              <span className="text-sm text-gray-700 truncate">{s.name || s.city}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Date input ── */
function DateInput({ label, value, min, onChange }) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2.5 border-2 border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 focus-within:bg-white focus-within:border-blue-500 focus-within:shadow-[0_0_0_4px_rgba(37,99,235,0.08)] transition-all">
        <Calendar size={15} className="text-gray-400 shrink-0 pointer-events-none" />
        <input type="date" value={value} min={min} onChange={onChange}
          className="w-full outline-none text-sm font-semibold text-gray-800 bg-transparent cursor-pointer" />
      </div>
    </Field>
  );
}

/* ── Dropdown ── */
function Dropdown({ label, value, options, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <Field label={label}>
      <div className="relative">
        <button onClick={() => setOpen(v => !v)}
          className="w-full flex items-center gap-2.5 border-2 border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 hover:bg-white hover:border-blue-400 focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)] transition-all">
          <span className="text-sm font-semibold text-gray-800 flex-1 text-left truncate">{value}</span>
          <ChevronDown size={14} className={`text-gray-400 transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2">
            {options.map(o => (
              <button key={o} onClick={() => { onSelect(o); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${value === o ? "text-blue-600 font-bold" : "text-gray-700"}`}>
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    </Field>
  );
}

/* ── Search button ── */
function SearchBtn({ onClick }) {
  return (
    <button onClick={onClick}
      className="shrink-0 self-end bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black px-7 py-3 rounded-2xl flex items-center gap-2 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all text-sm">
      <Search size={16} strokeWidth={2.5} /> Search
    </button>
  );
}

/* ── Special fares + cancellation row ── */
function BottomRow({ fares = [] }) {
  const [selected, setSelected] = useState(null);
  const [cancel, setCancel] = useState(false);

  return (
    <div className="mt-4 space-y-3">
      {fares.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Special Fares:</span>
          {fares.map(f => (
            <button key={f} onClick={() => setSelected(selected === f ? null : f)}
              className={`px-3.5 py-1 rounded-full border text-xs font-semibold transition-all hover:scale-105 ${
                selected === f ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600"
              }`}>{f}</button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl px-4 py-2.5 border border-blue-100">
        <label className="flex items-center gap-2 cursor-pointer shrink-0">
          <input type="checkbox" checked={cancel} onChange={e => setCancel(e.target.checked)} className="w-4 h-4 accent-blue-600 rounded" />
          <span className="text-xs font-semibold text-gray-700">Free Cancellation</span>
        </label>
        <div className="hidden sm:flex items-center gap-4 ml-auto">
          {[[Shield,"₹0 fee"],[RefreshCw,"Instant refund"],[Headphones,"Priority support"]].map(([Icon,label]) => (
            <span key={label} className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
              <Icon size={11} className="text-blue-400" />{label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── TRAIN FORM ── */
function TrainForm() {
  const navigate = useNavigate();
  const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const [date, setDate] = useState(todayISO()); const [cls, setCls] = useState("All Classes");
  const [fromS, setFromS] = useState([]); const [toS, setToS] = useState([]);
  const [showFrom, setShowFrom] = useState(false); const [showTo, setShowTo] = useState(false);

  const swap = () => { setFrom(to); setTo(from); };
  const search = () => {
    if (!from || !to) { alert("Fill origin and destination."); return; }
    navigate(`/results?${new URLSearchParams({from,to,date,class:cls})}`);
  };

  return (
    <>
      <div className="flex items-end gap-3 flex-wrap lg:flex-nowrap">
        <Field label="From">
          <AutoInput value={from} placeholder="Origin station" icon={Navigation}
            suggestions={fromS} showList={showFrom}
            onChange={e => { setFrom(e.target.value); setFromS(searchStations(e.target.value)); setShowFrom(true); }}
            onFocus={() => setShowFrom(true)} onBlur={() => setTimeout(() => setShowFrom(false), 150)}
            onSelect={s => { setFrom(`${s.name} (${s.code})`); setShowFrom(false); }} />
        </Field>

        <button onClick={swap} className="self-end mb-0.5 w-10 h-10 rounded-2xl border-2 border-gray-100 bg-white flex items-center justify-center text-blue-500 hover:bg-blue-50 hover:border-blue-300 hover:rotate-180 transition-all duration-300 shrink-0">
          <ArrowLeftRight size={15} />
        </button>

        <Field label="To">
          <AutoInput value={to} placeholder="Destination station" icon={MapPin}
            suggestions={toS} showList={showTo}
            onChange={e => { setTo(e.target.value); setToS(searchStations(e.target.value)); setShowTo(true); }}
            onFocus={() => setShowTo(true)} onBlur={() => setTimeout(() => setShowTo(false), 150)}
            onSelect={s => { setTo(`${s.name} (${s.code})`); setShowTo(false); }} />
        </Field>

        <DateInput label="Date" value={date} min={todayISO()} onChange={e => setDate(e.target.value)} />
        <Dropdown label="Class" value={cls} options={TRAIN_CLASSES} onSelect={setCls} />
        <SearchBtn onClick={search} />
      </div>
      <BottomRow fares={["Ladies","Tatkal","Premium Tatkal"]} />
    </>
  );
}

/* ── FLIGHT FORM ── */
function FlightForm() {
  const navigate = useNavigate();
  const [trip, setTrip] = useState("One Way");
  const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const [dep, setDep] = useState(todayISO()); const [ret, setRet] = useState(tomorrowISO());
  const [travellers, setTravellers] = useState(1); const [cls, setCls] = useState("Economy");
  const [fromS, setFromS] = useState([]); const [toS, setToS] = useState([]);
  const [showFrom, setShowFrom] = useState(false); const [showTo, setShowTo] = useState(false);
  const [showT, setShowT] = useState(false);

  const swap = () => { setFrom(to); setTo(from); };
  const search = () => {
    if (!from || !to) { alert("Fill origin and destination."); return; }
    navigate(`/flights?${new URLSearchParams({from,to,date:dep,class:cls,passengers:travellers})}`);
  };

  return (
    <>
      <div className="flex gap-2 mb-4">
        {["One Way","Round Trip"].map(t => (
          <button key={t} onClick={() => setTrip(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
              trip === t ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-100 text-gray-400 hover:border-gray-200"
            }`}>{t}</button>
        ))}
      </div>

      <div className="flex items-end gap-3 flex-wrap lg:flex-nowrap">
        <Field label="From">
          <AutoInput value={from} placeholder="Departure city" icon={Navigation}
            suggestions={fromS} showList={showFrom}
            onChange={e => { setFrom(e.target.value); setFromS(searchAirports(e.target.value)); setShowFrom(true); }}
            onFocus={() => setShowFrom(true)} onBlur={() => setTimeout(() => setShowFrom(false), 150)}
            onSelect={a => { setFrom(`${a.city} (${a.code})`); setShowFrom(false); }} />
        </Field>

        <button onClick={swap} className="self-end mb-0.5 w-10 h-10 rounded-2xl border-2 border-gray-100 bg-white flex items-center justify-center text-blue-500 hover:bg-blue-50 hover:border-blue-300 hover:rotate-180 transition-all duration-300 shrink-0">
          <ArrowLeftRight size={15} />
        </button>

        <Field label="To">
          <AutoInput value={to} placeholder="Arrival city" icon={MapPin}
            suggestions={toS} showList={showTo}
            onChange={e => { setTo(e.target.value); setToS(searchAirports(e.target.value)); setShowTo(true); }}
            onFocus={() => setShowTo(true)} onBlur={() => setTimeout(() => setShowTo(false), 150)}
            onSelect={a => { setTo(`${a.city} (${a.code})`); setShowTo(false); }} />
        </Field>

        <DateInput label="Departure" value={dep} min={todayISO()} onChange={e => setDep(e.target.value)} />
        {trip === "Round Trip" && <DateInput label="Return" value={ret} min={dep} onChange={e => setRet(e.target.value)} />}

        <Field label="Travellers & Class">
          <div className="relative">
            <button onClick={() => setShowT(v => !v)}
              className="w-full flex items-center gap-2.5 border-2 border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 hover:bg-white hover:border-blue-400 transition-all">
              <Users size={15} className="text-gray-400 shrink-0" />
              <span className="text-sm font-semibold text-gray-800 flex-1 text-left truncate">{travellers} · {cls}</span>
              <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform ${showT ? "rotate-180" : ""}`} />
            </button>
            {showT && (
              <div className="absolute top-full left-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-4 min-w-[220px]">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Travellers</p>
                <div className="flex items-center gap-3 mb-4">
                  <button onClick={() => travellers > 1 && setTravellers(t => t-1)} className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-blue-100 font-bold text-sm transition-colors">−</button>
                  <span className="font-bold text-gray-800 w-4 text-center">{travellers}</span>
                  <button onClick={() => travellers < 9 && setTravellers(t => t+1)} className="w-8 h-8 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-sm transition-colors">+</button>
                </div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Class</p>
                {FLIGHT_CLASSES.map(c => (
                  <button key={c} onClick={() => { setCls(c); setShowT(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-blue-50 transition-colors ${cls === c ? "text-blue-600 font-bold bg-blue-50" : "text-gray-700"}`}>{c}</button>
                ))}
              </div>
            )}
          </div>
        </Field>

        <SearchBtn onClick={search} />
      </div>
      <BottomRow fares={["Student","Senior Citizen","Armed Forces"]} />
    </>
  );
}

/* ── HOTEL FORM ── */
function HotelForm() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState(todayISO()); const [checkOut, setCheckOut] = useState(tomorrowISO());
  const [rooms, setRooms] = useState(1); const [guests, setGuests] = useState(2);
  const [showRG, setShowRG] = useState(false);

  const search = () => {
    if (!city) { alert("Enter a city."); return; }
    navigate(`/hotels?${new URLSearchParams({city,checkIn,checkOut,rooms,guests})}`);
  };

  return (
    <>
      <div className="flex items-end gap-3 flex-wrap lg:flex-nowrap">
        <div className="flex-[2] min-w-[200px]">
          <Field label="City / Hotel / Area">
            <div className="flex items-center gap-2.5 border-2 border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 focus-within:bg-white focus-within:border-blue-500 focus-within:shadow-[0_0_0_4px_rgba(37,99,235,0.08)] transition-all">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Mumbai, Goa, Delhi"
                className="w-full outline-none text-sm font-semibold text-gray-800 placeholder:text-gray-300 bg-transparent" />
            </div>
          </Field>
        </div>

        <DateInput label="Check In"  value={checkIn}  min={todayISO()} onChange={e => { setCheckIn(e.target.value); if (e.target.value >= checkOut) setCheckOut(e.target.value); }} />
        <DateInput label="Check Out" value={checkOut} min={checkIn}    onChange={e => setCheckOut(e.target.value)} />

        <Field label="Rooms & Guests">
          <div className="relative">
            <button onClick={() => setShowRG(v => !v)}
              className="w-full flex items-center gap-2.5 border-2 border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 hover:bg-white hover:border-blue-400 transition-all">
              <Users size={15} className="text-gray-400 shrink-0" />
              <span className="text-sm font-semibold text-gray-800 flex-1 text-left">{rooms} Room · {guests} Guest{guests > 1 ? "s" : ""}</span>
              <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform ${showRG ? "rotate-180" : ""}`} />
            </button>
            {showRG && (
              <div className="absolute top-full left-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-4 min-w-[200px]">
                {[["Rooms", rooms, setRooms, 5],["Guests", guests, setGuests, 9]].map(([label, val, setter, max]) => (
                  <div key={label} className="flex items-center justify-between mb-3 last:mb-0">
                    <span className="text-sm font-semibold text-gray-700">{label}</span>
                    <div className="flex items-center gap-2.5">
                      <button onClick={() => val > 1 && setter(v => v-1)} className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-blue-100 font-bold text-sm transition-colors">−</button>
                      <span className="font-bold text-gray-800 w-4 text-center">{val}</span>
                      <button onClick={() => val < max && setter(v => v+1)} className="w-8 h-8 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-sm transition-colors">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Field>

        <SearchBtn onClick={search} />
      </div>
      <BottomRow />
    </>
  );
}

/* ── BUS PLACEHOLDER ── */
function BusForm() {
  return (
    <div className="py-10 text-center">
      <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-3">
        <Bus size={24} className="text-purple-400" />
      </div>
      <p className="font-bold text-gray-600">Bus booking coming soon</p>
      <p className="text-sm text-gray-400 mt-1">We're working on it — check back shortly</p>
    </div>
  );
}

/* ── MAIN EXPORT ── */
export default function BookingSection() {
  const [active, setActive] = useState("trains");
  const FORMS = { trains: TrainForm, flights: FlightForm, hotels: HotelForm, buses: BusForm };
  const ActiveForm = FORMS[active];
  const activeTab = TABS.find(t => t.id === active);

  return (
    <div className="relative z-20 -mt-6 px-4 md:px-8 pb-14">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.10)] overflow-visible border border-gray-100/80">

          {/* Tab bar */}
          <div className="flex border-b border-gray-100 px-2 pt-1.5 gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map(({ id, label, icon: Icon, accent }) => (
              <button key={id} onClick={() => setActive(id)}
                className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-bold whitespace-nowrap transition-all rounded-t-xl ${
                  active === id ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}>
                <Icon size={16} style={{ color: active === id ? accent : undefined }} />
                {label}
                {active === id && (
                  <motion.div layoutId="tab-line"
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                    style={{ backgroundColor: accent }} />
                )}
              </button>
            ))}

            {/* Live badge */}
            <div className="ml-auto self-center pr-4 shrink-0">
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> LIVE PRICES
              </span>
            </div>
          </div>

          {/* Form area */}
          <div className="px-6 py-6">
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}>
                <ActiveForm />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}