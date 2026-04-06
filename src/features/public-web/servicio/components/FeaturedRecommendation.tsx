"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { ScoredService } from "@/src/types/servicio/scoring.types";

interface Props {
  service: ScoredService;
}

export default function FeaturedRecommendation({ service }: Props) {
  return (
    <section className="relative max-w-6xl mx-auto px-6 mb-16">
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

        <div className="relative grid md:grid-cols-2 gap-10 p-10">
          {/*  CONTENIDO */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              <Sparkles className="w-4 h-4" />
              Recomendación principal
            </div>
            <div className="flex gap-6 mb-6 text-xs font-medium text-slate-500">
              <span>Impacto: {service.recommendationMeta.impact}/10</span>
              <span>Esfuerzo: {service.recommendationMeta.effort}/10</span>
              <span>Riesgo: {service.recommendationMeta.risk}/10</span>
            </div>

            {/* Título */}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              Esto es lo que necesitas ahora
            </h2>

            {/* Servicio */}
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              {service.title}
            </h3>

            {/* Descripción */}
            <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
              {service.description.replace(/<[^>]*>/g, "")}
            </p>

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
            {/* CTA */}
            <Link
              href={`/servicio/${service.slug}`}
              className={cn(
                "inline-flex items-center gap-2 w-fit px-6 py-3 rounded-xl",
                "bg-slate-900 text-white text-sm font-semibold",
                "hover:bg-slate-800 transition-all duration-300",
                "shadow-md hover:shadow-lg",
              )}
            >
              Ver solución
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/*  LADO VISUAL (minimalista + autoridad) */}
          <div className="relative hidden md:flex items-center justify-center">
            <div className="relative w-full h-56 rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
              {/* Glow interno */}
              <div className="absolute inset-0 bg-[radial-linear(circle_at_70%_40%,rgba(99,102,241,0.15),transparent_60%)]" />

              {/* Líneas decorativas tipo consultora */}
              <div
                className="absolute inset-0 opacity-20 
              bg-[linear-linear(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] 
              bg-size-[24px_24px]"
              />

              {/* Overlay para la imagen  */}
              <div className="absolute inset-0 bg-linear-to-t from-white/80 via-white/40 to-transparent" />
              {/* Texto placeholder premium */}
              <div className="absolute inset-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover opacity-90"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/*  Línea inferior tipo progreso */}
        <div className="h-0.5 w-full bg-linear-to-r from-indigo-500 via-indigo-300 to-transparent opacity-60" />
      </motion.div>
    </section>
  );
}
