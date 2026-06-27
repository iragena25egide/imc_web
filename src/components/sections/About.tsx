"use client";

import { motion } from "framer-motion";
import { Mountain, Target, ShieldCheck } from "lucide-react";

export default function About({ dict }: { dict?: any }) {
  const features = [
    {
      name: dict?.features?.[0]?.name || "Our Mission",
      description:
        dict?.features?.[0]?.description ||
        "To extract mineral resources efficiently and responsibly, maximizing value for our stakeholders while fostering community development in Rwanda.",
      icon: Target,
    },
    {
      name: dict?.features?.[1]?.name || "Our Vision",
      description:
        dict?.features?.[1]?.description ||
        "To be the leading and most trusted mining corporation in East Africa, setting the benchmark for sustainable practices and operational excellence.",
      icon: Mountain,
    },
    {
      name: dict?.features?.[2]?.name || "Core Values",
      description:
        dict?.features?.[2]?.description ||
        "Safety first, environmental stewardship, integrity, and community empowerment form the foundation of every operation at IMC.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="about"
      className="py-8 lg:py-12 bg-slate-50 bg-mountain-pattern overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm text-imc-blue font-bold tracking-widest uppercase">
              {dict?.title || "About Us"}
            </h2>
            <p className="mt-4 text-4xl leading-tight font-heading font-extrabold tracking-tight text-imc-blue-dark sm:text-5xl">
              {dict?.heading || "Interafrican Mining Corporation"}
            </p>
            <div className="mt-6 w-20 h-1 bg-imc-gold rounded-full" />

            <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
              {dict?.description2 ||
                "Our operations are deeply rooted in the Rwandan landscape, and we pride ourselves on a symbiotic relationship with local communities. By prioritizing safety and sustainability, we ensure that our mining footprint leaves a lasting positive legacy."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-16 lg:mt-0"
          >
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  className="flex bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 hover:border-imc-blue/30 relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  {/* Card Logo Watermark */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none">
                    <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-shrink-0 relative z-10">
                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-slate-50 border border-slate-100 text-imc-blue group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="ml-6 relative z-10">
                    <h3 className="text-xl font-bold tracking-tight text-imc-blue-dark font-heading">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
