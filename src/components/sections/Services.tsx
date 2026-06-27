"use client";

import { motion } from "framer-motion";
import { Gem, Microscope, Truck, HardHat, Factory, Earth } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Mineral Exploration",
      description: "Utilizing advanced geophysics and core drilling to accurately locate and assess mineral deposits across Rwanda.",
      icon: Microscope,
    },
    {
      title: "Extraction Operations",
      description: "State-of-the-art open-pit and underground mining techniques ensuring maximum yield with minimal environmental impact.",
      icon: PickaxeIcon,
    },
    {
      title: "Material Processing",
      description: "On-site processing facilities equipped with modern technology to refine raw ore into high-grade concentrates.",
      icon: Factory,
    },
    {
      title: "Logistics & Transport",
      description: "Secure and efficient supply chain management, moving processed minerals from Muhanga to global markets.",
      icon: Truck,
    },
    {
      title: "Site Rehabilitation",
      description: "Comprehensive environmental restoration programs post-extraction, returning land to safe and productive use.",
      icon: Earth,
    },
    {
      title: "Occupational Safety",
      description: "Rigorous health and safety protocols prioritizing the well-being of our workforce and local communities.",
      icon: HardHat,
    },
  ];

  function PickaxeIcon(props: any) {
    return <Gem {...props} />;
  }

  return (
    <section id="services" className="py-16 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-sm text-imc-blue font-bold tracking-widest uppercase">Capabilities</h2>
          <p className="mt-4 text-4xl leading-tight font-heading font-extrabold tracking-tight text-imc-blue-dark sm:text-5xl">
            Our Core Services
          </p>
          <div className="mt-6 w-20 h-1 bg-imc-gold rounded-full mx-auto" />
          <p className="mt-6 max-w-2xl text-lg text-slate-600 mx-auto">
            Comprehensive mining solutions tailored for efficiency, safety, and sustainable output.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative group bg-slate-50 p-10 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-imc-blue/50 overflow-hidden"
            >
              <div className="inline-flex p-4 rounded-2xl bg-white text-imc-blue mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 group-hover:bg-imc-blue group-hover:text-white border border-slate-100">
                <service.icon className="h-8 w-8" />
              </div>
              
              <h3 className="text-2xl font-bold font-heading text-imc-blue-dark mb-4">
                {service.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
