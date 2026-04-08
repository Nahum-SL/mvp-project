"use client";

import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { Donut } from "./Donut";

interface Props {
  impact: number;
  effort: number;
  risk: number;
}

const metrics = [
  { key: "impact", label: "Impacto" },
  { key: "effort", label: "Esfuerzo" },
  { key: "risk", label: "Riesgo" },
];

export function MetricsDonutGroup({ impact, effort, risk }: Props) {
  const values = { impact, effort, risk };

  return (
    <div className="relative w-full">
      {/* 1. Eliminamos 'drag' para evitar conflictos con el scroll nativo.
          2. Usamos 'w-full flex' con scroll nativo.
      */}
      <div
        className={cn(
          "flex gap-4 overflow-x-auto md:grid md:grid-cols-3",
          "snap-x snap-mandatory pb-4 no-scrollbar touch-pan-x",
        )}
      >
        {metrics.map((metric, i) => {
          const value = values[metric.key as keyof typeof values];

          return (
            <motion.div
              key={metric.key}
              className={cn(
                "shrink-0 w-35 md:w-full", // Ancho fijo en móvil para que entren bien
                "snap-center md:snap-none",
                "bg-white border border-slate-100 rounded-2xl p-4",
                "shadow-sm",
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Donut value={value} label={metric.label} />
            </motion.div>
          );
        })}
      </div>

      {/* Fades más sutiles para no tapar los números */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-linear-to-l from-white via-white/20 to-transparent md:hidden z-20" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-linear-to-r from-white via-white/20 to-transparent md:hidden z-20" />
    </div>
  );
}
