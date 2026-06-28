import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { CreditCard, Smartphone, Building2, Wallet, ChevronLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getBookingById, confirmPayment } from "../services/bookingService";
import { getTrainById } from "../services/trainService";
import Loader from "../components/Common/Loader";

const METHODS = [
  { id: "upi",  label: "UPI",          icon: Smartphone,  desc: "PhonePe, GPay, Paytm, BHIM" },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
  { id: "nb",   label: "Net Banking",  icon: Building2,   desc: "All major banks supported" },
  { id: "wallet", label: "Wallet",     icon: Wallet,      desc: "Paytm, Mobikwik, Amazon Pay" },
];

const BANKS = ["SBI","HDFC","ICICI","Axis","Kotak","PNB","BOB","IDBI"];

export default function Payment() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  // Data: prefer location.state (fast path), fallback to bookingService (refresh-safe path)
  const [train, setTrain]               = useState(location.state?.train || null);
  const [selectedClass, setSelectedClass] = useState(location.state?.selectedClass || null);
  const [passengers, setPassengers]       = useState(location.state?.passengers || []);
  const [contact, setContact]             = useState(location.state?.contact || {});
  const [fetching, setFetching]           = useState(!location.state);
  const [fetchError, setFetchError]       = useState(null);

  const [method, setMethod]   = useState("upi");
  const [upiId, setUpiId]     = useState("");
  const [card, setCard]       = useState({ number:"", name:"", expiry:"", cvv:"" });
  const [bank, setBank]       = useState("SBI");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (location.state || !bookingId) {
      setFetching(false);
      return;
    }
    getBookingById(bookingId)
      .then(async (booking) => {
        setSelectedClass(booking.travelClass);
        setPassengers(booking.passengers);
        setContact(booking.contact);
        const t = await getTrainById(booking.trainId);
        setTrain(t);
      })
      .catch((err) => setFetchError(err.message || "Booking not found."))
      .finally(() => setFetching(false));
  }, [bookingId, location.state]);

  const price = train?.price?.[selectedClass] || 0;
  const base  = price * (passengers.length || 1);
  const convenience = 35;
  const gst   = Math.round(base * 0.05);
  const total = base + convenience + gst;

  function validate() {
    if (method === "upi" && !upiId.includes("@")) return "Enter a valid UPI ID (e.g. name@upi)";
    if (method === "card") {
      if (card.number.replace(/\s/g,"").length !== 16) return "Enter a valid 16-digit card number";
      if (!card.name.trim()) return "Enter cardholder name";
      if (!card.expiry.match(/^\d{2}\/\d{2}$/)) return "Enter expiry as MM/YY";
      if (card.cvv.length !== 3) return "Enter 3-digit CVV";
    }
    return "";
  }

  async function handlePay() {
    if (!bookingId) { setError("Missing booking reference."); return; }
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);

    await new Promise(r => setTimeout(r, 2000)); // fake gateway delay

    try {
      await confirmPayment(bookingId, method);
      navigate(`/ticket?bookingId=${bookingId}`, {
        state: { train, selectedClass, passengers, contact, total },
      });
    } catch (e) {
      setError(e.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center py-16 text-red-500" role="alert">
        {fetchError}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0A1628] text-white px-6 py-5">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-blue-300 hover:text-white text-xs mb-3 transition-colors">
            <ChevronLeft size={14}/> Back
          </button>
          <h1 className="text-xl font-extrabold">Secure Payment</h1>
          <p className="text-blue-300 text-sm mt-1 flex items-center gap-1.5"><ShieldCheck size={13}/>256-bit SSL encrypted</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left — payment methods */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold mb-2">
            {["Passengers","Payment","Confirmation"].map((s,i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i===0?"bg-green-500 text-white":i===1?"bg-orange-500 text-white":"bg-gray-200 text-gray-400"}`}>
                  {i===0?<CheckCircle2 size={12}/>:i+1}
                </div>
                <span className={i===1?"text-orange-500":i===0?"text-green-500":"text-gray-400"}>{s}</span>
                {i<2&&<div className="w-8 h-px bg-gray-200"/>}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <p className="px-5 py-4 font-bold text-gray-800 border-b border-gray-100 text-sm">Choose Payment Method</p>
            {METHODS.map(m => (
              <button key={m.id} onClick={() => { setMethod(m.id); setError(""); }}
                className={`w-full flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-0 transition-colors ${method===m.id?"bg-orange-50":"hover:bg-gray-50"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method===m.id?"bg-orange-500 text-white":"bg-gray-100 text-gray-500"}`}>
                  <m.icon size={18}/>
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-bold text-sm ${method===m.id?"text-orange-600":"text-gray-800"}`}>{m.label}</p>
                  <p className="text-xs text-gray-400">{m.desc}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method===m.id?"border-orange-500":"border-gray-300"}`}>
                  {method===m.id&&<div className="w-2 h-2 rounded-full bg-orange-500"/>}
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={method} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.2}}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              {method==="upi" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">UPI ID</label>
                  <input value={upiId} onChange={e=>setUpiId(e.target.value)} placeholder="yourname@upi"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-orange-400 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] bg-gray-50 focus:bg-white"/>
                </div>
              )}
              {method==="card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Card Number</label>
                    <input value={card.number} onChange={e=>setCard(c=>({...c,number:e.target.value.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim()}))}
                      placeholder="1234 5678 9012 3456" maxLength={19}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-orange-400 bg-gray-50 focus:bg-white"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Cardholder Name</label>
                    <input value={card.name} onChange={e=>setCard(c=>({...c,name:e.target.value}))} placeholder="Name on card"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-orange-400 bg-gray-50 focus:bg-white"/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Expiry</label>
                      <input value={card.expiry} onChange={e=>setCard(c=>({...c,expiry:e.target.value}))} placeholder="MM/YY" maxLength={5}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-orange-400 bg-gray-50 focus:bg-white"/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">CVV</label>
                      <input value={card.cvv} onChange={e=>setCard(c=>({...c,cvv:e.target.value.replace(/\D/g,"")}))} placeholder="•••" maxLength={3} type="password"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-orange-400 bg-gray-50 focus:bg-white"/>
                    </div>
                  </div>
                </div>
              )}
              {method==="nb" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Bank</label>
                  <div className="grid grid-cols-4 gap-2">
                    {BANKS.map(b => (
                      <button key={b} onClick={()=>setBank(b)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${bank===b?"bg-orange-500 text-white border-orange-500":"bg-gray-50 border-gray-200 text-gray-600 hover:border-orange-300"}`}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {method==="wallet" && (
                <div className="grid grid-cols-3 gap-3">
                  {["Paytm","PhonePe","Amazon Pay"].map(w => (
                    <button key={w} className="border border-gray-200 hover:border-orange-400 rounded-xl py-3 text-xs font-bold text-gray-600 transition-all hover:bg-orange-50">{w}</button>
                  ))}
                </div>
              )}
              {error && <p className="text-red-500 text-xs flex items-center gap-1"><ShieldCheck size={11}/>{error}</p>}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right — summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-bold text-gray-800 text-sm mb-4">Booking Summary</p>
            {train && (
              <div className="bg-gray-50 rounded-xl p-3 mb-4">
                <p className="font-bold text-gray-800 text-sm">{train.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{train.dep} → {train.arr} · {selectedClass}</p>
              </div>
            )}
            <div className="space-y-2 text-sm">
              {[
                ["Base Fare", `₹${base.toLocaleString()}`],
                ["Convenience Fee", `₹${convenience}`],
                ["GST (5%)", `₹${gst}`],
              ].map(([l,v]) => (
                <div key={l} className="flex justify-between text-gray-500">
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
              <div className="flex justify-between font-extrabold text-gray-900 pt-2 border-t border-gray-100 text-base">
                <span>Total</span><span className="text-orange-600">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button onClick={handlePay} disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all text-sm tracking-wide shadow-sm">
            {loading
              ? <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/><span>Processing...</span></>
              : <><ShieldCheck size={16}/>Pay ₹{total.toLocaleString()}</>}
          </button>
          <p className="text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck size={10}/>Secured by 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}