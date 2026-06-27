"use client";

import { motion } from "framer-motion";
import { Send, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate network request
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm text-imc-blue font-bold tracking-widest uppercase">
            Get In Touch
          </h2>
          <p className="mt-4 text-4xl leading-tight font-heading font-extrabold tracking-tight text-imc-blue-dark sm:text-5xl">
            Partner With IMC
          </p>
          <div className="mt-6 w-20 h-1 bg-imc-gold rounded-full mx-auto" />
          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
            Interested in our operations or looking for a partnership? Reach out
            to our team in Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col justify-center"
          >
            <div className="p-8 sm:p-12">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-[11px] font-bold tracking-widest uppercase text-slate-700 mb-1.5"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      placeholder="Firstname"
                      required
                      className="block w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-imc-blue focus:border-imc-blue transition-colors outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-[11px] font-bold tracking-widest uppercase text-slate-700 mb-1.5"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      placeholder="Lastname"
                      required
                      className="block w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-imc-blue focus:border-imc-blue transition-colors outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-bold tracking-widest uppercase text-slate-700 mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email address"
                    required
                    className="block w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-imc-blue focus:border-imc-blue transition-colors outline-none placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[11px] font-bold tracking-widest uppercase text-slate-700 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="How can we help you?"
                    required
                    className="block w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-imc-blue focus:border-imc-blue transition-colors outline-none resize-none placeholder:text-slate-400"
                  ></textarea>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={formStatus !== "idle"}
                    className="w-full flex justify-center items-center py-3.5 px-6 border border-transparent rounded-lg shadow-md text-sm tracking-widest uppercase font-bold text-imc-blue-dark bg-imc-gold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imc-gold transition-all duration-300 disabled:opacity-70"
                  >
                    {formStatus === "idle" && (
                      <>
                        Send Message <Send className="ml-3" size={16} />
                      </>
                    )}
                    {formStatus === "submitting" && "Sending..."}
                    {formStatus === "success" && "Message Sent!"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col h-full min-h-[400px] sm:min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative group"
          >
            {/* Overlay to give the map a branded blue tint */}
            <div className="absolute inset-0 bg-imc-blue-dark/20 mix-blend-multiply pointer-events-none transition-opacity duration-500 group-hover:opacity-0 z-10" />

            <iframe
              src="https://maps.google.com/maps?q=Muhanga,%20Rwanda&t=&z=11&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) contrast(120%)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />

            {/* Custom Location Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
              <div className="bg-imc-gold p-3 rounded-full">
                <MapPin className="text-imc-blue-dark" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-imc-blue-dark text-sm uppercase tracking-widest mb-1">
                  Muhanga, Kabacuzi
                </h4>
                <p className="text-xs text-slate-600">
                  Primary Mining Operations Center
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
