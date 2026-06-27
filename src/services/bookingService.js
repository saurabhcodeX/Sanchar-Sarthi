/**
 * Creates a booking with passenger details.
 * Currently mocked. Replace internals with a real API call once
 * Spring Boot backend is live — signature stays the same.
 */
export async function createBooking({ trainId, travelClass, quota, passengers, contact }) {
  await new Promise((r) => setTimeout(r, 700)); // simulate network

  // TODO: replace with -> const { data } = await api.post('/bookings', { trainId, travelClass, quota, passengers, contact });

  if (!passengers || passengers.length === 0) {
    throw new Error("At least one passenger is required.");
  }

  // Mock response shape mirrors what a real backend would likely return
  return {
    bookingId: `SS${Date.now()}`,
    pnr: Math.floor(1000000000 + Math.random() * 8999999999).toString(),
    status: "CONFIRMED",
    trainId,
    travelClass,
    quota,
    passengers,
    contact,
    createdAt: new Date().toISOString(),
  };
}