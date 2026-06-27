import { Users, Minus, Plus } from "lucide-react";

export default function PassengerSelector({ passengers, setPassengers }) {
  const increase = () => {
    if (passengers < 6) setPassengers(passengers + 1);
  };
  const decrease = () => {
    if (passengers > 1) setPassengers(passengers - 1);
  };

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-semibold mb-3">
        Passengers
      </p>

      <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 hover:border-orange-300 transition-all">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
          <Users size={18} className="text-orange-500" />
        </div>

        <div className="flex-1">
          <p className="font-bold text-gray-900 text-base leading-none">
            {passengers} {passengers === 1 ? "Adult" : "Adults"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Max 6 per booking</p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={decrease}
            disabled={passengers <= 1}
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-gray-100 hover:bg-orange-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-6 text-center font-bold text-gray-900 text-sm">
            {passengers}
          </span>
          <button
            onClick={increase}
            disabled={passengers >= 6}
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}