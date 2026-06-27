import { useNavigate } from "react-router-dom";
import { Train, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-extrabold text-gray-100 mb-4">404</div>
      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-5">
        <Train size={28} className="text-orange-500"/>
      </div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Train missed!</h1>
      <p className="text-gray-400 text-sm mb-8 max-w-xs">This page doesn't exist or has been moved. Let's get you back on track.</p>
      <div className="flex gap-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-all">
          <ArrowLeft size={15}/> Go Back
        </button>
        <button onClick={() => navigate("/")} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all active:scale-95">
          <Home size={15}/> Home
        </button>
      </div>
    </div>
  );
}