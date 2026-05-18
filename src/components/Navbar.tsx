import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Pill, FileText, ShieldCheck, MapPin, Menu, X, Globe, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useSettings } from "@/src/contexts/SettingsContext";

const navLinks = [
  { href: "/", labelKey: "nav.home", icon: Pill },
  { href: "/shop", labelKey: "nav.shop", icon: ShoppingCart },
  { href: "/prescription", labelKey: "nav.prescription", icon: FileText },
  { href: "/insurance", labelKey: "nav.insurance", icon: ShieldCheck },
  { href: "/branches", labelKey: "nav.branches", icon: MapPin },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, theme, toggleTheme, language, toggleLanguage } = useSettings();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 medical-gradient rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                <Pill size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">BENDARY</span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-brand-red uppercase -mt-1">Since 1980</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                    isActive 
                      ? "bg-red-50 dark:bg-brand-red/10 text-brand-red" 
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Icon size={18} />
                  {t(link.labelKey)}
                </Link>
              );
            })}
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
            
            <button
               onClick={toggleTheme}
               className="p-2 text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors"
               title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
               onClick={toggleLanguage}
               className="p-2 text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors font-bold text-sm flex items-center gap-1"
               title="Toggle Language"
            >
              <Globe size={18} />
              {language === 'en' ? 'AR' : 'EN'}
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
            
            <Link to="/cart" className="p-2 text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors relative">
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-red text-white text-[10px] flex items-center justify-center rounded-full">0</span>
            </Link>
            <Link to="/account" className="p-2 text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">
              <User size={22} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
             <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400">
               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button onClick={toggleLanguage} className="p-2 text-slate-600 dark:text-slate-400 font-bold text-xs uppercase flex items-center gap-1">
               <Globe size={16} />
               {language}
             </button>
            <Link to="/cart" className="p-2 text-slate-600 dark:text-slate-400 relative">
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-red text-white text-[10px] flex items-center justify-center rounded-full">0</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-base font-medium flex items-center gap-3",
                      isActive 
                        ? "bg-red-50 dark:bg-brand-red/10 text-brand-red" 
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                    )}
                  >
                    <Icon size={20} />
                    {t(link.labelKey)}
                  </Link>
                );
              })}
              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 dark:text-slate-300 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                <User size={20} />
                {t("nav.account")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
