import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, Calendar, Edit2, Save, LogOut, Shield, Train, Wallet } from "lucide-react";
import { auth } from "../services/auth";
import { motion } from "framer-motion";

export default function Profile() {
  const navigate = useNavigate();
  const user = auth.getUser() || { name:"Traveller", mobile:"9876543210", email:"traveller@email.com" };
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, mobile: user.mobile, email: user.email, dob:"" });

  function handleLogout() {
    auth.logout();
    navigate("/login");
  }

  const STATS = [
    { icon: Train,  label:"Total Trips",    value:"12" },
    { icon: Wallet, label:"Wallet Balance",  value:"₹850" },
    { icon: Shield, label:"Member Since",    value:"2024" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0A1628] text-white px-6 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-3 text-3xl font-extrabold">
            {user.name?.[0]?.toUpperCase() || "T"}
          </div>
          <h1 className="text-xl font-extrabold">{user.name}</h1>
          <p className="text-blue-300 text-sm mt-1">{user.email}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-4 pb-10 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <s.icon size={20} className="text-orange-500 mx-auto mb-2"/>
              <p className="font-extrabold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Profile form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="font-bold text-gray-800">Personal Information</p>
            <button onClick={() => setEditing(e => !e)}
              className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-600">
              {editing ? <><Save size={13}/> Save</> : <><Edit2 size={13}/> Edit</>}
            </button>
          </div>
          <div className="p-5 space-y-4">
            {[
              { icon: User,     label:"Full Name",   key:"name",   type:"text" },
              { icon: Phone,    label:"Mobile",      key:"mobile", type:"tel" },
              { icon: Mail,     label:"Email",       key:"email",  type:"email" },
              { icon: Calendar, label:"Date of Birth", key:"dob",  type:"date" },
            ].map(f => (
              <div key={f.key} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <f.icon size={16} className="text-orange-500"/>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{f.label}</p>
                  {editing ? (
                    <input type={f.type} value={form[f.key]} onChange={e => setForm(fm => ({...fm, [f.key]: e.target.value}))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium outline-none focus:border-orange-400 bg-gray-50"/>
                  ) : (
                    <p className="font-semibold text-gray-800 text-sm">{form[f.key] || "—"}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-3.5 rounded-2xl text-sm transition-all">
          <LogOut size={16}/> Sign Out
        </button>
      </div>
    </div>
  );
}