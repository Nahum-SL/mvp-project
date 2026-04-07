'use client';

import { motion } from "framer-motion";

interface DonutProps {
  value: number;
  label: string;
}

export function Donut({ value, label }: DonutProps) {
  const radius = 40;
  const stroke = 8;
  const normalized = Math.min(Math.max(value, 0), 100);

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalized / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg width="100" height="100" className="-rotate-90">
          {/* fondo */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={stroke}
            className="stroke-slate-200 fill-none"
          />

          {/* progreso */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={stroke}
            className="stroke-indigo-500 fill-none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>

        {/* valor */}
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-800">
          {Math.round(normalized / 10)}/10
        </div>
      </div>

      <span className="mt-2 text-xs text-slate-500">{label}</span>
    </div>
  );
}
