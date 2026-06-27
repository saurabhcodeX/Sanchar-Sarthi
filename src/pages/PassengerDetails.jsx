import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Plus, Trash2, User, Phone, Mail } from "lucide-react";
import { getTrainById } from "../services/trainService";
import { useBooking } from "../hooks/useBooking";
import Loader from "../components/Common/Loader";
import {
  MAX_PASSENGERS_PER_BOOKING,
  GENDER_OPTIONS,
  BERTH_PREFERENCES,
  MIN_PASSENGER_AGE,
  MAX_PASSENGER_AGE,
} from "../utils/constants";

function emptyPassenger() {
  return { name: "", age: "", gender: "", berth: "NP" };
}

export default function PassengerDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { submitBooking, loading: submitting, error: submitError } = useBooking();

  const trainId = searchParams.get("trainId");
  const cls = searchParams.get("class");
  const quota = searchParams.get("quota") || "GENERAL";

  const [train, setTrain] = useState(null);
  const [loadingTrain, setLoadingTrain] = useState(true);
  const [trainError, setTrainError] = useState(null);

  const [passengers, setPassengers] = useState([emptyPassenger()]);
  const [contact, setContact] = useState({ mobile: "", email: "" });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!trainId) {
      setTrainError("No train selected.");
      setLoadingTrain(false);
      return;
    }
    getTrainById(trainId)
      .then(setTrain)
      .catch((err) => setTrainError(err.message || "Failed to load train."))
      .finally(() => setLoadingTrain(false));
  }, [trainId]);

  function updatePassenger(index, field, value) {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  }

  function addPassenger() {
    if (passengers.length >= MAX_PASSENGERS_PER_BOOKING) return;
    setPassengers((prev) => [...prev, emptyPassenger()]);
  }

  function removePassenger(index) {
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  }

  function validate() {
    const errors = {};
    passengers.forEach((p, i) => {
      if (!p.name.trim()) errors[`name-${i}`] = "Name is required";
      const age = Number(p.age);
      if (!p.age || age < MIN_PASSENGER_AGE || age > MAX_PASSENGER_AGE) {
        errors[`age-${i}`] = `Age must be ${MIN_PASSENGER_AGE}-${MAX_PASSENGER_AGE}`;
      }
      if (!p.gender) errors[`gender-${i}`] = "Select gender";
    });
    if (!/^[6-9]\d{9}$/.test(contact.mobile)) {
      errors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!/^\S+@\S+\.\S+$/.test(contact.email)) {
      errors.email = "Enter a valid email";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleContinue() {
    if (!validate()) return;
    try {
      const result = await submitBooking({
        trainId,
        travelClass: cls,
        quota,
        passengers,
        contact,
      });
      navigate(`/payment?bookingId=${result.bookingId}`);
    } catch {
      // submitError already set by useBooking
    }
  }

  if (loadingTrain) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (trainError) {
    return (
      <div className="text-center py-16 text-red-500" role="alert">
        {trainError}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-[#0A1628] text-white rounded-xl p-4 mb-6">
        <p className="font-bold">{train?.name} <span className="text-blue-300 text-sm font-normal">#{train?.number}</span></p>
        <p className="text-blue-200 text-sm">Class: {cls} • Quota: {quota}</p>
      </div>

      <h1 className="text-lg font-bold text-gray-900 mb-4">Passenger Details</h1>

      <div className="space-y-4 mb-6">
        {passengers.map((p, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User size={14} /> Passenger {i + 1}
              </p>
              {passengers.length > 1 && (
                <button onClick={() => removePassenger(i)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <input
                  value={p.name}
                  onChange={(e) => updatePassenger(i, "name", e.target.value)}
                  placeholder="Full Name"
                  className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500 ${formErrors[`name-${i}`] ? "border-red-400" : "border-gray-300"}`}
                />
                {formErrors[`name-${i}`] && <p className="text-xs text-red-500 mt-1">{formErrors[`name-${i}`]}</p>}
              </div>

              <div>
                <input
                  type="number"
                  value={p.age}
                  onChange={(e) => updatePassenger(i, "age", e.target.value)}
                  placeholder="Age"
                  className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500 ${formErrors[`age-${i}`] ? "border-red-400" : "border-gray-300"}`}
                />
                {formErrors[`age-${i}`] && <p className="text-xs text-red-500 mt-1">{formErrors[`age-${i}`]}</p>}
              </div>

              <div>
                <select
                  value={p.gender}
                  onChange={(e) => updatePassenger(i, "gender", e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500 ${formErrors[`gender-${i}`] ? "border-red-400" : "border-gray-300"}`}
                >
                  <option value="">Gender</option>
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g.code} value={g.code}>{g.label}</option>
                  ))}
                </select>
                {formErrors[`gender-${i}`] && <p className="text-xs text-red-500 mt-1">{formErrors[`gender-${i}`]}</p>}
              </div>

              <div className="md:col-span-4">
                <select
                  value={p.berth}
                  onChange={(e) => updatePassenger(i, "berth", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500"
                >
                  {BERTH_PREFERENCES.map((b) => (
                    <option key={b.code} value={b.code}>{b.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {passengers.length < MAX_PASSENGERS_PER_BOOKING && (
        <button
          onClick={addPassenger}
          className="flex items-center gap-2 text-orange-600 text-sm font-semibold mb-6 hover:underline"
        >
          <Plus size={16} /> Add Passenger
        </button>
      )}

      <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-sm font-semibold text-gray-700 mb-3">Contact Details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-orange-500">
              <Phone size={14} className="text-gray-400" />
              <input
                value={contact.mobile}
                onChange={(e) => setContact((c) => ({ ...c, mobile: e.target.value }))}
                placeholder="Mobile Number"
                className="w-full outline-none text-sm"
              />
            </div>
            {formErrors.mobile && <p className="text-xs text-red-500 mt-1">{formErrors.mobile}</p>}
          </div>
          <div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-orange-500">
              <Mail size={14} className="text-gray-400" />
              <input
                value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                placeholder="Email Address"
                className="w-full outline-none text-sm"
              />
            </div>
            {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
          </div>
        </div>
      </div>

      {submitError && (
        <p className="text-sm text-red-500 mb-4" role="alert">{submitError}</p>
      )}

      <button
        onClick={handleContinue}
        disabled={submitting}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-full transition-all"
      >
        {submitting ? "Processing..." : "Continue to Payment"}
      </button>
    </div>
  );
}