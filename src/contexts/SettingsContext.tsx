import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type Language = "en" | "ar";

interface SettingsContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.prescription": "Prescription",
    "nav.insurance": "Insurance",
    "nav.branches": "Branches",
    "nav.account": "My Account",
    "hero.title": "Care that feels like",
    "hero.family": "family.",
    "hero.desc": "Experience healthcare excellence with Tanta's most trusted pharmacy. From chronic medication to wellness, we've been your partner in health for over 40 years.",
    "hero.shop": "Shop Now",
    "hero.upload": "Upload Prescription",
    "shop.title": "Pharmacy Shop",
    "shop.desc": "Premium health and wellness products delivered to your door.",
    "shop.search": "Search medications...",
    "shop.buy": "Buy Now",
    "shop.details": "Details",
    "common.close": "Close",
    "common.loading": "Loading...",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.shop": "المتجر",
    "nav.prescription": "الروشتة",
    "nav.insurance": "التأمين",
    "nav.branches": "الفروع",
    "nav.account": "الحساب",
    "hero.title": "رعاية تشعرك وكأنك وسط",
    "hero.family": "عائلتك.",
    "hero.desc": "اختبر التميز في الرعاية الصحية مع صيدلية طنطا الأكثر ثقة. من أدوية الأمراض المزمنة إلى العناية بالصحة، نحن شريكك الصحي لأكثر من 40 عامًا.",
    "hero.shop": "تسوق الآن",
    "hero.upload": "ارفع روشتة",
    "shop.title": "متجر الصيدلية",
    "shop.desc": "منتجات الصحة والعناية الممتازة تصلك حتى باب المنزل.",
    "shop.search": "ابحث عن الأدوية...",
    "shop.buy": "شراء",
    "shop.details": "تفاصيل",
    "common.close": "إغلاق",
    "common.loading": "جاري التحميل...",
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");

  // On mount check local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedLang = localStorage.getItem("language") as Language;
    
    if (savedTheme) setTheme(savedTheme);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");

    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
  }, [language]);

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");
  const toggleLanguage = () => setLanguage(prev => prev === "en" ? "ar" : "en");

  const t = (key: string) => {
    return translations[language]?.[key] || translations["en"][key] || key;
  };

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within SettingsProvider");
  return context;
}
