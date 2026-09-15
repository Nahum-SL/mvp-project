"use client";

import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
// lib - Estilos para las metricas
import { METRIC_THEMES } from "../utils/metric-themes";
// Utils
import {
    getImpactInsight,
    getEffortInsight,
    getRiskInsight,
} from "../utils/service-evaluation-util";

interface Props {
  impact: number;
  effort: number;
  risk: number;
}

export default function ServiceEvaluation({ impact, effort, risk }: Props) {
  const items = [
    {
      type: "impact" as const,
      value: impact,
      insight: getImpactInsight(impact),
    },
    {
      type: "effort" as const,
      value: effort,
      insight: getEffortInsight(effort),
    },
    { type: "risk" as const, value: risk, insight: getRiskInsight(risk) },
  ];

  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-500 mb-4">
            Evaluación estratégica
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
            ¿Qué tan conveniente es esta solución?
          </h2>

          <p className="text-slate-500 mt-4 text-sm">
            Analizamos impacto, esfuerzo y riesgo para ayudarte a tomar una
            decisión informada.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {items.map((item, i) => {
            const theme = METRIC_THEMES[item.type];
            const Icon = theme.icon;

            return (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative p-8 rounded-3xl bg-white border border-slate-200",
                  "overflow-hidden transition-all duration-300",
                  "hover:shadow-2xl hover:shadow-slate-200/60",
                  theme.border, // Borde dinámico al hacer hover
                )}
              >
                {/* Glow Dinámico - Tailwind v4 bg-linear */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none",
                    theme.glow,
                  )}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-10">
                    <span
                      className={cn(
                        "text-xs font-bold uppercase tracking-[0.2em]",
                        theme.color,
                      )}
                    >
                      {theme.label}
                    </span>
                    <Icon className={cn("w-6 h-6", theme.color)} />
                  </div>

                  <div className="mb-6">
                    <span className="text-6xl text-slate-900 tracking-tight">
                      {Math.round(item.value / 10)}
                    </span>
                    <span className="text-xl text-slate-400 font-medium ml-1">
                      /10
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mt-auto border-l-2 border-slate-100 pl-4">
                    {item.insight}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
