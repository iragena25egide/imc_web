"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { boardMembers, BoardMember } from "@/data/board";

const ProfileCard = ({ member, delay, dict }: { member: BoardMember; delay: number; dict?: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="flex flex-col items-center bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-imc-blue/30 transition-all duration-300 relative group overflow-hidden h-full"
  >
    {/* Card Logo Watermark */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.03] pointer-events-none">
      <Image src="/logo.png" alt="Card Logo" fill className="object-contain" />
    </div>
    
    <div className="flex flex-col items-center flex-1 w-full relative z-10">
      <div className="relative w-24 h-24 mb-5 rounded-full overflow-hidden border-4 border-slate-50 group-hover:border-imc-blue/10 transition-colors shadow-inner flex-shrink-0">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      
      <h3 className="text-base font-bold font-heading text-imc-blue-dark mb-1 text-center group-hover:text-imc-blue transition-colors px-2">
        {member.name}
      </h3>
      <p className="text-xs font-bold tracking-widest uppercase text-imc-gold mb-4 text-center px-2">
        {dict?.roles?.[member.roleKey] || member.position}
      </p>
    </div>
  </motion.div>
);

export default function Board({ dict }: { dict?: any }) {
  return (
    <section id="board" className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] opacity-[0.03] pointer-events-none">
        <Image src="/logo.png" alt="Background Logo" fill className="object-contain" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm text-imc-blue font-bold tracking-widest uppercase">{dict?.subtitle || "Leadership"}</h2>
          <p className="mt-4 text-4xl leading-tight font-heading font-extrabold tracking-tight text-imc-blue-dark sm:text-5xl">
            {dict?.title || "Board of Directors"}
          </p>
          <div className="mt-6 w-20 h-1 bg-imc-gold rounded-full mx-auto" />
        </div>

        <div className="w-full pt-4 relative z-10 flex flex-col items-center">
          
          {/* Managing Director (Level 1) */}
          {boardMembers.filter(m => m.level === 1).map((member) => (
            <div key={member.id} className="w-full max-w-[280px] lg:max-w-[320px] mb-0 relative z-20">
              <ProfileCard member={member} delay={0.1} dict={dict} />
            </div>
          ))}

          {/* Org Chart Flow Connectors (Visible only on Desktop) */}
          {boardMembers.filter(m => m.level === 1).length > 0 && (
            <div className="hidden lg:flex flex-col items-center w-full relative z-0">
              {/* Vertical line down from MD */}
              <div className="w-[2px] h-10 bg-imc-gold/40"></div>
              
              {/* Horizontal spanning line */}
              <div className="w-[calc(75%-18px)] h-[2px] bg-imc-gold/40 relative">
                {/* 4 Vertical drops */}
                <div className="absolute top-0 left-0 w-full flex justify-between h-8">
                  <div className="w-[2px] h-8 bg-imc-gold/40"></div>
                  <div className="w-[2px] h-8 bg-imc-gold/40"></div>
                  <div className="w-[2px] h-8 bg-imc-gold/40"></div>
                  <div className="w-[2px] h-8 bg-imc-gold/40"></div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Spacer */}
          <div className="h-8 lg:h-0"></div>

          {/* Other Directors Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:mt-8 relative z-10">
            {boardMembers.filter(m => m.level !== 1).map((member, index) => (
              <ProfileCard key={member.id} member={member} delay={0.2 + (index * 0.1)} dict={dict} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
