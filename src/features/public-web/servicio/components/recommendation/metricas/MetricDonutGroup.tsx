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
    <div className="relative">
      {/* Scroll container */}
      <motion.div
        className={cn(
          "flex gap-4 overflow-x-auto md:grid md:grid-cols-3",
          "snap-x snap-mandatory pb-2"
        )}
        drag="x"
        dragConstraints={{ left: -200, right: 0 }}
        dragElastic={0.2}
        dragMomentum={true}
        whileTap={{ cursor: "grabbing" }}
      >
        {metrics.map((metric, i) => {
          const value = values[metric.key as keyof typeof values];

          return (
            <motion.div
              key={metric.key}
              className={cn(
                "min-w-30 md:min-w-0",
                "snap-start",
                "bg-white border border-slate-200 rounded-2xl p-4",
                "shadow-sm"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Donut value={value} label={metric.label} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Fade derecha */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-linear-to-l from-white to-transparent md:hidden" />

      {/* Fade izquierda */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-linear-to-r from-white to-transparent md:hidden" />
    </div>
  );
}