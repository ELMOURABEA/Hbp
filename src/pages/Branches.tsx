import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const branches = [
  {
    name: "Tanta - Main Branch",
    address: "Al-Gharbia, Tanta, Saeed St.",
    phone: "01200400094",
    hours: "24 Hours Open",
    mapUrl: "#"
  },
  {
    name: "Cairo - Downtown",
    address: "Talaat Harb St, Downtown Cairo",
    phone: "02-23456789",
    hours: "8:00 AM - 12:00 AM",
    mapUrl: "#"
  },
  {
    name: "Alexandria - Corniche",
    address: "Corniche Rd, Stanley, Alexandria",
    phone: "03-45678912",
    hours: "9:00 AM - 11:00 PM",
    mapUrl: "#"
  }
];

export default function Branches() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 font-serif mb-4">Our Pharmacy Network</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Visit us at any of our strategically located branches for professional consultation and immediate medical assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {branches.map((branch, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col"
          >
            <div className="w-12 h-12 bg-red-50 text-brand-red rounded-xl flex items-center justify-center mb-6">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{branch.name}</h3>
            
            <div className="space-y-4 flex-1">
              <div className="flex gap-3 text-slate-600 text-sm">
                <MapPin size={18} className="shrink-0 text-slate-400" />
                <span>{branch.address}</span>
              </div>
              <div className="flex gap-3 text-slate-600 text-sm">
                <Phone size={18} className="shrink-0 text-slate-400" />
                <span>{branch.phone}</span>
              </div>
              <div className="flex gap-3 text-slate-600 text-sm">
                <Clock size={18} className="shrink-0 text-slate-400" />
                <span>{branch.hours}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex gap-4">
              <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                Call Branch
                <Phone size={14} />
              </button>
              <a 
                href={branch.mapUrl}
                className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-brand-red hover:border-brand-red transition-all"
                title="View on Maps"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[40px] p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--brand-red)_0%,_transparent_70%)]" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6 font-serif">Can't find a branch near you?</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            Our digital shop delivers to all governorates in Egypt. Order online and get your medications delivered within 24-48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-brand-red text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-red-dark transition-all">
              Order Online
            </button>
            <button className="bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
              Contact 19xxx Hotline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
