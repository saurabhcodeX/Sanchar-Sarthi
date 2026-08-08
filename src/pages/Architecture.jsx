import { motion } from "framer-motion";
import { ArrowRight, Database, Globe, Cpu, Lock, Zap, Server, GitBranch } from "lucide-react";

const layers = [
  {
    title: "Frontend Layer",
    color: "from-blue-500 to-blue-600",
    icon: Globe,
    items: ["React + Vite (SPA)", "Tailwind CSS", "Framer Motion", "React Router DOM", "Axios / Fetch"],
  },
  {
    title: "AI Recommendation Engine",
    color: "from-purple-500 to-purple-600",
    icon: Cpu,
    items: ["Train Success Scorer", "Success Probability Calculator", "Payment Method Optimizer", "Boarding Station Advisor", "Backup Plan Generator"],
  },
  {
    title: "Backend API Layer",
    color: "from-green-500 to-green-600",
    icon: Server,
    items: ["Spring Boot REST API", "JWT Authentication", "Spring Security", "Vercel Serverless (current)", "RAPIDAPI Proxy"],
  },
  {
    title: "Concurrency & Queue",
    color: "from-orange-500 to-orange-600",
    icon: Lock,
    items: ["Redis Queue (admission control)", "SETNX Seat Locks (TTL 300s)", "Batch admission (10 users/sec)", "WebSocket live updates", "Kafka event streaming"],
  },
  {
    title: "Data Layer",
    color: "from-red-500 to-red-600",
    icon: Database,
    items: ["MySQL (bookings, users)", "Redis (queue, locks, cache)", "Mock JSON (current MVP)", "Booking history analytics", "Payment stats tracking"],
  },
];

const flow = [
  { step: "User searches", desc: "Enters route + date" },
  { step: "AI scores trains", desc: "Weighted success ranking" },
  { step: "User selects", desc: "Picks train + class" },
  { step: "Queue admission", desc: "Redis waitlist (Tatkal)" },
  { step: "Seat lock", desc: "SETNX TTL 300s" },
  { step: "Payment", desc: "AI recommends UPI" },
  { step: "Booking confirmed", desc: "MySQL + PNR generated" },
  { step: "Backup triggered", desc: "If failure — AI suggests alternate" },
];

export default function Architecture() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">System Design</p>
        <h1 className="text-3xl font-black text-[#0A1628] mb-2">Platform Architecture</h1>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          Sanchar Sarthi is built as a scalable, AI-powered booking intelligence platform designed for high-concurrency Tatkal booking scenarios.
        </p>
      </div>

      {/* Layer cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {layers.map(({ title, color, icon: Icon, items }, i) => (
          <motion.div key={title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className={`bg-gradient-to-r ${color} px-4 py-3 flex items-center gap-2`}>
              <Icon size={16} className="text-white" />
              <span className="text-white font-bold text-sm">{title}</span>
            </div>
            <ul className="p-4 space-y-1.5">
              {items.map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Booking flow */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="font-black text-[#0A1628] mb-5 flex items-center gap-2">
          <GitBranch size={18} className="text-orange-500" /> Tatkal Booking Flow
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {flow.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-center min-w-[90px]">
                <p className="text-[10px] font-black text-[#0A1628]">{f.step}</p>
                <p className="text-[9px] text-gray-400 mt-0.5">{f.desc}</p>
              </div>
              {i < flow.length - 1 && <ArrowRight size={14} className="text-orange-400 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Redis concurrency explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-orange-500" />
            <h3 className="font-bold text-orange-800 text-sm">Redis Queue Logic</h3>
          </div>
          <div className="space-y-2 text-xs text-orange-700">
            <p><strong>Problem:</strong> 50,000+ users hit "Book" simultaneously at 10 AM when Tatkal opens.</p>
            <p><strong>Solution:</strong> Redis-based admission queue — users enter a waitlist and are admitted in controlled batches of 10/second.</p>
            <p><strong>Code:</strong> <code className="bg-orange-100 px-1 rounded">LPUSH queue:{"{trainId}"} userId</code></p>
            <p><strong>Result:</strong> Server never overloads, fair ordering maintained.</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={16} className="text-blue-500" />
            <h3 className="font-bold text-blue-800 text-sm">Seat Lock (SETNX)</h3>
          </div>
          <div className="space-y-2 text-xs text-blue-700">
            <p><strong>Problem:</strong> Two users book the same seat simultaneously — race condition.</p>
            <p><strong>Solution:</strong> Redis distributed lock with 300s TTL. Only first user gets the lock.</p>
            <p><strong>Code:</strong> <code className="bg-blue-100 px-1 rounded">SETNX seat:{"{id}"} userId EX 300</code></p>
            <p><strong>Result:</strong> Seat held exclusively during payment — no double booking.</p>
          </div>
        </div>
      </div>
    </div>
  );
}