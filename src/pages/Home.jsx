import { useState } from "react";
import SearchTabs from "../components/Common/SearchTabs";
import BookingCard from "../components/Booking/BookingCard";
import FlightBookingCard from "../components/Booking/FlightBookingCard";
import HotelBookingCard from "../components/Booking/HotelBookingCard";

// Inside your Hero/Home component, replace <BookingCard /> with:
const [activeTab, setActiveTab] = useState("trains");

// In JSX:
<div>
  <SearchTabs active={activeTab} onChange={setActiveTab} />
  {activeTab === "trains" && <BookingCard />}
  {activeTab === "flights" && <FlightBookingCard />}
  {activeTab === "hotels" && <HotelBookingCard />}
</div>