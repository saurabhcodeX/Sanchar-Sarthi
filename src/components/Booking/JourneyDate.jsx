import { useRef, useState, useEffect } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const FULL_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export default function JourneyDate({ value, onChange }) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const containerRef = useRef(null);

  const selected = value ? new Date(value + "T00:00:00") : null;
  const displayDay = selected ? selected.getDate() : today.getDate();
  const displayMonth = selected ? MONTHS[selected.getMonth()] : MONTHS[today.getMonth()];
  const displayYear = selected ? selected.getFullYear() : today.getFullYear();
  const displayWeekday = selected
    ? selected.toLocaleString("en-US", { weekday: "short" })
    : today.toLocaleString("en-US", { weekday: "short" });

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectDate = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    onChange(d.toISOString().split("T")[0]);
    setOpen(false);
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayStr = today.toISOString().split("T")[0];

  return (
    <div ref={containerRef} className="relative h-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-full px-5 py-4 text-left transition-all ${open ? "bg-blue-50/40" : "hover:bg-gray-50"}`}
      >
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
          Departure Date
        </p>
        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="text-orange-500 shrink-0" />
          <span className="font-bold text-gray-800 text-sm">
            {displayWeekday}, {displayDay} {displayMonth} {displayYear}
          </span>
        </div>
        <p className="text-[11px] text-green-500 mt-0.5 pl-5 font-medium">Trains available</p>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-72">
          <div className="flex items-center justify-between mb-3">
            <button onClick={prevMonth} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center">
              <ChevronLeft size={15} />
            </button>
            <span className="font-bold text-sm text-gray-800">{FULL_MONTHS[viewMonth]} {viewYear}</span>
            <button onClick={nextMonth} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center">
              <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] text-gray-400 font-bold py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={i} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const cellDate = new Date(viewYear, viewMonth, day);
              const cellStr = cellDate.toISOString().split("T")[0];
              const isPast = cellStr < todayStr;
              const isSelected = cellStr === value;
              const isToday = cellStr === todayStr;
              return (
                <button
                  key={day}
                  disabled={isPast}
                  onClick={() => selectDate(day)}
                  className={`w-8 h-8 mx-auto rounded-lg text-xs font-semibold transition-all flex items-center justify-center ${
                    isSelected ? "bg-orange-500 text-white shadow-sm" :
                    isToday ? "border border-orange-300 text-orange-600" :
                    isPast ? "text-gray-200 cursor-not-allowed" :
                    "hover:bg-orange-50 text-gray-700"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}