import { useState } from "react";
import { Search, Train, ShieldAlert } from "lucide-react";
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

      <div className="flex gap-2 mb-4">
        <input
          value={pnr}
          onChange={(e) => setPnr(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="e.g. 2457896321"
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
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 mt-4">
          <div className="flex items-center gap-2 mb-4 text-[#0A1A4F] font-bold">
            <Train size={18} /> {result.data?.trainName || "Train"} ({result.data?.trainNumber})
          </div>
          <pre className="text-xs text-gray-600 whitespace-pre-wrap bg-gray-50 rounded-lg p-3 overflow-auto">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}