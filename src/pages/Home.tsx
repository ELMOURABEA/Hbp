import { Pill, ShieldCheck, Heart, ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-full medical-gradient rounded-l-[100px] opacity-10 blur-3xl transform translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[30%] h-full bg-brand-red rounded-r-[100px] opacity-5 blur-3xl transform -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-brand-red text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                </span>
                Serving Since 1980
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 font-serif">
                Care that feels like <span className="text-brand-red italic">family.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
                Experience healthcare excellence with Tanta's most trusted pharmacy. From chronic medication to wellness, we've been your partner in health for over 40 years.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-brand-red text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-red-200 hover:bg-brand-red-dark hover:-translate-y-0.5 transition-all"
                >
                  Shop Now
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/prescription"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold hover:border-slate-300 transition-all"
                >
                  Upload Prescription
                </Link>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">45k+</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Patients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">24/7</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Authentic</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1200&auto=format&fit=crop" 
                  alt="Modern Pharmacy"
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Certified Care</div>
                  <div className="text-[10px] text-slate-500 uppercase font-medium">Licensed Pharmacy</div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Heart size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Wellness First</div>
                  <div className="text-[10px] text-slate-500 uppercase font-medium">Holistic Approach</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl font-serif">Comprehensive Healthcare Services</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              We offer more than just medicines. Our core services are designed to make your health journey seamless and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Shop",
                desc: "Browse thousands of health, beauty, and wellness products with doorstep delivery in Tanta and across Egypt.",
                icon: Pill,
                link: "/shop",
                color: "bg-red-100 text-brand-red"
              },
              {
                title: "e-Prescription",
                desc: "Upload your prescription and let our pharmacists handle the rest. We'll verify, package, and deliver your medications.",
                icon: FileText,
                link: "/prescription",
                color: "bg-blue-100 text-blue-600"
              },
              {
                title: "Insurance Integration",
                desc: "We partner with major clinical insurance providers. Login with your membership to access covered medications.",
                icon: ShieldCheck,
                link: "/insurance",
                color: "bg-green-100 text-green-600"
              }
            ].map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
                >
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", service.color)}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{service.desc}</p>
                  <Link to={service.link} className="inline-flex items-center gap-1 text-slate-900 font-bold group-hover:text-brand-red transition-colors">
                    Learn More
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}


