const bookingsStore = new Map(); // in-memory mock store, replaced by real DB later

export async function createBooking({ trainId, travelClass, quota, passengers, contact }) {
  await new Promise((r) => setTimeout(r, 700));

  if (!passengers || passengers.length === 0) {
    throw new Error("At least one passenger is required.");
  }

  const booking = {
    bookingId: `SS${Date.now()}`,
    pnr: Math.floor(1000000000 + Math.random() * 8999999999).toString(),
    status: "PENDING_PAYMENT",
    trainId,
    travelClass,
    quota,
    passengers,
    contact,
    createdAt: new Date().toISOString(),
  };

  // TODO: replace with -> const { data } = await api.post('/bookings', {...}); return data;
  bookingsStore.set(booking.bookingId, booking);
  return booking;
}

export async function getBookingById(bookingId) {
  await new Promise((r) => setTimeout(r, 300));
  // TODO: replace with -> const { data } = await api.get(`/bookings/${bookingId}`); return data;
  const booking = bookingsStore.get(bookingId);
  if (!booking) throw new Error("Booking not found.");
  return booking;
}

export async function confirmPayment(bookingId, paymentMethod) {
  await new Promise((r) => setTimeout(r, 1200)); // simulate gateway latency
  // TODO: replace with -> const { data } = await api.post(`/bookings/${bookingId}/pay`, { paymentMethod }); return data;
  const booking = bookingsStore.get(bookingId);
  if (!booking) throw new Error("Booking not found.");

  booking.status = "CONFIRMED";
  booking.paymentMethod = paymentMethod;
  booking.paidAt = new Date().toISOString();
  bookingsStore.set(bookingId, booking);
  return booking;
}