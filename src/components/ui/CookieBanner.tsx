"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner({ dict }: { dict?: any }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      // Small delay to not show immediately on load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="mx-auto max-w-7xl rounded-2xl bg-imc-blue-dark p-6 shadow-2xl ring-1 ring-white/10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex-1 text-sm text-slate-300">
                <p>
                  {dict?.text || "We use cookies to improve your experience, analyze traffic, and process enquiries for Interafrican Mining Corporation."}{" "}
                  <a href="/cookie-policy" className="whitespace-nowrap font-semibold text-white underline hover:text-imc-gold transition-colors">
                    {dict?.policy || "Cookie policy"}
                  </a>
                  .
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <button
                  onClick={handleAccept}
                  className="w-full sm:w-auto px-6 py-2.5 text-[11px] font-bold tracking-widest uppercase bg-white text-imc-blue-dark rounded transition-colors hover:bg-slate-100"
                >
                  {dict?.accept || "Accept all"}
                </button>
                <button
                  onClick={handleDecline}
                  className="w-full sm:w-auto px-6 py-2.5 text-[11px] font-bold tracking-widest uppercase border border-slate-600 hover:border-slate-400 text-slate-300 rounded transition-colors"
                >
                  {dict?.decline || "Decline all"}
                </button>
                <button
                  className="w-full sm:w-auto px-6 py-2.5 text-[11px] font-bold tracking-widest uppercase border border-slate-600 hover:border-slate-400 text-slate-300 rounded transition-colors"
                >
                  {dict?.preferences || "Preferences"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
