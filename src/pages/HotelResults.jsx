import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Filter, Star, Wifi, Car, Utensils, Dumbbell, Waves } from "lucide-react";
import { searchHotels } from "../services/hotelService";
import Loader from "../components/Common/Loader";

const AMENITY_ICONS = {
  "Free WiFi": Wifi,
  "Parking": Car,
  "Restaurant": Utensils,
  "Gym": Dumbbell,
  "Pool": Waves,
};

function StarRating({ stars }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12}
          className={i < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  );
}

function HotelCard({ hotel, i, nights, onBook }) {
  const totalPrice = hotel.pricePerNight * nights * hotel.rooms;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Hotel info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900">{hotel.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{hotel.city}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded">
                  {hotel.rating}
                </span>
                <span className="text-xs text-gray-400">({hotel.reviews} reviews)</span>
              </div>
              <StarRating stars={hotel.stars} />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {hotel.amenities.slice(0, 5).map((a) => {
              const Icon = AMENITY_ICONS[a];
              return (
                <span key={a} className="flex items-center gap-1 text-[10px] bg-gray-50 text-gray-500 px-2 py-1 rounded-full border border-gray-100">
                  {Icon && <Icon size={10} />} {a}
                </span>
              );
            })}
          </div>

          {hotel.refundable && (
            <p className="text-xs text-green-600 font-semibold">✓ Free cancellation</p>
          )}
        </div>

        {/* Price + Book */}
        <div className="lg:w-44 shrink-0 flex flex-col items-end justify-between">
          <div className="text-right">
            <p className="text-2xl font-extrabold text-gray-900">₹{hotel.pricePerNight.toLocaleString()}</p>
            <p className="text-xs text-gray-400">per night</p>
            <p className="text-sm font-semibold text-gray-700 mt-1">
              ₹{totalPrice.toLocaleString()} total
            </p>
            <p className="text-[10px] text-gray-400">{nights} night{nights > 1 ? "s" : ""} · {hotel.rooms} room{hotel.rooms > 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => onBook(hotel)}
            className="mt-3 w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function getNights(checkIn, checkOut) {
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  const diff = Math.ceil((b - a) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
}

export default function HotelResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const city     = searchParams.get("city")     || "";
  const checkIn  = searchParams.get("checkIn")  || "";
  const checkOut = searchParams.get("checkOut") || "";
  const rooms    = Number(searchParams.get("rooms")  || 1);
  const guests   = Number(searchParams.get("guests") || 1);

  const [hotels, setHotels]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [sort, setSort]       = useState("price");

  const nights = getNights(checkIn, checkOut);

  useEffect(() => {
    setLoading(true);
    searchHotels({ city, checkIn, checkOut, rooms, guests })
      .then(setHotels)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city, checkIn, checkOut, rooms, guests]);

  const sorted = [...hotels].sort((a, b) => {
    if (sort === "price")  return a.pricePerNight - b.pricePerNight;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "stars")  return b.stars - a.stars;
    return 0;
  });

  function handleBook(hotel) {
    navigate(`/payment?type=hotel&hotelId=${hotel.id}&checkIn=${checkIn}&checkOut=${checkOut}&rooms=${rooms}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0A1628] text-white px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-blue-300 hover:text-white text-xs mb-3 transition-colors">
            <ChevronLeft size={14} /> Modify Search
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-lg font-extrabold">Hotels in {city}</h1>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs">{checkIn} → {checkOut}</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs">{rooms} room{rooms > 1 ? "s" : ""} · {guests} guest{guests > 1 ? "s" : ""}</span>
          </div>
          <p className="text-blue-300 text-sm mt-1">
            {loading ? "Searching hotels..." : `${hotels.length} hotels available · ${nights} night${nights > 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {loading && (
          <div className="space-y-4">
            {[1,2,3].map((i) => (
              <div key={i} className="h-36 bg-white rounded-2xl border border-gray-100 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-16 text-red-500 bg-white rounded-2xl border border-gray-100" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-xs text-gray-400 font-semibold flex items-center gap-1 mr-1">
                <Filter size={12} /> Sort:
              </span>
              {[["price","Price"],["rating","Rating"],["stars","Stars"]].map(([k, l]) => (
                <button key={k} onClick={() => setSort(k)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    sort === k ? "bg-orange-500 text-white border-orange-500" : "bg-white border-gray-200 text-gray-500 hover:border-orange-300"
                  }`}>
                  {l}
                </button>
              ))}
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-100">
                No hotels found for this city.
              </div>
            ) : (
              <div className="space-y-4" aria-label="Hotel search results">
                {sorted.map((hotel, i) => (
                  <HotelCard key={hotel.id} hotel={hotel} i={i} nights={nights} onBook={handleBook} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}