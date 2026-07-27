import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import BookingSection from "../components/Booking/BookingSection";
import PopularRoutes from "../components/PopularRoutes/PopularRoutes";
import OffersSection from "../components/Offers/OffersSection";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <Hero />
      <BookingSection />
      <PopularRoutes />
      <OffersSection />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}   