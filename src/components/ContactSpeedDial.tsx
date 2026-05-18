import { Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

export default function ContactSpeedDial() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-center gap-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all focus:outline-none",
          isOpen && "rotate-45"
        )}
        title="Contact Us"
      >
         <span className="text-2xl leading-none -mt-1">+</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="flex flex-col gap-3"
          >
            <a
              href="https://wa.me/201200400094"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
              title="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="tel:01200400094"
              className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
              title="Call Us"
            >
              <Phone size={20} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
