import { useState } from "react";
import { Bell, CheckCircle2, Train, Tag, AlertCircle, Info, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL = [
  { id:1, type:"booking", title:"Booking Confirmed",          body:"Your ticket for Vande Bharat (PNR: 4521876543) is confirmed.",   time:"2 hrs ago",  read:false },
  { id:2, type:"offer",   title:"Special Offer: 10% off!",   body:"Use code RAIL10 to get 10% off on your next booking.",           time:"Yesterday",  read:false },
  { id:3, type:"info",    title:"Train Running Late",         body:"Shatabdi Express #12005 is running 25 minutes late today.",       time:"Yesterday",  read:true  },
  { id:4, type:"booking", title:"Booking Cancelled",          body:"Your booking BK004 has been cancelled. Refund in 5-7 days.",     time:"3 days ago", read:true  },
  { id:5, type:"offer",   title:"Earn Wallet Cashback",       body:"Book 3 tickets this month and earn ₹200 wallet cashback.",       time:"5 days ago", read:true  },
  { id:6, type:"info",    title:"New Route Added",            body:"Delhi–Ayodhya Vande Bharat now available for booking.",          time:"1 week ago", read:true  },
];

const ICONS = {
  booking: { icon: Train,         bg:"bg-blue-50",   color:"text-blue-500"   },
  offer:   { icon: Tag,           bg:"bg-orange-50", color:"text-orange-500" },
  info:    { icon: Info,          bg:"bg-gray-100",  color:"text-gray-500"   },
  alert:   { icon: AlertCircle,   bg:"bg-red-50",    color:"text-red-500"    },
};

export default function Notifications() {
  const [items, setItems] = useState(INITIAL);

  function markRead(id) {
    setItems(ns => ns.map(n => n.id===id ? {...n, read:true} : n));
  }

  function remove(id) {
    setItems(ns => ns.filter(n => n.id!==id));
  }

  function markAllRead() {
    setItems(ns => ns.map(n => ({...n, read:true})));
  }

  const unread = items.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0A1628] text-white px-6 py-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold">Notifications</h1>
            <p className="text-blue-300 text-sm mt-1">{unread} unread</p>
          </div>
          {unread > 0 && (
            <button onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-white transition-colors">
              <CheckCircle2 size={14}/> Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Bell size={40} className="mx-auto mb-3 opacity-30"/>
            <p className="font-semibold">No notifications</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {items.map(n => {
                const cfg = ICONS[n.type] || ICONS.info;
                const Icon = cfg.icon;
                return (
                  <motion.div key={n.id}
                    initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:16,height:0}}
                    onClick={() => markRead(n.id)}
                    className={`bg-white rounded-2xl border shadow-sm p-4 flex items-start gap-4 cursor-pointer transition-all hover:shadow-md ${!n.read?"border-orange-200 bg-orange-50/30":"border-gray-100"}`}>
                    <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon size={18} className={cfg.color}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className={`font-bold text-sm ${!n.read?"text-gray-900":"text-gray-600"}`}>{n.title}</p>
                        {!n.read && <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"/>}
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{n.body}</p>
                      <p className="text-[10px] text-gray-300 mt-1.5 font-medium">{n.time}</p>
                    </div>
                    <button onClick={e => { e.stopPropagation(); remove(n.id); }}
                      className="text-gray-300 hover:text-red-400 transition-colors shrink-0 mt-0.5">
                      <Trash2 size={14}/>
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}