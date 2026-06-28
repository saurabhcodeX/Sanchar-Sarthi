import { useState } from "react";
import { Search, Train, ShieldAlert, MapPin, Calendar, Clock } from "lucide-react";
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
      const data = await checkPNRStatus(pnr);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
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
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#0A1628] text-white px-5 py-4">
            <div className="flex items-center gap-2 mb-1">
              <Train size={18} className="text-orange-400" />
              <p className="font-bold">{result.TrainName}</p>
              <span className="text-blue-300 text-xs">#{result.TrainNo}</span>
            </div>
            <p className="text-blue-200 text-xs">PNR: {result.Pnr}</p>
          </div>

          <div className="p-5 space-y-4">
            {/* Route */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-extrabold text-gray-900">{result.DepartureTime}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={11} />{result.SourceName}</p>
              </div>
              <div className="flex-1 mx-3 border-t border-dashed border-gray-300 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 bg-white px-1">
                  {result.Duration}
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-extrabold text-gray-900">{result.ArrivalTime}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1 justify-end"><MapPin size={11} />{result.DestinationName}</p>
              </div>
            </div>

            {/* Journey info */}
            <div className="grid grid-cols-3 gap-3 text-sm bg-gray-50 rounded-lg p-3">
              <div>
                <p className="text-gray-400 text-xs flex items-center gap-1"><Calendar size={11} />Journey Date</p>
                <p className="font-semibold text-gray-800">{result.Doj}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Class</p>
                <p className="font-semibold text-gray-800">{result.Class}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Quota</p>
                <p className="font-semibold text-gray-800">{result.Quota}</p>
              </div>
            </div>

            {/* Chart status */}
            <div className={`text-xs font-semibold px-3 py-2 rounded-lg ${result.ChartPrepared ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
              {result.ChartPrepared ? "Chart Prepared" : "Chart Not Prepared Yet"}
            </div>

            {/* Passengers */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Passenger Status ({result.PassengerCount})
              </p>
              <div className="space-y-2">
                {result.PassengerStatus?.map((p) => (
                  <div key={p.Number} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
                    <span className="font-medium text-gray-700">Passenger {p.Number}</span>
                    <span className={`font-bold ${p.ConfirmTktStatus === "Confirm" ? "text-green-600" : "text-orange-600"}`}>
                      {p.CurrentStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fare */}
            <div className="flex justify-between border-t border-gray-100 pt-3 text-sm">
              <span className="text-gray-500">Ticket Fare</span>
              <span className="font-bold text-gray-900">₹{result.TicketFare}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}