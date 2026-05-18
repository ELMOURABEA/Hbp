import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Pill, FileText, ShieldCheck, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Pill },
  { href: "/shop", label: "Shop", icon: ShoppingCart },
  { href: "/prescription", label: "Prescription", icon: FileText },
  { href: "/insurance", label: "Insurance", icon: ShieldCheck },
  { href: "/branches", label: "Branches", icon: MapPin },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 medical-gradient rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                <Pill size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900">BENDARY</span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-brand-red uppercase -mt-1">Since 1980</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
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
                      ? "bg-red-50 text-brand-red" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <Link to="/cart" className="p-2 text-slate-600 hover:text-brand-red transition-colors relative">
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-red text-white text-[10px] flex items-center justify-center rounded-full">0</span>
            </Link>
            <Link to="/account" className="p-2 text-slate-600 hover:text-brand-red transition-colors">
              <User size={22} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="p-2 text-slate-600 relative">
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-red text-white text-[10px] flex items-center justify-center rounded-full">0</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none"
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
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
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
                        ? "bg-red-50 text-brand-red" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <Icon size={20} />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 flex items-center gap-3"
              >
                <User size={20} />
                My Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
