import { Link } from "react-router-dom";
import {
  Train,
  Plane,
  Hotel,
  Bus,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
const FOOTER_LINKS = {
  "Travel": [
    { label: "Train Booking", to: "/" },
    { label: "Flight Booking", to: "/flights" },
    { label: "Hotel Booking", to: "/hotels" },
    { label: "Popular Routes", to: "/" },
  ],
  "Tools": [
    { label: "PNR Status", to: "/pnr-status" },
    { label: "Live Train Status", to: "/live-status" },
    { label: "Charts & Vacancy", to: "/live-status" },
    { label: "Seat Availability", to: "/" },
  ],
  "Company": [
    { label: "About Us", to: "/contact" },
    { label: "Contact Us", to: "/contact" },
    { label: "Support", to: "/support" },
    { label: "Careers", to: "/" },
  ],
  "Account": [
    { label: "Login / Register", to: "/login" },
    { label: "My Bookings", to: "/bookings" },
    { label: "My Profile", to: "/profile" },
    { label: "Wallet", to: "/wallet" },
  ],
};

const SOCIAL = [
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
];
const SERVICES = [
  { icon: Train,  label: "Trains"  },
  { icon: Plane,  label: "Flights" },
  { icon: Hotel,  label: "Hotels"  },
  { icon: Bus,    label: "Buses"   },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">

      {/* Top CTA strip */}
      <div className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-white text-sm">
            🚆 Book smarter with Sanchar Sarthi — India's fastest travel booking platform
          </p>
          <Link to="/login"
            className="shrink-0 flex items-center gap-1.5 bg-white text-orange-600 font-bold px-5 py-2 rounded-full text-sm hover:bg-orange-50 transition-colors">
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
                <Train size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-base">Sanchar Sarthi</p>
                <p className="text-[10px] text-gray-400 tracking-wide">INDIAN RAILWAY COMPANION</p>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              India's smartest travel booking platform. Search trains, flights, and hotels — all in one place.
            </p>

            {/* Services */}
            <div className="flex gap-3 mb-6">
              {SERVICES.map(({ icon: Icon, label }) => (
                <div key={label} title={label}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors cursor-pointer">
                  <Icon size={16} className="text-white" />
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors">
                  <Icon size={15} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to}
                      className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Contact strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: MapPin, text: "Chandigarh University, Punjab, India" },
            { icon: Phone, text: "+91 98765 43210" },
            { icon: Mail,  text: "support@sancharsarthi.in" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-gray-400 text-sm">
              <Icon size={14} className="text-orange-400 shrink-0" />
              {text}
            </div>
          ))}
        </div>

        {/* App download */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white mb-1">Download the Sanchar Sarthi App</p>
            <p className="text-xs text-gray-400">Book tickets on the go — available soon on iOS and Android</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-colors px-4 py-2.5 rounded-xl cursor-pointer border border-white/10">
              <div className="text-white">
                <p className="text-[9px] text-gray-300">Download on the</p>
                <p className="text-sm font-bold">App Store</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-colors px-4 py-2.5 rounded-xl cursor-pointer border border-white/10">
              <div className="text-white">
                <p className="text-[9px] text-gray-300">Get it on</p>
                <p className="text-sm font-bold">Google Play</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 Sanchar Sarthi. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy Policy","Terms of Service","Cookie Policy","Sitemap"].map((item) => (
              <a key={item} href="#" className="hover:text-gray-300 transition-colors">{item}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}