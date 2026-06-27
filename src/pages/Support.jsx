import { useState } from "react";
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from "lucide-react";

const FAQS = [
  { q:"How do I cancel my ticket?",          a:"Go to My Bookings, select the ticket, and click Cancel. Refunds are processed in 5–7 working days." },
  { q:"What is the cancellation charge?",    a:"Cancellation charges vary by class and how early you cancel. SL: ₹60, 3A: ₹180, 2A: ₹200, 1A: ₹240." },
  { q:"How do I check PNR status?",          a:"Click PNR Status in the top navbar and enter your 10-digit PNR number." },
  { q:"Can I change my travel date?",        a:"Date change is not allowed after booking. You must cancel and rebook." },
  { q:"How long does refund take?",          a:"Refunds are credited within 5–7 business days to your original payment method or wallet." },
  { q:"Is the wallet balance refundable?",   a:"Wallet balance can be used for future bookings but is not directly refundable to bank." },
];

function FAQ({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
        <span className="font-semibold text-gray-800 text-sm">{item.q}</span>
        {open ? <ChevronUp size={16} className="text-orange-500 shrink-0"/> : <ChevronDown size={16} className="text-gray-400 shrink-0"/>}
      </button>
      {open && <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{item.a}</div>}
    </div>
  );
}

export default function Support() {
  const [search, setSearch] = useState("");
  const filtered = FAQS.filter(f => f.q.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Help Center</span>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-2">How can we help?</h1>
          <div className="mt-5 flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm max-w-md mx-auto">
            <Search size={16} className="text-gray-400"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for answers..."
              className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-300"/>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          {filtered.map((f,i) => <FAQ key={i} item={f}/>)}
          {filtered.length===0 && <p className="text-center text-gray-400 text-sm py-8">No results found. Try a different search.</p>}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="font-bold text-gray-800 mb-4 text-center">Still need help?</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon:MessageCircle, label:"Live Chat",  sub:"Instant reply", color:"text-blue-500",  bg:"bg-blue-50" },
              { icon:Phone,         label:"Call Us",    sub:"1800-XXX-XXXX", color:"text-green-500", bg:"bg-green-50" },
              { icon:Mail,          label:"Email",      sub:"24hr response", color:"text-orange-500",bg:"bg-orange-50" },
            ].map(c => (
              <button key={c.label} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-orange-300 hover:bg-orange-50/30 transition-all">
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <c.icon size={18} className={c.color}/>
                </div>
                <p className="font-bold text-gray-800 text-xs">{c.label}</p>
                <p className="text-[10px] text-gray-400">{c.sub}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}