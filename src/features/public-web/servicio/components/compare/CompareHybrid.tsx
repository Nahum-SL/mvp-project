"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ScoredService } from "@/src/types/servicio/scoring.types";
import { ComparisonTableStripe } from "./ComparisonTableStripe";
import { cn } from "@/src/lib/utils";
import { Info, Sparkles, Trophy } from "lucide-react";

interface Props {
  services: ScoredService[];
  hasContext?: boolean;
}

export default function ComparisonHybrid({ services, hasContext }: Props) {
  //  calcular scores
  const enriched = useMemo(() => {
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

  const bestServices = enriched.filter((s) => s.priorityScore === bestScore);

  // En lugar de comparar igualdad exacta (===), comparamos la diferencia
  const isTie = bestServices.length > 1;
  // Ganador
  const hasWinner = bestServices.length === 1;
  const showAI = hasContext;

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
          return (
            <motion.div
              key={svc.id}
              className={cn(
                "relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300",
                showBest
                  ? "border-indigo-500 bg-linear-to-b from-indigo-50/50 to-white shadow-indigo-100/50 shadow-lg"
                  : "border-slate-100 bg-white hover:border-slate-200 shadow-sm",
              )}
            >
              {/* Badge Dinámico */}
              {showBest && showAI && (
                <div className="absolute top-0 right-0">
                  <div className="bg-indigo-600 text-white px-4 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-tighter">
                    Mejor Elección
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
                            showBest ? "bg-indigo-500" : "bg-slate-400",
                          )}
                        />
                      )}
                    </div>
                  </div>
                  {showAI && (
                    <span className="text-2xl font-black text-indigo-600 leading-none">
                      {Math.round(svc.priorityScore / 10)}
                    </span>
                  )}
                </div>

                {/* Mini-grid de métricas */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-50">
                  <div className="text-center">
                    <p className="text-[9px] text-slate-400 uppercase">
                      Impacto
                    </p>
                    {showAI && (
                      <p className="font-bold text-slate-700">
                        {Math.round(svc.impact / 10)}
                      </p>
                    )}
                  </div>
                  <div className="text-center border-x border-slate-100">
                    <p className="text-[9px] text-slate-400 uppercase">
                      Esfuerzo
                    </p>
                    {showAI && (
                      <p className="font-bold text-slate-700">
                        {Math.round(svc.effort / 10)}
                      </p>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] text-slate-400 uppercase">
                      Riesgo
                    </p>
                    {showAI && (
                      <p className="font-bold text-slate-700">
                        {Math.round(svc.risk / 10)}
                      </p>
                    )}
                  </div>
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
