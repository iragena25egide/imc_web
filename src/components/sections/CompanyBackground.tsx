"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Pickaxe, ShieldCheck, Gem, Sprout } from "lucide-react";

export default function CompanyBackground({ dict }: { dict?: any }) {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-white">
      {/* Background Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] opacity-[0.03] pointer-events-none">
        <Image src="/logo.png" alt="Background Logo" fill className="object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm text-imc-blue font-bold tracking-widest uppercase">{dict?.subtitle || "Our Story"}</h2>
          <p className="mt-4 text-4xl leading-tight font-heading font-extrabold tracking-tight text-imc-blue-dark sm:text-5xl">
            {dict?.title || "Company Background"}
          </p>
          <div className="mt-6 w-20 h-1 bg-imc-gold rounded-full mx-auto" />
        </div>

        <div className="prose prose-lg prose-slate max-w-4xl mx-auto text-slate-600 leading-relaxed space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl font-medium text-imc-blue-dark leading-relaxed">
              {dict?.p1 || "IMC Ltd is a Rwandan mining company engaged in the exploration, development, extraction, and processing of mineral resources."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <motion.div 
              className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-imc-blue/10 rounded-xl flex items-center justify-center text-imc-blue mb-6">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-imc-blue-dark mb-3">{dict?.card1Title || "Strategic Minerals"}</h3>
              <p className="text-slate-600">
                {dict?.card1Desc || "We primarily focus on the extraction and production of tin (cassiterite) and tantalum-bearing minerals (coltan)."}
              </p>
            </motion.div>

            <motion.div 
              className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-imc-gold/10 rounded-xl flex items-center justify-center text-imc-gold mb-6">
                <Pickaxe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-imc-blue-dark mb-3">{dict?.card2Title || "Exploration & Future"}</h3>
              <p className="text-slate-600">
                {dict?.card2Desc || "Recent exploration activities have identified promising lithium-bearing pegmatite mineralization."}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <p dangerouslySetInnerHTML={{__html: dict?.p2 || ""}} />
            <p>
              {dict?.p3}
            </p>
            <p>
              {dict?.p4}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
