import { useState, useRef, useEffect } from "react";
import { MapPin, Train } from "lucide-react";

const STATIONS = [
  "New Delhi (NDLS)", "Mumbai Central (BCT)", "Mumbai CST (CSTM)",
  "Chennai Central (MAS)", "Bangalore City (SBC)", "Kolkata Howrah (HWH)",
  "Chandigarh (CDG)", "Lucknow (LKO)", "Hyderabad (HYB)", "Ahmedabad (ADI)",
  "Jaipur (JP)", "Pune (PUNE)", "Patna (PNBE)", "Bhopal (BPL)",
  "Nagpur (NGP)", "Surat (ST)", "Kochi (ERS)", "Guwahati (GHY)",
  "Amritsar (ASR)", "Varanasi (BSB)",
];

export default function StationInput({ label, value, placeholder, onChange }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => { setQuery(value || ""); }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    setSuggestions(
      val.length > 0
        ? STATIONS.filter(s => s.toLowerCase().includes(val.toLowerCase())).slice(0, 6)
        : []
    );
  };

  const handleSelect = (station) => {
    setQuery(station);
    onChange(station);
    setSuggestions([]);
    setFocused(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative h-full">
      <div className={`h-full px-5 py-4 transition-all ${focused ? "bg-blue-50/40" : "hover:bg-gray-50"}`}>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
          {label}
        </p>
        <div className="flex items-center gap-2">
          <Train size={15} className="text-orange-500 shrink-0" />
          <input
            type="text"
            value={query}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            className="w-full font-bold text-gray-800 text-sm placeholder:text-gray-300 placeholder:font-normal bg-transparent outline-none"
          />
          {query && <MapPin size={13} className="text-gray-300 shrink-0" />}
        </div>
        {query && (
          <p className="text-[11px] text-gray-400 mt-0.5 truncate pl-5">{query}</p>
        )}
      </div>

      {suggestions.length > 0 && focused && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          {suggestions.map(station => (
            <button
              key={station}
              onMouseDown={() => handleSelect(station)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors text-left"
            >
              <Train size={13} className="text-orange-400 shrink-0" />
              <span className="text-sm text-gray-700 font-medium">{station}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}