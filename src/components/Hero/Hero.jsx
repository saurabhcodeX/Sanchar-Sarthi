import { motion } from "framer-motion";
import {
  ArrowRight,
  Train,
  ShieldCheck,
  MapPin,
  Clock3,
  Star,
  Users,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: "easeOut",
    },
  }),
};

const floating = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const features = [
  {
    icon: ShieldCheck,
    title: "100% Secure Booking",
  },
  {
    icon: Clock3,
    title: "Fast Tatkal Booking",
  },
  {
    icon: MapPin,
    title: "7000+ Railway Stations",
  },
];

const stats = [
  {
    value: "2M+",
    label: "Happy Travelers",
    icon: Users,
  },
  {
    value: "13K+",
    label: "Daily Trains",
    icon: Train,
  },
  {
    value: "7000+",
    label: "Stations",
    icon: MapPin,
  },
  {
    value: "99.9%",
    label: "Success Rate",
    icon: Star,
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-navy)] via-[#12398e] to-[#091d4b]">

      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}

          <div>

            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-white text-sm"
            >
              🚄 India's Smart Railway Booking Platform
            </motion.span>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mt-7 text-white font-black text-5xl lg:text-6xl leading-tight"
            >
              Book Train Tickets

              <span className="block text-orange-400">
                Across India
              </span>

              In Seconds.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="mt-6 text-lg text-blue-100 leading-8 max-w-xl"
            >
              Search trains, compare fares, check seat availability,
              and book tickets with confidence using Sanchar Sarthi.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.6}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/home"
                className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-7 py-4 rounded-xl text-white font-semibold flex items-center gap-2 shadow-lg"
              >
                <Ticket size={20} />
                Book Tickets
              </Link>

              <button className="border border-white/30 hover:bg-white/10 transition-all duration-300 px-7 py-4 rounded-xl text-white font-semibold flex items-center gap-2">
                Explore Routes

                <ArrowRight size={18} />
              </button>
            </motion.div>
                        {/* Features */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.8}
              className="mt-12 grid sm:grid-cols-3 gap-4"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-all duration-300"
                  >
                    <Icon
                      size={28}
                      className="text-orange-400 mb-3"
                    />

                    <h3 className="text-white font-semibold">
                      {feature.title}
                    </h3>
                  </div>
                );
              })}
            </motion.div>

            {/* Stats */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12"
            >
              {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-xl p-5 text-center"
                  >
                    <Icon
                      size={26}
                      className="mx-auto text-orange-500 mb-3"
                    />

                    <h2 className="text-3xl font-bold text-[var(--color-navy)]">
                      {item.value}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>

          </div>

          {/* RIGHT SIDE */}

          <motion.div
            variants={floating}
            animate="animate"
            className="relative hidden lg:flex justify-center"
          >

            {/* Glow */}

            <div className="absolute w-96 h-96 rounded-full bg-orange-400/20 blur-3xl"></div>

            {/* Main Card */}

            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-[420px]">

              {/* Header */}

              <div className="bg-[var(--color-navy)] text-white p-6">

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-sm opacity-80">
                      Premium Express
                    </p>

                    <h2 className="text-2xl font-bold mt-1">
                      Vande Bharat
                    </h2>

                  </div>

                  <Train
                    size={42}
                    className="text-orange-400"
                  />

                </div>

              </div>

              {/* Journey */}

              <div className="p-7 space-y-6">

                <div className="flex justify-between">

                  <div>

                    <p className="text-gray-400 text-sm">
                      FROM
                    </p>

                    <h3 className="font-bold text-lg">
                      New Delhi
                    </h3>

                    <p className="text-sm text-gray-500">
                      06:00 AM
                    </p>

                  </div>

                  <ArrowRight
                    className="text-orange-500 mt-5"
                  />

                  <div className="text-right">

                    <p className="text-gray-400 text-sm">
                      TO
                    </p>

                    <h3 className="font-bold text-lg">
                      Chandigarh
                    </h3>

                    <p className="text-sm text-gray-500">
                      09:30 AM
                    </p>

                  </div>

                </div>

                <div className="border-t border-gray-200 pt-5">

                  <div className="flex justify-between">

                    <div>

                      <p className="text-gray-500">
                        Journey
                      </p>

                      <h3 className="font-semibold">
                        3h 30m
                      </h3>

                    </div>

                    <div>

                      <p className="text-gray-500">
                        Seats
                      </p>

                      <h3 className="text-green-600 font-bold">
                        Available 152
                      </h3>

                    </div>

                    <div>

                      <p className="text-gray-500">
                        Fare
                      </p>

                      <h3 className="text-orange-500 font-bold">
                        ₹945
                      </h3>

                    </div>

                  </div>

                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 transition-all py-4 rounded-xl text-white font-semibold">
                  Book This Train
                </button>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}