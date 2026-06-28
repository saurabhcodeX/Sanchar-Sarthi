import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle2, Download, Home, Train } from "lucide-react";
import { useBooking } from "../hooks/useBooking";
import { getTrainById } from "../services/trainService";
import Loader from "../components/Common/Loader";

export default function Ticket() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get("bookingId");

  const { fetchBooking, loading, error, booking } = useBooking();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    if (!bookingId) return;
    fetchBooking(bookingId).catch(() => {});
  }, [bookingId, fetchBooking]);

  useEffect(() => {
    if (booking?.trainId) {
      getTrainById(booking.trainId).then(setTrain).catch(() => {});
    }
  }, [booking]);

  if (!bookingId) {
    return <div className="text-center py-16 text-red-500" role="alert">No booking found.</div>;
  }

  if (loading && !booking) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-16 text-red-500" role="alert">{error}</div>;
  }

  if (booking?.status !== "CONFIRMED") {
    return (
      <div className="text-center py-16 text-gray-500" role="alert">
        This booking has not been paid for yet.
        <div className="mt-4">
          <Link to={`/payment?bookingId=${bookingId}`} className="text-orange-600 font-semibold hover:underline">
            Go to Payment →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Success banner */}
      <div className="flex flex-col items-center text-center mb-6">
        <CheckCircle2 size={48} className="text-green-500 mb-2" />
        <h1 className="text-xl font-bold text-gray-900">Booking Confirmed!</h1>
        <p className="text-gray-500 text-sm mt-1">Your e-ticket is ready. Have a safe journey.</p>
      </div>

      {/* Ticket card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="bg-[#0A1628] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Train size={18} className="text-orange-400" />
            <div>
              <p className="font-bold text-sm">{train?.name}</p>
              <p className="text-blue-300 text-xs">#{train?.number}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-300">PNR</p>
            <p className="font-mono font-bold">{booking?.pnr}</p>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-lg font-extrabold text-gray-900">{train?.dep}</p>
              <p className="text-xs text-gray-400">From</p>
            </div>
            <div className="flex-1 mx-3 border-t border-dashed border-gray-300" />
            <div className="text-right">
              <p className="text-lg font-extrabold text-gray-900">{train?.arr}</p>
              <p className="text-xs text-gray-400">To</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm mb-4">
            <div>
              <p className="text-gray-400 text-xs">Class</p>
              <p className="font-semibold text-gray-800">{booking?.travelClass}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Quota</p>
              <p className="font-semibold text-gray-800">{booking?.quota}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Status</p>
              <p className="font-semibold text-green-600">{booking?.status}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Passengers</p>
            <div className="space-y-2">
              {booking?.passengers?.map((p, i) => (
                <div key={i} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                  <span className="font-medium text-gray-800">{p.name}</span>
                  <span className="text-gray-500">{p.age} yrs • {p.gender} • Berth: {p.berth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition-all"
        >
          <Download size={16} /> Download / Print
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-bold py-3 rounded-full hover:bg-gray-50 transition-all"
        >
          <Home size={16} /> Back to Home
        </button>
      </div>
    </div>
  );
}