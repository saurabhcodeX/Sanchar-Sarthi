const AIRLINES = [
  { name: "IndiGo", code: "6E" },
  { name: "Air India", code: "AI" },
  { name: "SpiceJet", code: "SG" },
  { name: "Vistara", code: "UK" },
  { name: "Go First", code: "G8" },
  { name: "AirAsia India", code: "I5" },
];

const CLASSES = ["Economy", "Business", "First"];

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

function pad(n) { return n.toString().padStart(2, "0"); }

function randomTime(rand) {
  const h = Math.floor(rand() * 24);
  const m = Math.floor(rand() * 4) * 15;
  return `${pad(h)}:${pad(m)}`;
}

function addMinutes(time, mins) {
  const [h, m] = time.split(":").map(Number);
  const total = (h * 60 + m + mins) % (24 * 60);
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

function formatDuration(mins) {
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

const flightCache = new Map();

export async function searchFlights({ from, to, date, travelClass = "Economy", passengers = 1 }) {
  await new Promise((r) => setTimeout(r, 600));

  if (!from || !to) return [];

  const key = `${from}-${to}-${date}`;
  if (flightCache.has(key)) return flightCache.get(key);

  const rand = seededRandom(key);
  const count = 4 + Math.floor(rand() * 4);
  const flights = [];

  for (let i = 0; i < count; i++) {
    const airline = AIRLINES[Math.floor(rand() * AIRLINES.length)];
    const durationMins = 60 + Math.floor(rand() * 300);
    const dep = randomTime(rand);
    const arr = addMinutes(dep, durationMins);
    const stops = rand() > 0.6 ? 1 : 0;
    const basePrice = 2500 + Math.floor(rand() * 8000);

    const price = {
      Economy: basePrice,
      Business: Math.round(basePrice * 2.5),
      First: Math.round(basePrice * 4),
    };

    const seats = {
      Economy: Math.floor(rand() * 120),
      Business: Math.floor(rand() * 20),
      First: Math.floor(rand() * 8),
    };

    flights.push({
      id: `${key}-${i}`,
      airline: airline.name,
      airlineCode: airline.code,
      flightNo: `${airline.code}${Math.floor(100 + rand() * 899)}`,
      from,
      to,
      dep,
      arr,
      duration: formatDuration(durationMins),
      durationMins,
      stops,
      price,
      seats,
      date,
      baggage: "15 kg",
      refundable: rand() > 0.5,
    });
  }

  const sorted = flights.sort((a, b) => a.dep.localeCompare(b.dep));
  flightCache.set(key, sorted);
  return sorted;
}

export async function getFlightById(id) {
  await new Promise((r) => setTimeout(r, 200));
  for (const flights of flightCache.values()) {
    const found = flights.find((f) => f.id === id);
    if (found) return found;
  }
  throw new Error("Flight not found. Please search again.");
}