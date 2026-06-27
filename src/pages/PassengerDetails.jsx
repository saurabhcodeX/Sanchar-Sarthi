import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Phone, ChevronLeft, Plus, Trash2, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const BERTHS = ["Lower", "Middle", "Upper", "Side Lower", "Side Upper"];

function Field({ label, value, onChange, type = "text", error, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all bg-gray-50 focus:bg-white focus:border-orange-400 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] ${error ? "border-red-300" : "border-gray-200"}`}/>
      {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11}/>{error}</p>}
    </div>
  );
}

const emptyPassenger = () => ({ name: "", age: "", gender: "Male", berth: "No Preference" });

export default function PassengerDetails() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { train, selectedClass } = location.state || {};

  const [passengers, setPassengers] = useState([emptyPassenger()]);
  const [contact, setContact] = useState({ mobile: "", email: "" });
  const [errors, setErrors]   = useState({});

  function updatePassenger(i, key, val) {
    setPassengers(ps => ps.map((p, idx) => idx === i ? { ...p, [key]: val } : p));
  }

  function addPassenger() {
    if (passengers.length < 6) setPassengers(ps => [...ps, emptyPassenger()]);
  }

  function removePassenger(i) {
    setPassengers(ps => ps.filter((_, idx) => idx !== i));
  }

  function validate() {
    const e = {};
    passengers.forEach((p, i) => {
      if (!p.name.trim()) e[`name_${i}`] = "Name is required.";
      if (!p.age || p.age < 1 || p.age > 120) e[`age_${i}`] = "Valid age required.";
    });
    if (!/^\d{10}$/.test(contact.mobile)) e.mobile = "Valid 10-digit mobile required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = "Valid email required.";
    return e;
  }

  function handleContinue() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    navigate("/payment", { state: { train, selectedClass, passengers, contact } });
  }

  const price = train?.price?.[selectedClass] || 945;
  const total = price * passengers.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0A1628] text-white px-6 py-5">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-blue-300 hover:text-white text-xs mb-3 transition-colors">
            <ChevronLeft size={14}/> Back to Results
          </button>
          <h1 className="text-xl font-extrabold">Passenger Details</h1>
          {train && (
            <p className="text-blue-300 text-sm mt-1">
              {train.name} · {train.dep} → {train.arr} · {selectedClass}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* Progress */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          {["Passengers", "Payment", "Confirmation"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-400"}`}>{i+1}</div>
              <span className={i === 0 ? "text-orange-500" : "text-gray-400"}>{step}</span>
              {i < 2 && <div className="w-8 h-px bg-gray-200"/>}
            </div>
          ))}
        </div>

        {/* Passenger forms */}
        {passengers.map((p, i) => (
          <motion.div key={i} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <User size={15} className="text-orange-500"/>
                </div>
                <span className="font-bold text-gray-800 text-sm">Passenger {i + 1}</span>
              </div>
              {passengers.length > 1 && (
                <button onClick={() => removePassenger(i)} className="text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={15}/>
                </button>
              )}
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field label="Full Name (as on ID)" value={p.name}
                  onChange={e => updatePassenger(i, "name", e.target.value)}
                  placeholder="Enter full name" error={errors[`name_${i}`]}/>
              </div>
              <Field label="Age" value={p.age} type="number"
                onChange={e => updatePassenger(i, "age", e.target.value)}
                placeholder="Age" error={errors[`age_${i}`]}/>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Gender</label>
                <select value={p.gender} onChange={e => updatePassenger(i, "gender", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium outline-none bg-gray-50 focus:bg-white focus:border-orange-400">
                  {["Male","Female","Other"].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Berth Preference</label>
                <div className="flex flex-wrap gap-2">
                  {["No Preference", ...BERTHS].map(b => (
                    <button key={b} onClick={() => updatePassenger(i, "berth", b)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${p.berth === b ? "bg-orange-500 text-white border-orange-500" : "bg-gray-50 border-gray-200 text-gray-500 hover:border-orange-300"}`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {passengers.length < 6 && (
          <button onClick={addPassenger}
            className="w-full border-2 border-dashed border-gray-200 hover:border-orange-300 rounded-2xl py-4 text-sm font-semibold text-gray-400 hover:text-orange-500 flex items-center justify-center gap-2 transition-all">
            <Plus size={16}/> Add Passenger
          </button>
        )}

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Phone size={16} className="text-orange-500"/>Contact Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Mobile Number" value={contact.mobile}
              onChange={e => setContact(c => ({...c, mobile: e.target.value}))}
              placeholder="10-digit mobile" error={errors.mobile}/>
            <Field label="Email Address" value={contact.email} type="email"
              onChange={e => setContact(c => ({...c, email: e.target.value}))}
              placeholder="you@email.com" error={errors.email}/>
          </div>
        </div>

        {/* Summary + CTA */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Total Fare</p>
            <p className="text-2xl font-extrabold text-gray-900">₹{total.toLocaleString()}</p>
            <p className="text-xs text-gray-400">{passengers.length} passenger{passengers.length > 1 ? "s" : ""} × ₹{price} ({selectedClass})</p>
          </div>
          <button onClick={handleContinue}
            className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-8 py-3 rounded-xl text-sm flex items-center gap-2 transition-all">
            Proceed to Payment <ArrowRight size={15}/>
          </button>
        </div>
      </div>
    </div>
  );
}