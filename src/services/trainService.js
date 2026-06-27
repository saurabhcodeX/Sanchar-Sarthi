import { trains } from "../data/trains";

export async function searchTrains({ from, to }) {
  await new Promise((r) => setTimeout(r, 500)); // simulate network
  // TODO: replace with -> const { data } = await api.get('/trains/search', { params: { from, to } });

  if (!from || !to) return trains; // fallback: show all if no params

  const results = trains.filter(
    (t) => t.from.toLowerCase() === from.toLowerCase() && t.to.toLowerCase() === to.toLowerCase()
  );
  return results;
}

export async function getTrainById(id) {
  await new Promise((r) => setTimeout(r, 200));
  // TODO: replace with -> const { data } = await api.get(`/trains/${id}`);
  const train = trains.find((t) => String(t.id) === String(id));
  if (!train) throw new Error("Train not found");
  return train;
}