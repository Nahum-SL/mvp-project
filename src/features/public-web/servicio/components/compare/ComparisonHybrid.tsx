"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ScoredService } from "@/src/types/servicio/scoring.types";
import { cn } from "@/src/lib/utils";
import { Info, Sparkles, Trophy } from "lucide-react";

import { ComparisonTableStripe } from "./ComparisonTableStripe";
import { MetricsDonutMini } from "../recommendation/metricas/MetricsDonutsMini";

interface Props {
  services: ScoredService[];
  hasContext?: boolean;
}

export default function ComparisonHybrid({ services, hasContext }: Props) {
  //  calcular scores
  const enriched = useMemo(() => {
    // Llega vacio durante la carga inicial, evitar errores de acceso a propiedades
    if (!services || services.length === 0) return [];
    return services.map((s) => {
      // Asegúrate de que estamos accediendo al objeto correcto
      // Si NestJS envía los datos, vienen dentro de recommendationMeta
      const meta = s.recommendationMeta;

      const impact = meta?.impact ?? 0;
      const effort = meta?.effort ?? 0;
      const risk = meta?.risk ?? 0;

      const priorityScore = Math.max(0, impact * 2 - effort - risk);

      return {
        ...s,
        impact,
        effort,
        risk,
        priorityScore,
      };
    });
  }, [services]);

  const bestScore = enriched.length
    ? Math.max(...enriched.map((s) => s.priorityScore))
    : 0;

  // Servicios con el mejor score (puede haber empate)
  const bestServices = enriched.filter((s) => s.priorityScore === bestScore);
  // En lugar de comparar igualdad exacta (===), comparamos la diferencia
  const isTie = bestServices.length > 1;
  // Ganador
  const hasWinner = bestServices.length === 1;
  // Mostramos las metricas IA si hay contexto
  const showAI = hasContext;

  const cardStyles = {
    winner:
      "border-indigo-500 bg-linear-to-b from-indigo-50/50 to-white shadow-indigo-100/50 shadow-lg",
    tie: "border-emerald-500 bg-linear-to-b from-emerald-50/50 to-white shadow-emerald-100/50 shadow-md",
    neutral: "border-slate-100 bg-white hover:border-slate-200 shadow-sm",
  };

  const accentColor = {
    winner: "text-indigo-600",
    tie: "text-emerald-600",
    neutral: "text-slate-400",
  };

  const barColor = {
    winner: "bg-indigo-500",
    tie: "bg-emerald-500",
    neutral: "bg-slate-400",
  };

  return (
    <div className="space-y-8">
      {/* BANNER 1: Sin Contexto */}
      {!hasContext && (
        <div
          className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 
        border border-amber-100 text-amber-800 shadow-sm animate-in fade-in slide-in-from-top-2"
        >
          <Info size={18} className="shrink-0" />
          <p className="text-xs md:text-sm font-medium">
            <strong>Comparación general:</strong> Define tus objetivos en el
            selector para personalizar estas métricas.
          </p>
        </div>
      )}

      {/* BANNER 2: Ganador Único */}
      {hasWinner && showAI && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 text-sm text-indigo-800 border border-indigo-100 shadow-sm animate-in fade-in slide-in-from-top-2">
          <Trophy className="shrink-0 text-indigo-600" size={18} />
          <p className="leading-relaxed">
            Basado en tus objetivos, <strong>{bestServices[0].title}</strong> es
            la opción con mejor balance de impacto y viabilidad.
          </p>
        </div>
      )}

      {/* BANNER 3: Empate */}
      {isTie && showAI && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 text-sm text-emerald-800 border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-top-2">
          <Sparkles className="shrink-0 text-emerald-500" size={18} />
          <p className="leading-relaxed">
            Ambos servicios presentan una <strong>prioridad equilibrada</strong>
            . La decisión final puede inclinarse según tu{" "}
            <span className="font-bold decoration-emerald-200">
              presupuesto
            </span>{" "}
            o la{" "}
            <span className="font-bold decoration-emerald-200">
              velocidad de implementación
            </span>
            .
          </p>
        </div>
      )}

      {/* GRID DE TARJETAS del EMPATE */}
      {isTie && showAI && (
        <div className="space-y-1 text-xs text-slate-500">
          {bestServices.map((s) => (
            <div key={s.id}>
              {s.title}: alto impacto, balanceado en esfuerzo y riesgo
            </div>
          ))}
        </div>
      )}

      {/*  TOP CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {enriched.map((svc) => {
          const isBest = bestServices.some((s) => s.id === svc.id);
          const showBest = isBest && showAI;
          const mode =
            isTie && isBest
              ? "tie"
              : hasWinner && isBest
                ? "winner"
                : "neutral";
          return (
            <motion.div
              key={svc.id}
              className={cn(
                "relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300",
                showBest
                  ? cardStyles[mode]
                  : "border-slate-100 bg-white hover:border-slate-200 shadow-sm",
              )}
            >
              {/* Badge Dinámico: Usamos el mismo mode */}
              {showAI && mode !== "neutral" && (
                <div className="absolute top-0 right-0">
                  <div
                    className={cn(
                      "text-white px-4 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-tighter",
                      mode === "winner" ? "bg-indigo-600" : "bg-emerald-500",
                    )}
                  >
                    {mode === "winner"
                      ? "Mejor Elección"
                      : "Prioridad Equilibrada"}
                  </div>
                </div>
              )}

              <h3 className="text-base font-bold text-slate-800 mb-4 pr-10 leading-snug">
                {svc.title}
              </h3>

              {/* Gráfico de Barras Minimalista */}
              <div className="space-y-4">
                <div className="flex items-end justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      Puntuación de Prioridad
                    </p>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      {showAI && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(svc.priorityScore / bestScore) * 100}%`,
                          }}
                          className={cn(
                            "h-full rounded-full",
                            showBest ? barColor[mode] : "bg-slate-400",
                          )}
                        />
                      )}
                    </div>
                  </div>
                  {showAI && (
                    <span
                      className={cn(
                        "text-2xl font-bold leading-none",
                        accentColor[mode],
                      )}
                    >
                      {Math.round(svc.priorityScore / 10)}
                    </span>
                  )}
                </div>

                {/* Mini-grid de métricas */}
                {/* DONUT METRICS */}
                <div className="flex justify-between pt-3 border-t border-slate-50">
                  {showAI && (
                    <>
                      <MetricsDonutMini
                        label="Impacto"
                        value={svc.impact}
                        color="stroke-emerald-500"
                      />
                      <MetricsDonutMini
                        label="Esfuerzo"
                        value={svc.effort}
                        color="stroke-amber-500"
                      />
                      <MetricsDonutMini
                        label="Riesgo"
                        value={svc.risk}
                        color="stroke-rose-500"
                      />
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ComparisonTableStripe services={enriched} />
    </div>
  );
}
