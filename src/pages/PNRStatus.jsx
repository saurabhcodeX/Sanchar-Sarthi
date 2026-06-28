import { useState } from "react";
import { Search, Train, ShieldAlert, Star, RefreshCw } from "lucide-react";
import { checkPNRStatus } from "../services/pnrService";
import Loader from "../components/Common/Loader";

export default function PNRStatus() {
  const [pnr, setPnr] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheck() {
    if (!/^\d{10}$/.test(pnr)) {
      setError("Enter a valid 10-digit PNR number.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const raw = await checkPNRStatus(pnr);
      const data = raw?.data || raw;
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold text-[#0A1A4F] mb-1">PNR Status</h1>
      <p className="text-gray-500 text-sm mb-6">Enter your 10-digit PNR to check real booking status.</p>

      <div className="flex gap-2 mb-6">
        <input
          value={pnr}
          onChange={(e) => setPnr(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="e.g. 2838954781"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500"
        />
        <button
          onClick={handleCheck}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold px-5 rounded-lg flex items-center gap-2"
        >
          <Search size={16} /> Check
        </button>
      </div>

      {loading && <div className="flex justify-center py-10"><Loader /></div>}

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 rounded-lg p-3" role="alert">
          <ShieldAlert size={16} /> {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-gray-900">PNR : {result.Pnr}</p>
              <button onClick={() => { setResult(null); setPnr(""); }} className="text-green-600 text-sm font-semibold hover:underline">
                CHANGE
              </button>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <Train size={16} className="text-gray-500" />
              <p className="font-semibold text-gray-800">{result.TrainNo} - {result.TrainName}</p>
              {result.Rating && (
                <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  <Star size={11} className="fill-yellow-400 text-yellow-400" /> {result.Rating}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-1">
              {result.SourceName} - {result.From}, {result.DepartureTime}
              <span className="mx-2">→</span>
              {result.DestinationName} - {result.To}, {result.ArrivalTime}
            </p>

            <p className="text-sm text-gray-500">
              {result.Doj} &nbsp;|&nbsp; {result.Class} &nbsp;|&nbsp; {result.Quota}
              {result.ExpectedPlatformNo && <> &nbsp;|&nbsp; Platform: {result.ExpectedPlatformNo}</>}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-gray-900">Passenger Status</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span className={result.ChartPrepared ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"}>
                  {result.ChartPrepared ? "Chart prepared" : "Chart not prepared"}
                </span>
                <button onClick={handleCheck} className="ml-1 text-gray-400 hover:text-orange-500">
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase border-b border-gray-100">
                    <th className="text-left py-2 font-semibold">S. No</th>
                    <th className="text-left py-2 font-semibold">Current Status</th>
                    <th className="text-left py-2 font-semibold">Booking Status</th>
                    <th className="text-left py-2 font-semibold">Coach</th>
                  </tr>
                </thead>
                <tbody>
                  {result.PassengerStatus?.map((p) => (
                    <tr key={p.Number} className="border-b border-gray-50 last:border-0">
                      <td className="py-3">{p.Number}</td>
                      <td className="py-3">
                        <p className={`font-bold ${p.ConfirmTktStatus === "Confirm" ? "text-green-600" : "text-orange-600"}`}>
                          {p.CurrentStatus}
                        </p>
                        {p.Prediction && <p className="text-xs text-gray-400">{p.Prediction}</p>}
                      </td>
                      <td className="py-3 text-gray-700">{p.BookingStatus}</td>
                      <td className="py-3 text-gray-700">{p.Coach}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex justify-between text-sm">
            <span className="text-gray-500">Ticket Fare</span>
            <span className="font-bold text-gray-900">₹{result.TicketFare}</span>
          </div>
        </div>
      )}
    </div>
  );
}