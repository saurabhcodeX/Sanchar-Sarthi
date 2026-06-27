import { useState } from "react";
import { Wallet as WalletIcon, Plus, ArrowDownLeft, ArrowUpRight, IndianRupee, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const TRANSACTIONS = [
  { id:1, type:"credit", desc:"Refund - BK003 Cancelled",    amount:780,  date:"20 Jun 2026" },
  { id:2, type:"debit",  desc:"Ticket - Vande Bharat (3A)",  amount:980,  date:"18 Jun 2026" },
  { id:3, type:"credit", desc:"Added via UPI",                amount:2000, date:"15 Jun 2026" },
  { id:4, type:"debit",  desc:"Ticket - Rajdhani Exp (2A)",  amount:3240, date:"10 Jun 2026" },
  { id:5, type:"credit", desc:"Cashback reward",              amount:50,   date:"10 Jun 2026" },
  { id:6, type:"credit", desc:"Added via Net Banking",        amount:5000, date:"01 Jun 2026" },
];

const AMOUNTS = [500, 1000, 2000, 5000];

export default function Wallet() {
  const [balance]   = useState(850);
  const [adding, setAdding] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0A1628] px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-blue-300 text-sm mb-1">Sanchar Sarthi Wallet</p>
          <div className="flex items-end gap-3">
            <div>
              <p className="text-xs text-blue-300 uppercase tracking-wider mb-1">Available Balance</p>
              <p className="text-4xl font-extrabold text-white">₹{balance.toLocaleString()}</p>
            </div>
          </div>
          <button onClick={() => setAdding(a => !a)}
            className="mt-5 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all active:scale-95">
            <Plus size={16}/> Add Money
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Add money panel */}
        {adding && (
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-bold text-gray-800 mb-4">Add Money to Wallet</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {AMOUNTS.map(a => (
                <button key={a} onClick={() => setAmount(String(a))}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${amount===String(a)?"bg-orange-500 text-white border-orange-500":"bg-gray-50 border-gray-200 text-gray-600 hover:border-orange-300"}`}>
                  ₹{a}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-orange-400 bg-gray-50">
                <IndianRupee size={15} className="text-gray-400"/>
                <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Enter amount"
                  className="flex-1 outline-none text-sm font-bold text-gray-800 bg-transparent"/>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 rounded-xl text-sm flex items-center gap-2 transition-all">
                <CreditCard size={15}/> Pay
              </button>
            </div>
          </motion.div>
        )}

        {/* Transactions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <p className="px-5 py-4 font-bold text-gray-800 border-b border-gray-100 text-sm">Transaction History</p>
          <div className="divide-y divide-gray-100">
            {TRANSACTIONS.map((t, i) => (
              <motion.div key={t.id} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
                className="flex items-center gap-4 px-5 py-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${t.type==="credit"?"bg-green-50":"bg-red-50"}`}>
                  {t.type==="credit"
                    ? <ArrowDownLeft size={18} className="text-green-500"/>
                    : <ArrowUpRight size={18} className="text-red-400"/>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{t.desc}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.date}</p>
                </div>
                <p className={`font-extrabold text-sm ${t.type==="credit"?"text-green-600":"text-red-500"}`}>
                  {t.type==="credit"?"+":"−"}₹{t.amount.toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}