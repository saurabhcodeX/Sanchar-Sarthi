import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Calendar, LogOut, BookOpen, Wallet, Edit3, ShieldCheck } from "lucide-react";
import { auth } from "../services/auth";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = auth.getUser();
    if (!u) { navigate("/login"); return; }
    setUser(u);
  }, [navigate]);

  function handleLogout() {
    auth.logout();
    navigate("/");
  }

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Profile header */}
      <div className="bg-[#0A1628] rounded-2xl p-6 mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
          <User size={28} className="text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">{user.name || "Traveller"}</h1>
          <p className="text-blue-300 text-sm mt-0.5">{user.email || user.userId}</p>
          {user.mobile && (
            <p className="text-blue-300 text-sm">{user.mobile}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full">
          <ShieldCheck size={12} /> Verified
        </div>
      </div>

      {/* User details */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Personal Details</h2>
          <button className="flex items-center gap-1.5 text-orange-500 text-sm font-semibold hover:text-orange-600 transition-colors">
            <Edit3 size={14} /> Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: User,     label: "Full Name",    value: user.name     || "Not set" },
            { icon: Mail,     label: "Email",        value: user.email    || "Not set" },
            { icon: Phone,    label: "Mobile",       value: user.mobile   || "Not set" },
            { icon: Calendar, label: "Date of Birth",value: user.dob      || "Not set" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <Icon size={16} className="text-orange-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-semibold text-gray-800">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Link to="/bookings"
          className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-5 hover:border-orange-300 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
            <BookOpen size={18} className="text-orange-500" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">My Bookings</p>
            <p className="text-xs text-gray-400">View all trips</p>
          </div>
        </Link>

        <Link to="/wallet"
          className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-5 hover:border-orange-300 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Wallet size={18} className="text-blue-500" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">My Wallet</p>
            <p className="text-xs text-gray-400">Balance & history</p>
          </div>
        </Link>
      </div>

      {/* Logout */}
      <button onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 border-2 border-red-100 text-red-500 hover:bg-red-50 font-semibold py-3.5 rounded-2xl transition-all">
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  );
}