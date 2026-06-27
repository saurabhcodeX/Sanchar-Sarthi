import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelect() {
  const { setLang } = useLanguage();
  const navigate = useNavigate();

  function choose(code) {
    setLang(code);
    navigate("/home");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--color-navy)] to-[var(--color-navy-light)] px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-navy)] mb-1">
          आईआरसीटीसी में आपका स्वागत है
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Welcome to Sanchar Sarthi
        </h2>

        <p className="text-gray-600 mb-1">कृपया अपनी पसंदीदा भाषा का चयन करें</p>
        <p className="text-gray-500 text-sm mb-8">Please select your preferred language</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => choose("hi")}
            className="flex-1 py-3 rounded-lg bg-[var(--color-navy)] text-white font-semibold text-lg hover:bg-[var(--color-navy-light)] transition-colors"
          >
            हिंदी
          </button>
          <button
            onClick={() => choose("en")}
            className="flex-1 py-3 rounded-lg border-2 border-[var(--color-navy)] text-[var(--color-navy)] font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
}
