import { generateTrainsForRoute } from "../data/trains";

const trainCache = new Map(); // avoid regenerating on every call for the same route

export async function searchTrains({ from, to }) {
  await new Promise((r) => setTimeout(r, 500)); // simulate network

  // TODO: replace with -> const { data } = await api.get('/trains/search', { params: { from, to } });

  if (!from || !to) return [];

  const key = `${from.toLowerCase()}-${to.toLowerCase()}`;
  if (!trainCache.has(key)) {
    trainCache.set(key, generateTrainsForRoute(from, to));
  }
  return trainCache.get(key);
}

export async function getTrainById(id) {
  await new Promise((r) => setTimeout(r, 200));
  // TODO: replace with -> const { data } = await api.get(`/trains/${id}`);

  for (const trains of trainCache.values()) {
    const found = trains.find((t) => t.id === id);
    if (found) return found;
  }
  throw new Error("Train not found. Please search again.");
}