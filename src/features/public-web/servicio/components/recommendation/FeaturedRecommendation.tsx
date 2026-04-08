"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { ScoredService } from "@/src/types/servicio/scoring.types";
import { MetricsDonutGroup } from "./metricas/MetricDonutGroup";

// -- Bloque de decisión
interface Props {
  service: ScoredService;
  alternatives: ScoredService[];
  insights?: {
    summary: string;
    confidence: number;
    reasoning: string[];
  };
}

export default function FeaturedRecommendation({
  service,
  insights,
  alternatives,
}: Props) {
  return (
    <section className="relative max-w-6xl mx-auto px-6 mb-16 will-change-transform">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        {/*  Glow sutil */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="absolute inset-0 bg-[radial-linear(circle_at_30%_30%,rgba(99,102,241,0.12),transparent_60%)]" />
        </div>

        {/*  Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl p-px bg-linear-to-r from-indigo-500/20 via-transparent to-indigo-500/20 pointer-events-none" />

        {/* Métricas estilo consultora */}
        <div className="relative flex flex-col md:grid md:grid-cols-2 gap-8 md:gap10 p-6 md:p-10">
          {/*  CONTENIDO */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              <Sparkles className="w-4 h-4" />
              Recomendación principal
            </div>
            <div className="flex justify-between md:justify-start md:gap-6 mb-6 text-xs font-medium text-slate-500">
              <div>
                <span className="block text-slate-400">Impacto</span>
                <span className="text-slate-900 font-semibold">
                  {Math.round(service.recommendationMeta.impact / 10)}/10
                </span>
              </div>

              <div>
                <span className="block text-slate-400">Esfuerzo</span>
                <span className="text-slate-900 font-semibold">
                  {Math.round(service.recommendationMeta.effort) / 10}/10
                </span>
              </div>

              <div>
                <span className="block text-slate-400">Riesgo</span>
                <span className="text-slate-900 font-semibold">
                  {Math.round(service.recommendationMeta.risk / 10)}/10
                </span>
              </div>
            </div>

            {/* Título */}
            <h2 className="text-3xl md:text-4xl font-medium text-slate-900 leading-tight mb-4">
              Esto es lo que necesitas ahora
            </h2>

            {/* Servicio */}
            <h3 className="text-xl font-semibold text-slate-800 mb-4 border-l-4 border-indigo-500 pl-4">
              {service.title}
            </h3>

            <div className="mb-4 md:mb-6">
              <MetricsDonutGroup
                impact={service.recommendationMeta.impact}
                effort={service.recommendationMeta.effort}
                risk={service.recommendationMeta.risk}
              />
            </div>

            {/* Descripción */}
            <p className="text-slate-600 leading-relaxed mb-6 line-clamp-none md:line-clamp-3">
              {service.description?.replace(/<[^>]*>/g, "")}
            </p>

            {insights && (
              <p className="text-sm text-slate-500 mb-4">{insights.summary}</p>
            )}

            <ul className="space-y-2 mb-6">
              {service.recommendationMeta.reasons.map((reason, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  {reason}
                </li>
              ))}
            </ul>

            {/* Confidence con contexto */}
            {insights && (
              <div className="mb-6">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Confianza del sistema</span>
                  <span>{Math.round(insights.confidence * 100)}%</span>
                </div>

                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-700"
                    style={{ width: `${insights.confidence * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Lado Derecho */}
          <div className="flex flex-col gap-6 sticky top-24">
            {/* IMAGEN */}
            <div className="hidden md:block relative w-full h-64 md:h-72 rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-linear(circle_at_70%_40%,rgba(99,102,241,0.15),transparent_60%)]" />

              {/* Grid decorativo */}
              <div
                className="absolute inset-0 opacity-20 
                  bg-[linear-linear(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] 
                  bg-size-[24px_24px]"
              />

              <Image
                src={service.image || "/place-holder.webp"}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-90"
              />

              <div className="absolute inset-0 bg-linear-to-t from-white/80 via-white/40 to-transparent" />
            </div>

            {/* ALTERNATIVAS */}
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">
                Alternativas evaluadas
              </p>

              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {alternatives.map((alt) => (
                  <Link
                    key={`${alt.id}-${alt.title}`}
                    href={`/servicio/${alt.slug}?from=featured_recommendation`}
                  >
                    <div className="px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-600 bg-slate-50 whitespace-nowrap hover:bg-slate-100 transition">
                      {alt.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/servicio/${service.slug}?from=main_recommendation`}
              className={cn(
                "flex items-center justify-center gap-2 px-5 py-3 rounded-xl",
                "bg-slate-900 text-white text-sm font-semibold",
                "hover:bg-slate-800 transition-all duration-300",
                "shadow-md hover:shadow-lg",
              )}
            >
              Ver solución
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        {/*  Línea inferior tipo progreso */}
        <div className="h-0.5 w-full bg-linear-to-r from-indigo-500 via-indigo-300 to-transparent opacity-60" />
      </motion.div>
    </section>
  );
}
