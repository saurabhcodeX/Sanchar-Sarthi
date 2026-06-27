import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  CreditCard,
  Clock,
  HeadphonesIcon,
  Ticket,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Confirmation",
    desc: "Get your booking confirmed in seconds with real-time seat availability from Indian Railways.",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Payments",
    desc: "Bank-grade encryption on every transaction. Your money and data are always safe with us.",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: CreditCard,
    title: "Best Fare Guarantee",
    desc: "We compare fares across all classes and quotas so you always pay the lowest available price.",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: Clock,
    title: "Live Train Tracking",
    desc: "Track your train's real-time location, platform info, and delay updates — right in the app.",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    desc: "Our rail travel experts are available round the clock for cancellations, refunds, and queries.",
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    icon: Ticket,
    title: "Easy Cancellations",
    desc: "Cancel or modify your booking effortlessly. Refunds processed automatically within 5–7 days.",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

const STATS = [
  { value: "2M+", label: "Tickets Booked" },
  { value: "500+", label: "Train Routes" },
  { value: "98%", label: "On-time Booking" },
  { value: "4.8★", label: "User Rating" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3 block">
            Why Sanchar Sarthi
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            India's smarter way to{" "}
            <span className="text-orange-500">travel by train</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm leading-relaxed">
            Millions of passengers trust Sanchar Sarthi for fast, reliable, and
            hassle-free train bookings across the country.
          </p>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden mb-14 shadow-sm"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white flex flex-col items-center justify-center py-6 px-4"
            >
              <p className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`group p-6 rounded-2xl border ${f.border} bg-white hover:shadow-md transition-all cursor-default`}
            >
              <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon size={20} className={f.color} />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-14 rounded-2xl bg-[#0A1628] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-white font-extrabold text-xl md:text-2xl tracking-tight">
              Ready to book your next journey?
            </p>
            <p className="text-blue-300 text-sm mt-1">
              Join 2 million+ travellers who book smarter with Sanchar Sarthi.
            </p>
          </div>
          <button className="shrink-0 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-bold px-8 py-3.5 rounded-xl text-sm tracking-wide flex items-center gap-2">
            <Zap size={16} />
            Book a Train Now
          </button>
        </motion.div>

      </div>
    </section>
  );
}