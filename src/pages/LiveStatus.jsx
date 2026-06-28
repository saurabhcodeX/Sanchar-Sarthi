import { useState } from "react";
import { Search, Train, ShieldAlert, MapPin, Clock } from "lucide-react";
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
          placeholder="e.g. 12345"
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
            <p className="font-bold">{result.train_name || result.TrainName}</p>
          </div>

          <div className="p-5 space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-400" />
              <span className="text-gray-700">
                Currently near: <strong>{result.current_station_name || result.CurrentStation || "Unknown"}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <span className="text-gray-700">
                Delay: <strong>{result.delay || result.Delay || "0"} min</strong>
              </span>
            </div>

            <pre className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 overflow-auto mt-3">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}