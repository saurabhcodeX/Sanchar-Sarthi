import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import BookingCard from "../components/Booking/BookingCard";
import FlightBookingCard from "../components/Booking/FlightBookingCard";
import HotelBookingCard from "../components/Booking/HotelBookingCard";
import SearchTabs from "../components/Common/SearchTabs";
import PopularRoutes from "../components/PopularRoutes/PopularRoutes";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Footer from "../components/Footer/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("trains");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />

      {/* Tab switcher — sits just above the booking card */}
      <div className="relative -mt-24 z-30 flex justify-center px-4">
        <SearchTabs active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Booking cards — each manages its own layout */}
      {activeTab === "trains"  && <BookingCard />}
      {activeTab === "flights" && (
        <div className="relative -mt-4 z-20 px-4 md:px-0 max-w-2xl mx-auto w-full">
          <FlightBookingCard />
        </div>
      )}
      {activeTab === "hotels" && (
        <div className="relative -mt-4 z-20 px-4 md:px-0 max-w-2xl mx-auto w-full">
          <HotelBookingCard />
        </div>
      )}

      <div className="mt-16" />
      <PopularRoutes />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}