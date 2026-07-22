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

      <div className="relative -mt-16 z-20 px-4 md:px-0 max-w-2xl mx-auto w-full">
        <SearchTabs active={activeTab} onChange={setActiveTab} />
        {activeTab === "trains"  && <BookingCard />}
        {activeTab === "flights" && <FlightBookingCard />}
        {activeTab === "hotels"  && <HotelBookingCard />}
      </div>

      <div className="mt-16" />
      <PopularRoutes />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}