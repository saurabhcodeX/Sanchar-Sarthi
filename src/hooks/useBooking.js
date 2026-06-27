import { useState, useCallback } from "react";
import { createBooking } from "../services/bookingService";

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState(null);

  const submitBooking = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createBooking(payload);
      setBooking(result);
      return result;
    } catch (err) {
      setError(err.message || "Booking failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submitBooking, loading, error, booking };
}