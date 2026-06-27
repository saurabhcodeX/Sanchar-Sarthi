import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("ss_lang") || null);

  useEffect(() => {
    if (lang) localStorage.setItem("ss_lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

// Simple translation dictionary — add more keys as the app grows
export const translations = {
  en: {
    bookTicket: "BOOK TICKET",
    from: "From",
    to: "To",
    date: "Date",
    allClasses: "All Classes",
    general: "GENERAL",
    pwdConcession: "Person With Disability Concession",
    flexibleDate: "Flexible With Date",
    passConcession: "Railway Pass Concession",
    searchTrains: "Search Trains",
    pnrStatus: "PNR STATUS",
    chartsVacancy: "CHARTS / VACANCY",
    loginRegister: "LOGIN / REGISTER",
    trains: "TRAINS",
    meals: "MEALS",
    cashback: "Upto 10% Cashback",
    eWallet: "E-WALLET",
    alerts: "ALERTS",
    otherServices: "OTHER SERVICES",
    contactUs: "CONTACT US",
  },
  hi: {
    bookTicket: "टिकट बुक करें",
    from: "से",
    to: "तक",
    date: "तारीख",
    allClasses: "सभी श्रेणियाँ",
    general: "सामान्य",
    pwdConcession: "दिव्यांगजन रियायत",
    flexibleDate: "तारीख में लचीलापन",
    passConcession: "रेलवे पास रियायत",
    searchTrains: "ट्रेनें खोजें",
    pnrStatus: "पीएनआर स्थिति",
    chartsVacancy: "चार्ट / रिक्ति",
    loginRegister: "लॉगिन / रजिस्टर",
    trains: "ट्रेनें",
    meals: "भोजन",
    cashback: "10% तक कैशबैक",
    eWallet: "ई-वॉलेट",
    alerts: "सूचनाएं",
    otherServices: "अन्य सेवाएं",
    contactUs: "संपर्क करें",
  },
};
