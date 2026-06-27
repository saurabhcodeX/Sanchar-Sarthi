import { useState, useEffect } from "react";
import { searchTrains } from "../services/trainService";

export function useTrainSearch({ from, to }) {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    searchTrains({ from, to })
      .then((data) => { if (active) setTrains(data); })
      .catch((err) => { if (active) setError(err.message || "Failed to load trains."); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [from, to]);

  return { trains, loading, error };
}