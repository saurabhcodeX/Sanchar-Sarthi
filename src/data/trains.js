const TRAIN_NAME_POOL = [
  "Rajdhani Express", "Shatabdi Express", "Duronto Express", "Garib Rath",
  "Jan Shatabdi", "Superfast Express", "Intercity Express", "Vande Bharat Express",
  "Sampark Kranti", "Humsafar Express",
];

const TRAIN_TYPES = ["Premium", "Superfast", "Express", "Mail"];

// Deterministic pseudo-random based on a seed string, so the same route
// always returns the same trains (instead of changing on every render)
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

function pad(n) {
  return n.toString().padStart(2, "0");
}

function randomTime(rand) {
  const hour = Math.floor(rand() * 24);
  const min = Math.floor(rand() * 4) * 15;
  return `${pad(hour)}:${pad(min)}`;
}

function addDuration(dep, durationMins) {
  const [h, m] = dep.split(":").map(Number);
  const total = (h * 60 + m + durationMins) % (24 * 60);
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

function generateTrainsForRoute(from, to) {
  const seedKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
  const rand = seededRandom(seedKey);
  const count = 4 + Math.floor(rand() * 3); // 4-6 trains per route

  const trains = [];
  for (let i = 0; i < count; i++) {
    const type = TRAIN_TYPES[Math.floor(rand() * TRAIN_TYPES.length)];
    const name = TRAIN_NAME_POOL[Math.floor(rand() * TRAIN_NAME_POOL.length)];
    const durationMins = 120 + Math.floor(rand() * 600); // 2h - 12h
    const dep = randomTime(rand);
    const arr = addDuration(dep, durationMins);

    const basePrice = 200 + Math.floor(rand() * 1500);
    const price = {};
    const seats = {};
    const classes = type === "Premium"
      ? ["3A", "2A", "1A"]
      : type === "Superfast"
        ? ["CC", "EC"]
        : ["SL", "3A", "2A"];

    classes.forEach((cls, idx) => {
      const multiplier = 1 + idx * 0.6;
      price[cls] = Math.round(basePrice * multiplier);
      seats[cls] = Math.floor(rand() * 200);
    });

    trains.push({
      id: `${seedKey}-${i}`,
      name,
      number: String(10000 + Math.floor(rand() * 89999)),
      from,
      to,
      dep,
      arr,
      duration: `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`,
      price,
      seats,
      type,
    });
  }

  return trains.sort((a, b) => a.dep.localeCompare(b.dep));
}

export { generateTrainsForRoute };