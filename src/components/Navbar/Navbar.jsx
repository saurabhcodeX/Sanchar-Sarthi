import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Train, Menu, X, User } from "lucide-react";
import { useLanguage, translations } from "../../context/LanguageContext";

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "Trains", to: "/train-status" },
  { label: "PNR Status", to: "/pnr" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const t = translations[lang || "en"];
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Brand */}
        <Link to="/home" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[var(--color-navy)] flex items-center justify-center">
            <Train size={18} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-[var(--color-navy)] text-base">Sanchar Sarthi</p>
            <p className="text-[10px] text-gray-400 tracking-wide">INDIAN RAILWAY COMPANION</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  active ? "text-[var(--color-navy)]" : "text-gray-600 hover:text-[var(--color-navy)]"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-[var(--color-accent)] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "hi" ? "en" : "hi")}
            className="text-sm font-medium text-gray-600 hover:text-[var(--color-navy)]"
          >
            {lang === "hi" ? "English" : "हिंदी"}
          </button>
          <Link
            to="/login"
            className="flex items-center gap-1.5 bg-[var(--color-navy)] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[var(--color-navy-light)] transition-colors"
          >
            <User size={15} /> {t.loginRegister}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-[var(--color-navy)]" onClick={() => setMobileOpen((o) => !o)}>
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
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm font-medium text-gray-700"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center bg-[var(--color-navy)] text-white font-semibold py-2.5 rounded-full"
              >
                {t.loginRegister}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
