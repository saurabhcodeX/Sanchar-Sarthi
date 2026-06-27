import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Train, Eye, EyeOff, Phone, Lock, User,
  Mail, Calendar, ArrowRight, ShieldCheck, ChevronLeft, AlertCircle
} from "lucide-react";
import { auth } from "../services/auth";

// ── Reusable field ────────────────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, icon: Icon, placeholder, error }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all bg-gray-50 focus-within:bg-white focus-within:border-orange-400 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] ${
        error ? "border-red-300 bg-red-50/30" : "border-gray-200"
      }`}>
        {Icon && <Icon size={16} className={error ? "text-red-400" : "text-gray-400"} />}
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-300 font-medium"
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(s => !s)} className="text-gray-400 hover:text-gray-600 transition-colors">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

// ── Password strength ─────────────────────────────────────────────────────────
function PasswordStrength({ password }) {
  if (!password) return null;
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
  const colors = ["bg-red-400","bg-red-400","bg-yellow-400","bg-blue-400","bg-green-500"];
  const labels = ["","Weak","Fair","Good","Strong"];
  const textColors = ["","text-red-400","text-yellow-500","text-blue-500","text-green-600"];
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[0,1,2,3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score] : "bg-gray-200"}`} />
        ))}
      </div>
      <p className={`text-xs mt-1 font-semibold ${textColors[score]}`}>{labels[score]} password</p>
    </div>
  );
}

// ── Login form ────────────────────────────────────────────────────────────────
function LoginForm({ onSuccess }) {
  const [userId, setUserId]   = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]   = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  function validate() {
    const e = {};
    if (!userId.trim()) e.userId = "User ID or mobile is required.";
    if (!password)      e.password = "Password is required.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setApiError("");
    setLoading(true);
    try {
      const user = await auth.login({ userId, password });
      onSuccess(user);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Field label="User ID / Mobile" value={userId} onChange={e => setUserId(e.target.value)}
        icon={Phone} placeholder="Enter mobile or IRCTC ID" error={errors.userId} />
      <Field label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
        icon={Lock} placeholder="Enter your password" error={errors.password} />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
            className="accent-orange-500 w-3.5 h-3.5" />
          Remember me
        </label>
        <button type="button" className="text-xs text-orange-500 hover:text-orange-600 font-semibold transition-colors">
          Forgot password?
        </button>
      </div>

      {apiError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2.5 rounded-xl">
          <AlertCircle size={14} className="shrink-0" /> {apiError}
        </div>
      )}

      <button type="submit" disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm tracking-wide shadow-sm">
        {loading
          ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          : <><span>Sign In</span><ArrowRight size={15} /></>}
      </button>

      <div className="relative my-1">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs text-gray-400">or</span>
        </div>
      </div>

      <button type="button"
        className="w-full border border-gray-200 hover:bg-gray-50 transition-all py-2.5 rounded-xl text-sm font-semibold text-gray-600 flex items-center justify-center gap-2">
        <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" />
        Continue with Google
      </button>
    </form>
  );
}

// ── Register form ─────────────────────────────────────────────────────────────
function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({ name:"", mobile:"", email:"", dob:"", password:"", confirm:"" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed]   = useState(false);
  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  function validate() {
    const e = {};
    if (!form.name.trim())                          e.name    = "Full name is required.";
    if (!/^\d{10}$/.test(form.mobile))              e.mobile  = "Enter a valid 10-digit mobile.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.dob)                                  e.dob     = "Date of birth is required.";
    if (form.password.length < 8)                   e.password= "Min. 8 characters required.";
    if (form.password !== form.confirm)             e.confirm = "Passwords do not match.";
    if (!agreed)                                    e.agreed  = "Please accept the terms.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setApiError("");
    setLoading(true);
    try {
      const user = await auth.register(form);
      onSuccess(user);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Full Name"      value={form.name}   onChange={upd("name")}   icon={User}     placeholder="Your name"      error={errors.name} />
        <Field label="Mobile"         value={form.mobile} onChange={upd("mobile")} icon={Phone}    placeholder="10-digit"       error={errors.mobile} />
      </div>
      <Field label="Email"            value={form.email}  onChange={upd("email")}  icon={Mail}     placeholder="you@email.com"  error={errors.email}  type="email" />
      <Field label="Date of Birth"    value={form.dob}    onChange={upd("dob")}    icon={Calendar} error={errors.dob}           type="date" />
      <div>
        <Field label="Password"       value={form.password} onChange={upd("password")} icon={Lock} placeholder="Min 8 chars" error={errors.password} type="password" />
        <PasswordStrength password={form.password} />
      </div>
      <Field label="Confirm Password" value={form.confirm}  onChange={upd("confirm")}  icon={Lock} placeholder="Re-enter"     error={errors.confirm} type="password" />

      <label className="flex items-start gap-2 cursor-pointer select-none">
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
          className="accent-orange-500 mt-0.5 w-3.5 h-3.5 shrink-0" />
        <span className={`text-xs leading-relaxed ${errors.agreed ? "text-red-500" : "text-gray-500"}`}>
          I agree to the{" "}
          <span className="text-orange-500 font-semibold">Terms of Service</span> and{" "}
          <span className="text-orange-500 font-semibold">Privacy Policy</span>
        </span>
      </label>
      {errors.agreed && <p className="text-red-500 text-xs -mt-2 flex items-center gap-1"><AlertCircle size={11}/>{errors.agreed}</p>}

      {apiError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2.5 rounded-xl">
          <AlertCircle size={14} className="shrink-0" /> {apiError}
        </div>
      )}

      <button type="submit" disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm tracking-wide shadow-sm">
        {loading
          ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          : <><span>Create Account</span><ArrowRight size={15} /></>}
      </button>
    </form>
  );
}

// ── Success screen ────────────────────────────────────────────────────────────
function SuccessScreen({ tab, user, onContinue }) {
  return (
    <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
      className="flex flex-col items-center text-center py-6 gap-4">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <ShieldCheck size={32} className="text-green-500" />
      </div>
      <div>
        <h3 className="text-xl font-extrabold text-gray-900">
          {tab === "login" ? `Welcome back, ${user?.name || "Traveller"}!` : "Account created!"}
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {tab === "login" ? "You're signed in successfully." : "Your Sanchar Sarthi account is ready."}
        </p>
      </div>
      <button onClick={onContinue}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl text-sm flex items-center gap-2 transition-all active:scale-95">
        Go to Home <ArrowRight size={15} />
      </button>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function LoginRegister() {
  const [tab, setTab]       = useState("login");
  const [success, setSuccess] = useState(false);
  const [user, setUser]     = useState(null);
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from || "/";

  function handleSuccess(u) {
    setUser(u);
    setSuccess(true);
  }

  function handleContinue() {
    navigate(from, { replace: true });
  }

  function switchTab(t) {
    setTab(t);
    setSuccess(false);
    setUser(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0d2244] to-[#0A1628] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.45 }} className="relative w-full max-w-lg">

        {/* Brand */}
        <div className="text-center mb-7">
          <Link to="/" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-4 hover:bg-white/15 transition-colors">
            <Train size={17} className="text-orange-400" />
            <span className="text-white font-bold text-sm tracking-wide">Sanchar Sarthi</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {success ? "You're in!" : tab === "login" ? "Welcome back" : "Join us today"}
          </h1>
          <p className="text-blue-300 text-sm mt-1.5">
            {success ? "Redirecting you now…" : tab === "login"
              ? "Sign in to manage your bookings"
              : "Create your free account in seconds"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* Tabs */}
          {!success && (
            <div className="grid grid-cols-2 border-b border-gray-100">
              {["login","register"].map(t => (
                <button key={t} onClick={() => switchTab(t)}
                  className={`py-4 text-sm font-bold tracking-wide relative transition-colors ${
                    tab === t ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                  }`}>
                  {t === "login" ? "Sign In" : "Register"}
                  {tab === t && (
                    <motion.div layoutId="underline"
                      className="absolute bottom-0 left-6 right-6 h-0.5 bg-orange-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Body */}
          <div className="p-7">
            <AnimatePresence mode="wait">
              {success ? (
                <SuccessScreen key="success" tab={tab} user={user} onContinue={handleContinue} />
              ) : (
                <motion.div key={tab}
                  initial={{ opacity:0, x: tab==="login" ? -16 : 16 }}
                  animate={{ opacity:1, x:0 }}
                  exit={{ opacity:0, x: tab==="login" ? 16 : -16 }}
                  transition={{ duration:0.2 }}>
                  {tab === "login"
                    ? <LoginForm onSuccess={handleSuccess} />
                    : <RegisterForm onSuccess={handleSuccess} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Switch tab hint */}
          {!success && (
            <p className="text-center text-xs text-gray-400 pb-6">
              {tab === "login"
                ? <>No account?{" "}<button onClick={() => switchTab("register")} className="text-orange-500 font-bold hover:underline">Register free</button></>
                : <>Already registered?{" "}<button onClick={() => switchTab("login")} className="text-orange-500 font-bold hover:underline">Sign in</button></>}
            </p>
          )}
        </div>

        {/* Back + trust */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <Link to="/" className="text-blue-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors">
            <ChevronLeft size={13} /> Back to Home
          </Link>
          <div className="flex items-center gap-5">
            {["SSL Secured","IRCTC Partner","256-bit Encrypted"].map(b => (
              <div key={b} className="flex items-center gap-1 text-blue-400/50 text-[10px] font-medium">
                <ShieldCheck size={10} />{b}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}