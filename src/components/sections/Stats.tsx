"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Building2, TrendingUp, Trophy } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const Counter = ({ end, suffix = "", duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Easing function for smooth deceleration
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function Stats({ dict }: { dict?: any }) {
  const stats = [
    { name: dict?.employees || "Employees", value: 500, suffix: "+", icon: Users },
    { name: dict?.sites || "Active Sites", value: 1, suffix: "", icon: Building2 },
    { name: dict?.tons || "Annual Extracted Tons", value: 90, suffix: "-95", icon: TrendingUp },
    { name: dict?.years || "Years Excellence", value: 3, suffix: "+", icon: Trophy },
  ];

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-imc-blue-dark">
      {/* Moving Background Objects */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-imc-blue rounded-full mix-blend-screen filter blur-3xl opacity-30"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-imc-gold rounded-full mix-blend-screen filter blur-3xl opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
            >
              <div className="p-4 bg-white/10 rounded-xl mb-4 text-imc-gold">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-heading tracking-tight">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm tracking-widest uppercase font-medium text-slate-300">
                {stat.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
