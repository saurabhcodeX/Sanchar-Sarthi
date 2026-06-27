const CLASSES = [
  { code: "SL", label: "Sleeper" },
  { code: "3A", label: "3 Tier AC" },
  { code: "2A", label: "2 Tier AC" },
  { code: "1A", label: "First AC" },
  { code: "CC", label: "Chair Car" },
  { code: "EC", label: "Exec. Chair" },
];

export default function TravelClassSelect({ value, onChange }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-semibold mb-2">
        Class
      </p>
      <div className="flex flex-wrap gap-1.5">
        {CLASSES.map((cls) => (
          <button
            key={cls.code}
            onClick={() => onChange(cls.code)}
            title={cls.label}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              value === cls.code
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            {cls.code}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-1.5">
        {CLASSES.find((c) => c.code === value)?.label}
      </p>
    </div>
  );
}