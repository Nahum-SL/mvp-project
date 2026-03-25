// src/features/public-pages/about/components/StatItem.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  description: string;
}

export const StatItem = ({
  value,
  suffix = "",
  label,
  description,
}: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Spring para el movimiento fluido del número
  const springValue = useSpring(0, {
    stiffness: 60,
    damping: 20,
    duration: 2000,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.round(latest).toLocaleString(),
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <div ref={ref} className="relative p-8 group">
      {/* Decoración de fondo al hacer hover */}
      <div
        className="
        inset-0 bg-sky-500/5 opacity-0 
        group-hover:opacity-100 transition-opacity 
        rounded-[2.5rem] -z-10"
      />

      <div className="space-y-2">
        <div className="flex items-baseline justify-center gap-1">
          <motion.span className="text-6xl md:text-7xl font-extrabold text-white tracking-tighter">
            {displayValue}
          </motion.span>
          <span className="text-4xl font-extrabold text-green-500">{suffix}</span>
        </div>

        <div className="text-center">
          <h4
            className="text-sm font-extrabold uppercase tracking-[0.3em] 
          text-slate-200 mb-1"
          >
            {label}
          </h4>
          <p
            className="text-[10px] font-medium text-slate-500 
          uppercase tracking-widest leading-relaxed max-w-[15ch] mx-auto"
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
