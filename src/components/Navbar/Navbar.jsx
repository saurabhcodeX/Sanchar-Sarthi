import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Train, Menu, X, User, ChevronDown, LogOut, BookOpen, Ticket, Cpu } from "lucide-react";
import { useLanguage, translations } from "../../context/LanguageContext";
import { auth } from "../../services/auth";

const navLinks = [
  { label: "Home",         to: "/" },
  { label: "Trains",       to: "/results" },
  { label: "Flights",      to: "/flights" },
  { label: "Hotels",       to: "/hotels" },
  { label: "PNR Status",   to: "/pnr-status" },
  { label: "Live Status",  to: "/live-status" },
  { label: "Architecture", to: "/architecture" },
  { label: "Contact",      to: "/contact" },
];

const mobileLinks = [
  { label: "Home",         to: "/" },
  { label: "Trains",       to: "/results" },
  { label: "Flights",      to: "/flights" },
  { label: "Hotels",       to: "/hotels" },
  { label: "PNR Status",   to: "/pnr-status" },
  { label: "Live Status",  to: "/live-status" },
  { label: "Architecture", to: "/architecture" },
  { label: "My Bookings",  to: "/bookings" },
  { label: "Contact",      to: "/contact" },
];

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const t = translations[lang || "en"];
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser]                 = useState(auth.getUser());
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setUser(auth.getUser());
  }, [location.pathname]);

  function handleLogout() {
    auth.logout();
    setUser(null);
    setUserMenuOpen(false);
    navigate("/");
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#0A1628] flex items-center justify-center">
            <Train size={18} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-[#0A1628] text-base">Sanchar Sarthi</p>
            <p className="text-[10px] text-gray-400 tracking-wide">INDIAN RAILWAY COMPANION</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  active ? "text-[#0A1628]" : "text-gray-500 hover:text-[#0A1628]"
                }`}>
                {link.label}
                {active && (
                  <motion.span layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-orange-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button onClick={() => setLang(lang === "hi" ? "en" : "hi")}
            className="text-sm font-medium text-gray-500 hover:text-[#0A1628] transition-colors">
            {lang === "hi" ? "English" : "हिंदी"}
          </button>

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setUserMenuOpen(v => !v)}
                className="flex items-center gap-2 bg-[#0A1628] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#0d2266] transition-colors">
                <User size={15} />
                <span className="max-w-[100px] truncate">{user.name || user.userId}</span>
                <ChevronDown size={13} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.name || user.userId}</p>
                    </div>
                    <Link to="/bookings" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                      <BookOpen size={14} /> My Bookings
                    </Link>
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                      <User size={14} /> Profile
                    </Link>
                    <Link to="/wallet" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                      <Ticket size={14} /> Wallet
                    </Link>
                    <Link to="/architecture" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                      <Cpu size={14} /> Architecture
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login"
              className="flex items-center gap-1.5 bg-[#0A1628] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#0d2266] transition-colors">
              <User size={15} /> LOGIN / REGISTER
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-[#0A1628]" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-1">
              {user && (
                <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-3 py-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#0A1628] flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-800">{user.name || user.userId}</p>
                  </div>
                </div>
              )}

              {mobileLinks.map((link) => (
                <Link key={link.to} to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2.5 px-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === link.to ? "text-orange-600 bg-orange-50" : "text-gray-700 hover:bg-gray-50"
                  }`}>
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 pt-2 border-t border-gray-100">
                {user ? (
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 text-red-500 font-semibold py-2.5 rounded-xl border border-red-100 hover:bg-red-50 transition-colors text-sm">
                    <LogOut size={15} /> Sign Out
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setMobileOpen(false)}
                    className="block text-center bg-[#0A1628] text-white font-semibold py-2.5 rounded-full text-sm">
                    LOGIN / REGISTER
                  </Link>
                )}
              </div>

              <button onClick={() => setLang(lang === "hi" ? "en" : "hi")}
                className="text-xs text-gray-400 text-center mt-1 py-1">
                {lang === "hi" ? "Switch to English" : "हिंदी में बदलें"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}