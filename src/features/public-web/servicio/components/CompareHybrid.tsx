"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { ScoredService } from "@/src/types/servicio/scoring.types";
import { ComparisonTableStripe } from "./ComparisonTableStripe";

interface Props {
  services: ScoredService[];
}

export default function ComparisonHybrid({ services }: Props) {
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
      console.log(services);

      return {
        ...s,
        impact,
        effort,
        risk,
        priorityScore,
      };
    });
  }, [services]);

  const maxScore = Math.max(...enriched.map((s) => s.priorityScore), 1);

  // detectar mejor servicio
  const best = useMemo(() => {
    return [...enriched].sort((a, b) => b.priorityScore - a.priorityScore)[0];
  }, [enriched]);

  // Cuando empatan, se podría mostrar ambos como recomendados, pero por simplicidad solo mostramos uno.
  // const bestScore = Math.max(...enriched.map((s) => s.priorityScore));
  // const isBest = svc.priorityScore === bestScore;

  return (
    <div className="space-y-8">
      {/*  TOP CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {enriched.map((svc) => {
          const isBest = svc.id === best.id;

          return (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative rounded-2xl border p-5 shadow-sm transition
              ${
                isBest
                  ? "border-indigo-500 bg-indigo-50/40"
                  : "border-slate-100 bg-white"
              }`}
            >
              {/* BADGE */}
              {isBest && (
                <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold text-indigo-600">
                  <CheckCircle size={14} />
                  Recomendado
                </div>
              )}

              <Link
                href={`/servicio/${svc.slug}?from=compare_hybrid`}
                className="block"
              >
                <h3 className="font-semibold text-sm mb-3 hover:underline hover:text-indigo-600">
                  {svc.title}
                </h3>
              </Link>

              {/* METRICS */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Impacto</span>
                  <span>{svc.impact}</span>
                </div>

                <div className="flex justify-between">
                  <span>Esfuerzo</span>
                  <span>{svc.effort}</span>
                </div>

                <div className="flex justify-between">
                  <span>Riesgo</span>
                  <span>{svc.risk}</span>
                </div>
              </div>

              {/* SCORE BAR */}
              <div className="mt-4">
                <div className="text-[10px] text-slate-400 mb-1">
                  <span>Priority Score</span>
                  <span>{svc.priorityScore}</span>
                </div>

                <div className="h-2 bg-slate-100 rounded">
                  <div
                    className={`h-full rounded ${
                      isBest ? "bg-indigo-600" : "bg-slate-400"
                    }`}
                    style={{
                      width: `${(svc.priorityScore / maxScore) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 🧾 TABLA */}
      <ComparisonTableStripe services={services} />
    </div>
  );
}
