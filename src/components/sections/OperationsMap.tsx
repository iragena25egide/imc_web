"use client";

import { motion } from "framer-motion";
import { Pickaxe, Truck, HardHat, Globe } from "lucide-react";
import RwandaMap from "@/components/ui/RwandaMap";

export default function OperationsMap({ dict }: { dict?: any }) {
  return (
    <section
      id="operations"
      className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white relative overflow-hidden border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mb-8 text-center">
        <h2 className="text-sm text-imc-blue font-bold tracking-widest uppercase">
          {dict?.title || "Our Operations"}
        </h2>
        <p className="mt-2 text-2xl leading-tight font-heading font-extrabold tracking-tight text-imc-blue-dark sm:text-4xl">
          {dict?.heading || "The Mining Value Chain"}
        </p>
        <div className="mt-4 w-16 h-1 bg-imc-gold rounded-full mx-auto" />
      </div>

      {/* Circular Flow Container */}
      <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-full md:max-w-3xl md:h-[550px] mx-auto flex items-center justify-center mt-20 mb-24 md:mt-8 md:mb-8">
        {/* Center: User's Map of Rwanda with Districts */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="relative w-full h-full md:w-96 md:h-96 flex flex-col items-center justify-center rounded-full overflow-hidden">
            <img
              src="/map.png"
              alt="Rwanda Map pointing to Muhanga"
              className="w-full h-full object-cover scale-[1.2] md:scale-[1.05]"
              style={{
                mixBlendMode: "multiply",
                filter: "brightness(1.1) contrast(1.15)",
              }}
            />
          </div>
        </div>

        {/* Central Label pointing to Kabacuzi */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          {/* Label text */}
          <div className="mt-8 md:mt-8 bg-white/95 backdrop-blur-md text-imc-blue-dark text-[8px] md:text-[10px] font-bold uppercase tracking-widest px-3 md:px-4 py-2 rounded-lg shadow-xl border-2 border-imc-gold flex flex-col items-center">
            <span>{dict?.location1 || "Muhanga District"}</span>
            <span className="text-imc-gold mt-0.5 font-extrabold text-[10px] md:text-xs">
              {dict?.location2 || "Kabacuzi Sector"}
            </span>
          </div>
        </div>

        {/* Static Path Circle */}
        <div className="absolute inset-0 md:inset-auto md:w-[400px] md:h-[400px] rounded-full z-0 pointer-events-none border-[2px] border-dotted border-slate-200" />

        {/* Moving Flow Dots along the large circle (travels 1 -> 2 -> 3 -> 4) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 md:inset-auto md:w-[400px] md:h-[400px] rounded-full z-10 pointer-events-none"
        >
          {/* Main traveling flow dots (like a loading trail around the big circle) */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-imc-blue rounded-full shadow-[0_0_12px_rgba(0,75,152,0.9)] border-2 border-white" />
          <div className="absolute top-[1.2%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-imc-blue rounded-full opacity-70" />
          <div className="absolute top-[3%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-imc-blue rounded-full opacity-40" />
        </motion.div>

        {/* Static Nodes placed around the circle */}

        {/* Top: 1. Extraction (0 deg) */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-30 group">
          <div className="relative">
            <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white border-2 md:border-4 border-slate-100 rounded-full shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 z-10">
              <Pickaxe className="text-imc-gold w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <div className="mt-2 md:mt-3 bg-white/90 backdrop-blur px-2 md:px-3 py-1.5 md:py-2 rounded-lg shadow-sm border border-slate-100 absolute top-full left-1/2 -translate-x-1/2 min-w-[90px] md:min-w-[120px]">
            <h3 className="font-bold text-imc-blue-dark uppercase tracking-widest text-[8px] md:text-[10px]">
              {dict?.step1 || "1. Extraction"}
            </h3>
          </div>
        </div>

        {/* Right: 2. Processing (90 deg) */}
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-30 group">
          <div className="relative">
            <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white border-2 md:border-4 border-slate-100 rounded-full shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 z-10">
              <HardHat className="text-imc-blue w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <div className="mt-2 md:mt-3 bg-white/90 backdrop-blur px-2 md:px-3 py-1.5 md:py-2 rounded-lg shadow-sm border border-slate-100 absolute top-full left-1/2 -translate-x-1/2 min-w-[90px] md:min-w-[120px]">
            <h3 className="font-bold text-imc-blue-dark uppercase tracking-widest text-[8px] md:text-[10px]">
              {dict?.step2 || "2. Processing"}
            </h3>
          </div>
        </div>

        {/* Bottom: 3. Transport (180 deg) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center text-center z-30 group">
          <div className="mb-2 md:mb-3 bg-white/90 backdrop-blur px-2 md:px-3 py-1.5 md:py-2 rounded-lg shadow-sm border border-slate-100 absolute bottom-full left-1/2 -translate-x-1/2 min-w-[90px] md:min-w-[120px]">
            <h3 className="font-bold text-imc-blue-dark uppercase tracking-widest text-[8px] md:text-[10px]">
              {dict?.step3 || "3. Transport"}
            </h3>
          </div>
          <div className="relative">
            <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white border-2 md:border-4 border-slate-100 rounded-full shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 z-10">
              <Truck className="text-imc-gold w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </div>

        {/* Left: 4. Export (270 deg) */}
        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-30 group">
          <div className="relative">
            <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white border-2 md:border-4 border-slate-100 rounded-full shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 z-10">
              <Globe className="text-imc-blue w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <div className="mt-2 md:mt-3 bg-white/90 backdrop-blur px-2 md:px-3 py-1.5 md:py-2 rounded-lg shadow-sm border border-slate-100 absolute top-full left-1/2 -translate-x-1/2 min-w-[90px] md:min-w-[120px]">
            <h3 className="font-bold text-imc-blue-dark uppercase tracking-widest text-[8px] md:text-[10px]">
              {dict?.step4 || "4. Export"}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
