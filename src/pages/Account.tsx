import { useState } from "react";
import { ShieldCheck, ArrowRight, Lock, User, Key } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

export default function Account({ type = "Account" }: { type?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${isLogin ? 'Login' : 'Registration'} successful for ${email}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 text-brand-red rounded-2xl mb-6">
            {type === "Insurance" ? <ShieldCheck size={32} /> : <User size={32} />}
          </div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif mb-2">
            {type === "Insurance" ? "Insurance Member Login" : isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-slate-500">
            {type === "Insurance" 
              ? "Access your covered items and managed care benefits."
              : isLogin 
                ? "Sign in to manage your orders and health profile."
                : "Join Bendary Pharmacy for a better health experience."}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl border border-slate-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-brand-red transition-all"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                {type === "Insurance" ? "Membership Password" : "Password"}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-brand-red transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {isLogin && (
                <div className="mt-2 text-right">
                  <a href="#" className="text-xs font-bold text-slate-400 hover:text-brand-red transition-colors">Forgot Password?</a>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              {isLogin ? "Sign In" : "Sign Up"}
              <ArrowRight size={20} />
            </button>
          </form>

          {type !== "Insurance" && (
            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500 mb-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-brand-red font-bold hover:underline"
              >
                {isLogin ? "Create New Account" : "Sign In to Existing"}
              </button>
            </div>
          )}

          {type === "Insurance" && (
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Partners</div>
                <div className="text-sm font-bold text-slate-900">12+ Major Networks</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Support</div>
                <div className="text-sm font-bold text-slate-900">Direct Claims</div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
