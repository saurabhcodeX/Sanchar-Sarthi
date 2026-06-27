import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import BookingCard from "../components/Booking/BookingCard";
import PopularRoutes from "../components/PopularRoutes/PopularRoutes";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <BookingCard />
      <div className="mt-4" />
      <PopularRoutes />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}