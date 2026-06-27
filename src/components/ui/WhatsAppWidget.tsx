"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import Image from "next/image";

export default function WhatsAppWidget({ dict }: { dict?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "250788000000"; // Replace with actual number

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-[#075e54] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white/20 shadow-sm flex-shrink-0">
                  <Image 
                    src="/logo.png" 
                    alt="IMC Logo" 
                    fill 
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm leading-tight">Interafrican Mining Corp</h3>
                  <p className="text-white/80 text-xs mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    {dict?.status || "Typically replies instantly"}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-96 bg-[#e5ddd5] overflow-y-auto relative">
              {/* WhatsApp background pattern (optional soft texture) */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
              
              <div className="relative z-10 flex flex-col gap-3">
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm self-start max-w-[85%]">
                  <p className="text-slate-800 text-sm whitespace-pre-line">
                    {dict?.greeting || "Hello there! 👋\n\nWelcome to Interafrican Mining Corporation. How can we help you today?"}
                  </p>
                  <p className="text-[10px] text-slate-400 text-right mt-1">{dict?.time || "Just now"}</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#f0f0f0] border-t border-slate-200">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={dict?.placeholder || "Type a message..."}
                  className="flex-1 bg-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#128C7E] border-none shadow-sm text-slate-800"
                  required
                />
                <button 
                  type="submit"
                  disabled={!message.trim()}
                  className="w-10 h-10 bg-[#128C7E] rounded-full flex items-center justify-center text-white shrink-0 hover:bg-[#075e54] transition-colors disabled:opacity-50 disabled:hover:bg-[#128C7E]"
                >
                  <Send size={18} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] rounded-full shadow-xl flex items-center justify-center text-white hover:bg-[#128C7E] transition-colors relative"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        )}
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
}
