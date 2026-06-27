import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const upd = k => e => setForm(f => ({...f,[k]:e.target.value}));

  async function handleSubmit(e) {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Get in Touch</span>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Contact Us</h1>
          <p className="text-gray-400 text-sm mt-2">We're here to help with your rail travel needs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            {[
              { icon:Phone,  title:"Phone",    body:"1800-XXX-XXXX", sub:"Mon–Sat, 9AM–6PM" },
              { icon:Mail,   title:"Email",    body:"support@sancharsarthi.in", sub:"Reply within 24hrs" },
              { icon:MapPin, title:"Office",   body:"New Delhi, India", sub:"110001" },
            ].map(c => (
              <div key={c.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <c.icon size={18} className="text-orange-500"/>
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{c.title}</p>
                  <p className="text-xs text-orange-500 font-semibold">{c.body}</p>
                  <p className="text-xs text-gray-400">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {sent ? (
              <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="flex flex-col items-center justify-center h-full py-10 text-center gap-3">
                <CheckCircle2 size={48} className="text-green-500"/>
                <h3 className="text-xl font-extrabold text-gray-900">Message Sent!</h3>
                <p className="text-gray-400 text-sm">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="text-orange-500 font-semibold text-sm hover:underline">Send another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[["name","Name","Your name"],["email","Email","your@email.com"]].map(([k,l,p]) => (
                    <div key={k}>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{l}</label>
                      <input value={form[k]} onChange={upd(k)} placeholder={p} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 bg-gray-50 focus:bg-white"/>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Subject</label>
                  <input value={form.subject} onChange={upd("subject")} placeholder="How can we help?" required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 bg-gray-50 focus:bg-white"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea value={form.message} onChange={upd("message")} rows={5} required placeholder="Describe your issue..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 bg-gray-50 focus:bg-white resize-none"/>
                </div>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all active:scale-95">
                  <Send size={15}/> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}