import { Train, Plane, Hotel } from "lucide-react";

const TABS = [
  { id: "trains", label: "Trains", icon: Train },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: Hotel },
];

export default function SearchTabs({ active, onChange }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex bg-white/10 backdrop-blur rounded-xl p-1 gap-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              active === id
                ? "bg-white text-[#0A1A4F] shadow-sm"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}