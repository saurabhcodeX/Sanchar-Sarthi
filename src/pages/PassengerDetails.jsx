import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getTrainById } from "../services/trainService";
import Loader from "../components/Common/Loader";

export default function PassengerDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const trainId = searchParams.get("trainId");
  const cls = searchParams.get("class");

  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trainId) {
      setError("No train selected.");
      setLoading(false);
      return;
    }
    setLoading(true);
    getTrainById(trainId)
      .then((data) => setTrain(data))
      .catch((err) => setError(err.message || "Failed to load train."))
      .finally(() => setLoading(false));
  }, [trainId]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Passenger Details</h1>
      <p className="text-gray-500 text-sm mb-6">
        {train?.name} ({train?.number}) — Class: {cls}
      </p>

      {/* TODO: passenger form fields go here next */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <p className="text-gray-400 text-sm">Passenger form coming next.</p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-sm text-orange-600 hover:underline"
      >
        ← Back to results
      </button>
    </div>
  );
}