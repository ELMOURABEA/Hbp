import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Prescription from "./pages/Prescription";
import Account from "./pages/Account";
import Branches from "./pages/Branches";
import StaticPage, { AboutContent, PrivacyContent, TermsContent } from "./pages/StaticPages";
import { AnimatePresence, motion } from "motion/react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<PageLayout><Home /></PageLayout>} />
          <Route path="/shop" element={<PageLayout><Shop /></PageLayout>} />
          <Route path="/prescription" element={<PageLayout><Prescription /></PageLayout>} />
          <Route path="/insurance" element={<PageLayout><Account type="Insurance" /></PageLayout>} />
          <Route path="/account" element={<PageLayout><Account /></PageLayout>} />
          <Route path="/branches" element={<PageLayout><Branches /></PageLayout>} />
          <Route path="/about" element={<PageLayout><StaticPage title="About Us" content={AboutContent} /></PageLayout>} />
          <Route path="/privacy" element={<PageLayout><StaticPage title="Privacy Policy" content={PrivacyContent} /></PageLayout>} />
          <Route path="/terms" element={<PageLayout><StaticPage title="Terms & Conditions" content={TermsContent} /></PageLayout>} />
          <Route path="/cart" element={<PageLayout><div className="max-w-7xl mx-auto px-4 py-24 text-center">
            <h1 className="text-4xl font-bold mb-4 font-serif text-slate-900">Your Cart</h1>
            <p className="text-slate-500 mb-8">Your cart is currently empty.</p>
          </div></PageLayout>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
