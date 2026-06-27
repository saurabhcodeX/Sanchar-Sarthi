import { motion } from "framer-motion";
import { ArrowRight, Clock, IndianRupee, Zap } from "lucide-react";

const ROUTES = [
  {
    from: "New Delhi",
    fromCode: "NDLS",
    to: "Mumbai Central",
    toCode: "BCT",
    duration: "15h 55m",
    trains: 18,
    fromPrice: 455,
    badge: "Most Popular",
    badgeColor: "bg-orange-100 text-orange-600",
    highlight: true,
  },
  {
    from: "New Delhi",
    fromCode: "NDLS",
    to: "Chandigarh",
    toCode: "CDG",
    duration: "3h 30m",
    trains: 24,
    fromPrice: 180,
    badge: "Fast Route",
    badgeColor: "bg-blue-100 text-blue-600",
    highlight: false,
  },
  {
    from: "Chennai Central",
    fromCode: "MAS",
    to: "Bangalore City",
    toCode: "SBC",
    duration: "5h 10m",
    trains: 16,
    fromPrice: 210,
    badge: "Daily Trains",
    badgeColor: "bg-green-100 text-green-600",
    highlight: false,
  },
  {
    from: "Kolkata Howrah",
    fromCode: "HWH",
    to: "Patna Jn",
    toCode: "PNBE",
    duration: "6h 45m",
    trains: 20,
    fromPrice: 245,
    badge: null,
    badgeColor: "",
    highlight: false,
  },
  {
    from: "Lucknow",
    fromCode: "LKO",
    to: "New Delhi",
    toCode: "NDLS",
    duration: "6h 20m",
    trains: 14,
    fromPrice: 275,
    badge: "Vande Bharat",
    badgeColor: "bg-purple-100 text-purple-600",
    highlight: false,
  },
  {
    from: "Ahmedabad",
    fromCode: "ADI",
    to: "Mumbai Central",
    toCode: "BCT",
    duration: "7h 15m",
    trains: 12,
    fromPrice: 320,
    badge: null,
    badgeColor: "",
    highlight: false,
  },
];

export default function PopularRoutes() {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2 block">
              Trending
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Popular Routes
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              Most booked train routes across India — updated daily
            </p>
          </div>
          <button className="self-start md:self-auto flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
            View all routes <ArrowRight size={15} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROUTES.map((route, i) => (
            <motion.div
              key={`${route.fromCode}-${route.toCode}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`group relative bg-white rounded-2xl border overflow-hidden cursor-pointer transition-shadow hover:shadow-lg ${
                route.highlight
                  ? "border-orange-200 shadow-[0_0_0_1px_rgba(249,115,22,0.2)]"
                  : "border-gray-100"
              }`}
            >
              {/* Top strip */}
              <div className={`h-1 w-full ${route.highlight ? "bg-orange-500" : "bg-gray-100"}`} />

              <div className="p-5">
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  {route.badge ? (
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${route.badgeColor}`}>
                      {route.badge}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="text-[10px] text-gray-400 font-medium">
                    {route.trains} trains/day
                  </span>
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-gray-900 text-base leading-tight truncate">
                      {route.from}
                    </p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{route.fromCode}</p>
                  </div>

                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <div className="w-10 h-px bg-gray-200 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-500 group-hover:opacity-100 opacity-0 transition-opacity" />
                      </div>
                      <ArrowRight size={13} className="text-orange-400" />
                    </div>
                    <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                      <Clock size={9} /> {route.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 text-right">
                    <p className="font-extrabold text-gray-900 text-base leading-tight truncate">
                      {route.to}
                    </p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{route.toCode}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Starts from</p>
                    <p className="font-bold text-gray-900 flex items-center gap-0.5 mt-0.5">
                      <IndianRupee size={13} className="text-orange-500" />
                      {route.fromPrice}
                    </p>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl transition-all active:scale-95">
                    <Zap size={12} />
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}