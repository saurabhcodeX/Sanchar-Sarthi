import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

export default function SwapButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClick}
      title="Swap stations"
      className="w-9 h-9 rounded-full bg-[#0A1628] text-white flex items-center justify-center shadow-md hover:bg-orange-500 transition-colors duration-200 border-2 border-white"
    >
      <ArrowLeftRight size={16} />
    </motion.button>
  );
}