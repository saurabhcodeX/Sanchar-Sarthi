import { useState } from "react";
import { Search, Train, ShieldAlert, MapPin, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { checkLiveStatus } from "../services/liveStatusService";
import Loader from "../components/Common/Loader";

export default function LiveStatus() {
  const [trainNo, setTrainNo] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheck() {
    if (!/^\d{4,5}$/.test(trainNo)) {
      setError("Enter a valid train number.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const raw = await checkLiveStatus(trainNo);
      setResult(raw?.data || raw);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold text-[#0A1A4F] mb-1">Live Train Status</h1>
      <p className="text-gray-500 text-sm mb-6">Enter a train number to see where it is right now.</p>

      <div className="flex gap-2 mb-6">
        <input
          value={trainNo}
          onChange={(e) => setTrainNo(e.target.value.replace(/\D/g, "").slice(0, 5))}
          placeholder="e.g. 12951"
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
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-[#0A1628] text-white px-5 py-4 flex items-center gap-2">
            <Train size={18} className="text-orange-400" />
            <p className="font-bold">{result.train_name}</p>
            <span className="text-blue-300 text-xs">#{result.train_number}</span>
          </div>

          <div className="p-5 space-y-4">
            {/* Route */}
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-gray-400 text-xs">Source</p>
                <p className="font-semibold text-gray-800">{result.source_stn_name} ({result.source})</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">Destination</p>
                <p className="font-semibold text-gray-800">{result.dest_stn_name} ({result.destination})</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-lg p-3 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Runs On</p>
                <p className="font-semibold text-gray-800">{result.run_days}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Pantry</p>
                <p className="font-semibold text-gray-800">{result.pantry_available ? "Available" : "Not Available"}</p>
              </div>
            </div>

            {/* Status message */}
            {!result.is_run_day ? (
              <div className="flex items-start gap-2 bg-yellow-50 text-yellow-700 text-sm px-4 py-3 rounded-lg">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{result.title || "Train not running today"}</p>
                  <p className="text-xs mt-0.5">{result.new_message}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Train is running today</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-green-600">
                    <MapPin size={12} />
                    <span>{result.at_src ? "At source station" : result.at_dstn ? "Arrived at destination" : "En route"}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock size={12} />
              Last checked: {result.notification_date}
            </div>

            {result.disclaimer && (
              <p className="text-[11px] text-gray-400 border-t border-gray-100 pt-3">{result.disclaimer}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}