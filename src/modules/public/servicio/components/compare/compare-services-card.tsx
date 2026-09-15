// src/features/public/servicio/components/compare/comparison-service-card.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
// config para el Donut Chart
import { COMPARISON_MODES } from "../../utils/compare/comparison-copys.config";
import { COMPARISON_METRICS } from "../../utils/compare/comparison-metrics.config";
import type { ComparisonModeKey } from "../../utils/compare/comparison-copys.config";
// components
import { MetricDonutChart } from "./rechart/metrics-donut-chart";
// types
import type { ScoredService } from "@/src/types/servicio/scoring.types";

interface ComparisonServiceCardProps {
  service: ScoredService;
  bestScore: number;
  mode: ComparisonModeKey;
  showAI: boolean;
}

export function ComparisonServiceCard({
  service,
  bestScore,
  mode,
  showAI,
}: ComparisonServiceCardProps) {
  const styles = COMPARISON_MODES[mode];
  const isNeutral = mode === "neutral";

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300",
        styles.card,
      )}
    >
      {/* Badge Superior */}
      {showAI && !isNeutral && (
        <div className="absolute top-0 right-0">
          <div
            className={cn(
              "text-white px-4 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider",
              styles.badge,
            )}
          >
            {styles.badgeText}
          </div>
        </div>
      )}

      <h3 className="text-base font-bold text-slate-800 mb-4 pr-10 leading-snug">
        {service.title}
      </h3>

      <div className="space-y-4">
        {/* Gráfico de Barra de Prioridad */}
        <div className="flex items-end justify-between gap-2">
          <div className="flex-1 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Puntuación de Prioridad
            </p>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              {showAI && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${bestScore > 0 ? (service.priorityScore / bestScore) * 100 : 0}%`,
                  }}
                  className={cn("h-full rounded-full", styles.bar)}
                />
              )}
            </div>
          </div>
          {showAI && (
            <span
              className={cn(
                "text-2xl font-bold leading-none select-none",
                styles.accent,
              )}
            >
              {Math.round(service.priorityScore / 10)}
            </span>
          )}
        </div>

        {/* Sección de Mini Donas Recharts Mapeadas mediante Config Estática */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100 px-1">
          {showAI && service.recommendationMeta ? (
            COMPARISON_METRICS.map((metric) => {
              // Extraemos dinámicamente el valor numérico (impact, effort, risk) validado por Zod
              const metricValue = service.recommendationMeta?.[metric.id] ?? 0;
              return (
                <MetricDonutChart
                  key={metric.id}
                  label={metric.label}
                  value={metricValue}
                  variant={metric.id}
                />
              );
            })
          ) : (
            <div className="text-[11px] text-slate-300 italic text-center w-full py-2">
              Métricas de viabilidad ocultas sin objetivos claros.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
