import { motion } from "framer-motion";
import { Tag, Zap, Gift, CreditCard, ArrowRight } from "lucide-react";

const OFFERS = [
  {
    id: 1,
    tag: "LIMITED TIME",
    tagColor: "bg-red-100 text-red-600",
    title: "Flat 20% off on Tatkal Tickets",
    desc: "Use code TATKAL20 and save big on your next urgent booking.",
    code: "TATKAL20",
    icon: Zap,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    gradient: "from-orange-50 to-amber-50",
    border: "border-orange-200",
  },
  {
    id: 2,
    tag: "NEW USER",
    tagColor: "bg-green-100 text-green-600",
    title: "₹150 off on First Booking",
    desc: "New to Sanchar Sarthi? Get ₹150 off on your very first train ticket.",
    code: "FIRST150",
    icon: Gift,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    gradient: "from-green-50 to-emerald-50",
    border: "border-green-200",
  },
  {
    id: 3,
    tag: "BANK OFFER",
    tagColor: "bg-blue-100 text-blue-600",
    title: "10% Cashback on SBI Cards",
    desc: "Pay with SBI Debit or Credit card and get 10% instant cashback.",
    code: "SBI10",
    icon: CreditCard,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    gradient: "from-blue-50 to-sky-50",
    border: "border-blue-200",
  },
  {
    id: 4,
    tag: "WEEKEND SPECIAL",
    tagColor: "bg-purple-100 text-purple-600",
    title: "Free Hotel Night on Combo Booking",
    desc: "Book a train + hotel together this weekend and get 1 night free.",
    code: "COMBO1",
    icon: Tag,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    gradient: "from-purple-50 to-violet-50",
    border: "border-purple-200",
  },
];

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button onClick={handleCopy}
      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
        copied
          ? "bg-green-500 text-white border-green-500"
          : "bg-white border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-600"
      }`}>
      {copied ? "✓ Copied!" : `USE ${code}`}
    </button>
  );
}

import { useState } from "react";

export default function OffersSection() {
  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">Exclusive Deals</p>
            <h2 className="text-3xl font-black text-[#0A1628]">Offers & Discounts</h2>
            <p className="text-gray-500 text-sm mt-1">Save more on every booking with these exclusive deals</p>
          </div>
          <button className="hidden md:flex items-center gap-1.5 text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
            View all offers <ArrowRight size={15} />
          </button>
        </div>

        {/* Offer cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OFFERS.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`bg-gradient-to-br ${offer.gradient} border ${offer.border} rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg transition-all`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${offer.tagColor}`}>
                    {offer.tag}
                  </span>
                  <div className={`w-9 h-9 rounded-xl ${offer.iconBg} flex items-center justify-center`}>
                    <Icon size={16} className={offer.iconColor} />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1">{offer.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{offer.desc}</p>
                </div>

                <CopyButton code={offer.code} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}