"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { iconMap, IconName } from "@/src/lib/icons";
import { ScoredService } from "@/src/types/servicio/scoring.types";

interface Props {
  service: ScoredService & {
    priorityScore?: number;
  };
  highlightLevel?: "high" | "medium" | "low" | "none";
  onCompare: () => void;
  isComparing: boolean;
  matchScore?: number;
}

export const ServiceCardV2Component = ({
  service,
  highlightLevel = "none",
  onCompare,
  isComparing,
  matchScore = 0,
}: Props) => {
  const IconComponent = iconMap[service.icon as IconName];
  const isHigh = highlightLevel === "high";

  const priority = service.priorityScore ?? 0;
  const mainReason = service.recommendationMeta?.reasons?.[0];
  
  return (
    <motion.article
      layout
      animate={
        highlightLevel === "high" ? { scale: [1, 1.03, 1] } : { scale: 1 }
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
      {/* Glow */}
      {isHigh && (
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 to-transparent pointer-events-none" />
      )}

      {/* HEADER */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="p-3 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
          {IconComponent && <IconComponent size={22} strokeWidth={1.8} />}
        </div>

        {/* MINI SCORES */}
        <div className="text-right text-[10px] text-slate-400 space-y-1">
          <div>
            <span className="block">Match</span>
            <span className="font-bold text-slate-700">{matchScore}%</span>
          </div>
          <div>
            <span className="block">Prioridad</span>
            <span className="font-bold text-indigo-600">{priority}</span>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-snug relative z-10">
        {service.title}
      </h3>

      {/* RAZÓN PRINCIPAL */}
      {mainReason && (
        <p className="text-xs text-slate-500 italic mb-3 relative z-10">
          {mainReason}
        </p>
      )}

      {/* PROGRESS BAR */}
      <div className="mb-4 relative z-10">
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>Compatibilidad</span>
          <span>{matchScore}%</span>
        </div>

        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${matchScore}%`}}
            transition={{ duration: 0.8, ease: "easeOut"}}
            className={cn(
              "h-full transition-all duration-700",
              matchScore > 80
                ? "bg-emerald-500"
                : matchScore > 50
                  ? "bg-indigo-500"
                  : "bg-amber-400",
            )}
            style={{ width: `${matchScore}%` }}
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-slate-600 line-clamp-3 mb-4 relative z-10">
        {service.description?.replace(/<[^>]*>/g, "")}
      </p>

      {/* FEATURES */}
      <ul className="space-y-2 mb-6 relative z-10">
        {service.features?.slice(0, 2).map((f) => (
          <li
            key={f.id}
            className="flex items-center gap-2 text-xs text-slate-600"
          >
            <CheckCircle2 size={14} className="text-emerald-500" />
            {f.name}
          </li>
        ))}
      </ul>

      {/* FOOTER */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50 relative z-10">
        <Link
          href={`/servicio/${service.slug}`}
          className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition"
        >
          Ver detalles <ArrowRight size={14} />
        </Link>

        <button
          onClick={onCompare}
          className={cn(
            "text-xs font-semibold transition-all",
            "px-3 py-1.5 rounded-lg border",
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
};

export const ServiceCard = memo(
  ServiceCardV2Component,
  (prev, next) =>
    prev.service.id === next.service.id &&
    prev.matchScore === next.matchScore &&
    prev.isComparing === next.isComparing &&
    prev.highlightLevel === next.highlightLevel,
);

ServiceCard.displayName = "ServiceCard";
