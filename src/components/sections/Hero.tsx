"use client";

import { motion } from "framer-motion";
import { ArrowRight, Pickaxe } from "lucide-react";
import Image from "next/image";

export default function Hero({
  dict,
  lang = "en",
}: {
  dict?: any;
  lang?: string;
}) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center w-full gap-12 pt-10 pb-16 lg:pb-32">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-2xl lg:text-7xl font-heading font-bold text-imc-blue-dark tracking-tight mb-6"
          >
            {dict?.title_part1 || "Unearthing "}
            <span className="text-imc-gold">
              {dict?.title_highlight1 || "Value"}
            </span>
            <br />
            {dict?.title_part2 || ", Sustaining "}
            <span className="text-imc-blue">
              {dict?.title_highlight2 || "Communities."}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-2xl md:text-2xl text-slate-600 max-w-2xl mb-10 font-sans"
          >
            {dict?.subtitle ||
              "Interafrican Mining Corporation (IMC) - Premier mining operations in Muhanga District, Rwanda, committed to excellence and environmental stewardship."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={`/${lang}#about`}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest uppercase text-white bg-imc-blue hover:bg-imc-blue-light rounded-full transition-all duration-300 shadow-lg"
            >
              {dict?.cta_primary || "Discover IMC"}
              <ArrowRight className="ml-3" size={18} />
            </a>
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest uppercase text-imc-blue-dark bg-white border-2 border-imc-blue hover:bg-slate-50 rounded-full transition-all duration-300"
            >
              {dict?.cta_secondary || "Contact Us"}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 w-full max-w-lg lg:max-w-none relative z-10 hidden lg:block h-[600px]"
        >
          {/* 3 Animated Moving Images */}
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-0 z-20"
          >
            <Image
              src="/images/gallery/casetelite.jpg"
              alt="Mining Operations"
              width={350}
              height={400}
              className="rounded-3xl border-8 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] object-cover h-[400px]"
              priority
            />
          </motion.div>

          <motion.div
            animate={{ y: [15, -15, 15] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-40 right-0 z-30"
          >
            <Image
              src="/images/gallery/workers.jpg"
              alt="Mining Equipment"
              width={320}
              height={350}
              className="rounded-3xl border-8 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] object-cover h-[350px]"
              priority
            />
          </motion.div>

          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-10 left-20 z-40"
          >
            <Image
              src="/images/gallery/work imc.jpg"
              alt="Processing Facility"
              width={300}
              height={300}
              className="rounded-3xl border-8 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] object-cover h-[300px]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* GetWave SVG at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 transform translate-y-[1px]">
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
