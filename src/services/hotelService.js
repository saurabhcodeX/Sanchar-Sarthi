const HOTEL_NAMES = [
  "The Grand Residency", "Hotel Comfort Inn", "Royal Heritage Hotel",
  "The Lalit", "Taj Hotel", "Lemon Tree Hotel", "FabHotel Prime",
  "OYO Rooms", "Ibis", "Novotel", "Holiday Inn", "Marriott",
];

const AMENITIES_POOL = [
  "Free WiFi", "Parking", "Pool", "Gym", "Restaurant",
  "Bar", "Spa", "Room Service", "AC", "Breakfast Included",
];

function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return function () {
    h = (h * 1103515245 + 12345) >>> 0;
    return (h % 10000) / 10000;
  };
}

const hotelCache = new Map();

export async function searchHotels({ city, checkIn, checkOut, rooms = 1, guests = 1 }) {
  await new Promise((r) => setTimeout(r, 600));

  if (!city) return [];

  const key = `${city}-${checkIn}-${checkOut}`;
  if (hotelCache.has(key)) return hotelCache.get(key);

  const rand = seededRandom(key);
  const count = 5 + Math.floor(rand() * 5);
  const hotels = [];

  for (let i = 0; i < count; i++) {
    const name = HOTEL_NAMES[Math.floor(rand() * HOTEL_NAMES.length)];
    const stars = 2 + Math.floor(rand() * 4);
    const pricePerNight = 800 + Math.floor(rand() * 8000);
    const rating = (3 + rand() * 2).toFixed(1);
    const reviews = Math.floor(50 + rand() * 2000);

    const amenityCount = 3 + Math.floor(rand() * 5);
    const amenities = [];
    const pool = [...AMENITIES_POOL];
    for (let j = 0; j < amenityCount; j++) {
      const idx = Math.floor(rand() * pool.length);
      amenities.push(pool.splice(idx, 1)[0]);
    }

    hotels.push({
      id: `hotel-${key}-${i}`,
      name,
      city,
      stars,
      rating: parseFloat(rating),
      reviews,
      pricePerNight,
      amenities,
      checkIn,
      checkOut,
      rooms,
      guests,
      refundable: rand() > 0.4,
    });
  }

  const sorted = hotels.sort((a, b) => a.pricePerNight - b.pricePerNight);
  hotelCache.set(key, sorted);
  return sorted;
}

export async function getHotelById(id) {
  await new Promise((r) => setTimeout(r, 200));
  for (const hotels of hotelCache.values()) {
    const found = hotels.find((h) => h.id === id);
    if (found) return found;
  }
  throw new Error("Hotel not found. Please search again.");
}