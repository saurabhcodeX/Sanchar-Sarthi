import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Train, Plane, Hotel } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import BookingCard from "../components/Booking/BookingCard";
import FlightBookingCard from "../components/Booking/FlightBookingCard";
import HotelBookingCard from "../components/Booking/HotelBookingCard";
import PopularRoutes from "../components/PopularRoutes/PopularRoutes";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Footer from "../components/Footer/Footer";

const TABS = [
  { id: "trains",  label: "Trains",  icon: Train },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels",  label: "Hotels",  icon: Hotel },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("trains");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Hero />

      {/* Booking section */}
      <div className="relative z-20 -mt-10 px-4 pb-10">
        <div className="max-w-3xl mx-auto">

          {/* Tab switcher */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex bg-[#0A1628] rounded-2xl p-1.5 gap-1 shadow-xl">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeTab === id
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Booking card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "trains"  && <BookingCard />}
              {activeTab === "flights" && <FlightBookingCard />}
              {activeTab === "hotels"  && <HotelBookingCard />}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      <PopularRoutes />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}