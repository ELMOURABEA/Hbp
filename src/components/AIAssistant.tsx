import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: 'Hello! I am the Bendary Pharmacy AI Assistant. How can I help you today? Ask me about medications, services, or branches.' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      
      const data = await res.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I'm having trouble connecting to the system right now." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, a network error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-[6rem] right-6 p-4 rounded-full shadow-2xl transition-all z-40 bg-brand-red text-white hover:bg-brand-red-dark hover:scale-105",
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
      >
        <MessageSquare size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[6rem] right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-red p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Bendary AI Pharmacist</h3>
                  <p className="text-[10px] text-red-100 uppercase tracking-wider">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300" : "bg-red-100 dark:bg-brand-red/20 text-brand-red"
                  )}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl max-w-[75%] text-sm leading-relaxed whitespace-pre-wrap",
                    msg.role === 'user' 
                      ? "bg-slate-900 dark:bg-slate-800 text-white rounded-tr-sm" 
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 shadow-sm rounded-tl-sm"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-brand-red/20 text-brand-red rounded-full flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-brand-red" />
                    <span className="text-xs text-slate-400">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Ask about a medication..."
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 dark:text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-brand-red transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-3 bg-brand-red text-white rounded-xl hover:bg-brand-red-dark disabled:opacity-50 disabled:hover:bg-brand-red transition-all"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
