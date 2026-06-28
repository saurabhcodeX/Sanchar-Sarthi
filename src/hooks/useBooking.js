import { useState, useCallback } from "react";
import { createBooking, getBookingById, confirmPayment } from "../services/bookingService";

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

  const fetchBooking = useCallback(async (bookingId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getBookingById(bookingId);
      setBooking(result);
      return result;
    } catch (err) {
      setError(err.message || "Could not load booking.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const payForBooking = useCallback(async (bookingId, method) => {
    setLoading(true);
    setError(null);
    try {
      const result = await confirmPayment(bookingId, method);
      setBooking(result);
      return result;
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submitBooking, fetchBooking, payForBooking, loading, error, booking };
}