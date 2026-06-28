"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const backgroundImages = [
  "/images/gallery/casetelite.jpg",
  "/images/gallery/workers.jpg",
  "/images/gallery/work imc.jpg"
];

export default function Hero({
  dict,
  lang = "en",
}: {
  dict?: any;
  lang?: string;
}) {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-20"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentBg]}
              alt="Mining Background"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 z-10"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-center w-full pt-20 pb-16 lg:pb-32 text-left h-full min-h-screen">
        <div className="flex-1 flex flex-col items-start max-w-3xl mt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white tracking-tight mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
          >
            {dict?.title_part1 || "Unearthing "}
            <span className="text-imc-gold drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              {dict?.title_highlight1 || "Value"}
            </span>
            <br className="hidden md:block" />
            {dict?.title_part2 || ", Sustaining "}
            <span className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              {dict?.title_highlight2 || "Communities."}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl md:text-2xl text-slate-200 max-w-2xl mb-10 font-sans drop-shadow-md"
          >
            {dict?.subtitle ||
              "Interafrican Mining Corporation (IMC) - Premier mining operations in Muhanga District, Rwanda, committed to excellence and environmental stewardship."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-start"
          >
            <a
              href={`/${lang}#about`}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest uppercase text-white bg-imc-blue hover:bg-imc-blue-light rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(30,58,138,0.5)]"
            >
              {dict?.cta_primary || "Discover IMC"}
              <ArrowRight className="ml-3" size={18} />
            </a>
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest uppercase text-white bg-transparent border-2 border-white hover:bg-white/10 rounded-full transition-all duration-300 shadow-md backdrop-blur-sm"
            >
              {dict?.cta_secondary || "Contact Us"}
            </a>
          </motion.div>
        </div>
      </div>

      {/* GetWave SVG at the bottom - Changed to match the section below */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 transform translate-y-[1px]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] lg:h-[120px]"
          style={{ fill: "#f8fafc" }}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
