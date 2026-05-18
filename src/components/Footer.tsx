import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1 text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center text-white">
                <span className="font-bold">B</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">BENDARY</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Providing trusted healthcare, medicines, and wellness products to our community since 1980. Your health is our priority.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-brand-red transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-brand-red transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-brand-red transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/shop" className="hover:text-white transition-colors">Digital Shop</Link></li>
              <li><Link to="/prescription" className="hover:text-white transition-colors">Order Prescription</Link></li>
              <li><Link to="/insurance" className="hover:text-white transition-colors">Insurance Partners</Link></li>
              <li><Link to="/branches" className="hover:text-white transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-red" />
                <span>Hotline: 01200400094</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-red" />
                <span>info@bendary.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-red mt-1 shrink-0" />
                <span>Tanta, Al Gharbia, Egypt. Main Branch.</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} El-Bendary Pharmacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
