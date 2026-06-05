// src/features/public/servicio/components/cards/service-card.tsx
"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { iconMap, IconName } from "@/src/lib/icons";

import type { ScoredService } from "@/src/types/servicio/scoring.types";

import { stripHtml } from "../../utils/service-description";
import { SERVICE_FEATURE_PREVIEW_LIMIT } from "@/src/constants/servicio-public/servicio-ui";

interface ServiceCardProps {
  service: ScoredService;
  highlightLevel?: "high" | "medium" | "low" | "none";
  onCompare: () => void;
  isComparing: boolean;
  matchScore?: number;
}

function ServiceCardComponent({
  service,
  highlightLevel = "none",
  onCompare,
  isComparing,
  matchScore = 0,
}: ServiceCardProps) {
  const IconComponent = iconMap[service.icon as IconName];

  const isHigh = highlightLevel === "high";
  const priorityScore = service.priorityScore ?? 0;
  const mainReason = service.recommendationMeta?.reasons?.[0];
  const description = stripHtml(service.description ?? "");

  return (
    <motion.article
      layout
      animate={
        isHigh
          ? {
              scale: [1, 1.03, 1],
            }
          : {
              scale: 1,
            }
      }
      transition={{ duration: 0.4 }}
      className={cn(
        "group relative flex flex-col h-full rounded-3xl border p-6 transition-all duration-500",
        "bg-white overflow-hidden",
        isHigh
          ? "border-indigo-500 shadow-xl shadow-indigo-100/50 scale-[1.02]"
          : "border-slate-100 hover:border-slate-200 hover:shadow-lg",
        highlightLevel === "none" && "opacity-60 hover:opacity-100",
      )}
    >
      {/* Resaltado visual del servicio recomendado */}
      {isHigh && (
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 to-transparent pointer-events-none" />
      )}

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-slate-50 text-slate-500 transition group-hover:bg-indigo-50 group-hover:text-indigo-600">
          {IconComponent && <IconComponent size={22} strokeWidth={1.8} />}
        </div>

        <div className="text-right text-[10px] text-slate-400 space-y-1">
          <div>
            <span className="block">Match</span>
            <span className="font-bold text-slate-700">{matchScore}%</span>
          </div>

          <div>
            <span className="block">Prioridad</span>
            <span className="font-bold text-indigo-600">{priorityScore}</span>
          </div>
        </div>
      </div>

      {/* Título */}
      <h3 className="relative z-10 text-lg font-semibold text-slate-900 mb-2 leading-snug">
        {service.title}
      </h3>

      {/* Motivo principal generado por el motor de recomendación */}
      {mainReason && (
        <p className="relative z-10 mb-3 text-xs italic text-slate-500">
          {mainReason}
        </p>
      )}

      {/* Barra de compatibilidad */}
      <div className="relative z-10 mb-4">
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>Compatibilidad</span>
          <span>{matchScore}%</span>
        </div>

        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${matchScore}%` }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className={cn(
              "h-full transition-all duration-700",
              matchScore > 80
                ? "bg-emerald-500"
                : matchScore > 50
                  ? "bg-indigo-500"
                  : "bg-amber-400",
            )}
          />
        </div>
      </div>

      {/* Descripción */}
      <p className="relative z-10 mb-4 text-sm text-slate-600 line-clamp-3">
        {description}
      </p>

      {/* Features Preview */}
      <ul className="relative z-10 mb-6 space-y-2">
        {service.features
          ?.slice(0, SERVICE_FEATURE_PREVIEW_LIMIT)
          .map((feature) => (
            <li
              key={feature.id}
              className="flex items-center gap-2 text-xs text-slate-600"
            >
              <CheckCircle2 size={14} className="text-emerald-500" />
              {feature.name}
            </li>
          ))}
      </ul>

      {/* Footer */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
        <Link
          href={`/servicio/${service.slug}?from=ver_detalles_servicio`}
          className="flex items-center gap-1 text-xs font-semibold text-slate-700 transition hover:text-indigo-600"
        >
          Ver detalles
          <ArrowRight size={14} />
        </Link>

        <button
          type="button"
          onClick={onCompare}
          className={cn(
            "px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all",
            isComparing
              ? "bg-indigo-600 text-white border-indigo-600"
              : "border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600",
          )}
        >
          {isComparing ? "Seleccionado" : "Comparar"}
        </button>
      </div>
    </motion.article>
  );
}

/**
 * Evita re-renderizados cuando cambia el grid
 * pero la tarjeta mantiene exactamente los mismos datos visuales.
 */
export const ServiceCard = memo(
  ServiceCardComponent,
  (prev, next) =>
    prev.service.id === next.service.id &&
    prev.matchScore === next.matchScore &&
    prev.isComparing === next.isComparing &&
    prev.highlightLevel === next.highlightLevel,
);

ServiceCard.displayName = "ServiceCard";
