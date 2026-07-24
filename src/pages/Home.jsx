import Hero from "../components/Hero/Hero";
import BookingSection from "../components/Booking/BookingSection";
import PopularRoutes from "../components/PopularRoutes/PopularRoutes";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Hero />
      <BookingSection />
      <PopularRoutes />
      <WhyChooseUs />
    </div>
  );
}