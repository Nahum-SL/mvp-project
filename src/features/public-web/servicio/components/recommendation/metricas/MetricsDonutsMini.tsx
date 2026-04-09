"use client";

import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface Props {
  label: string;
  value: number; // 0 - 100
  color: string;
}

export function MetricsDonutMini({ label, value, color }: Props) {
  const radius = 22;
  const stroke = 5;
  const normalized = Math.min(Math.max(value, 0), 100);
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalized / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-14 h-14">
        <svg className="w-full h-full -rotate-90">
          {/* fondo */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            strokeWidth={stroke}
            className="stroke-slate-100"
            fill="transparent"
          />

          {/* progreso animado */}
          <motion.circle
            cx="28"
            cy="28"
            r={radius}
            strokeWidth={stroke}
            strokeLinecap="round"
            className={cn(color)}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>

        {/* valor */}
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">
          {Math.round(normalized / 10)}
        </div>
      </div>

      <span className="text-[9px] text-slate-400 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
