// src/features/components/servicios/ServiceCard.tsx
"use client";

import { Service } from "@/src/types/servicio/servicio";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
// -- UTILS --
// Manejar iconos
import { iconMap, IconName } from "@/src/lib/icons";

interface Props {
  service: Service;
  highlighted?: boolean; // Se activa cuando hay un match en el SmartSelector
  onCompare: () => void;
  isComparing: boolean;
  matchScore?: number;
}

export const ServiceCard = ({
  service,
  highlighted,
  onCompare,
  isComparing,
  matchScore,
}: Props) => {
  // Recuperamos el icono dinámicamente si existe en Lucide
  const IconComponent = iconMap[service.icon as IconName] ?? LinkIcon;

  return (
    <article
      className={cn(
        "group relative bg-white rounded-[2.5rem] p-8 border transition-all duration-500 flex flex-col h-full",
        highlighted
          ? "border-blue-500 shadow-2xl shadow-blue-100 ring-2 ring-blue-500/10 scale-[1.02]"
          : "border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2",
      )}
    >
      {/* Badge de Recomendado (Solo si está resaltado) */}
      {highlighted && matchScore && matchScore >= 85 && (
        <div
          className="absolute -top-4 right-6 bg-emerald-500 text-white 
        px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest 
        flex items-center gap-1 shadow-lg"
        >
          <Sparkles size={12} />
          Top recomendado
        </div>
      )}

      {/* Header: Icono y Título */}
      <div className="flex items-start justify-between mb-6">
        <div
          className={cn(
            "p-4 rounded-2xl transition-colors",
            highlighted
              ? "bg-green-400 text-white"
              : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600",
          )}
        >
          <IconComponent size={28} strokeWidth={1.5} />
        </div>
        <div className="flex gap-1">
          {service.businessTypes.slice(0, 2).map((type) => (
            <span
              key={type}
              className="text-[9px] font-black uppercase tracking-tighter
              text-slate-400 bg-slate-50 px-2 py-1 rounded-md"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* TItulo del Servicio */}
      <div className="grow">
        <h3
          className="text-xl font-black text-slate-900 mb-3 leading-tight 
        group-hover:text-blue-600 transition-colors"
        >
          {service.title}
        </h3>

        {/* Si se hace un match mayor al 80%
            Muestra un comentario relevante
            para evitar falsos positivos se agrego "highlighted"
        */}
        {highlighted && matchScore && matchScore >= 80 && (
          <div
            className="inline-block px-3 py-1 bg-emerald-100 
          text-emerald-700 text-[10px] font-black uppercase rounded-lg mb-2"
          >
            Recomendación Top
          </div>
        )}

        {/* Linea colorida del card que aumenta y cambia de color mientras mayor sea el match */}
        {matchScore !== undefined && matchScore > 0 && (
          <div className="mb-4 space-y-1.5">
            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
              <span>Compatibilidad</span>
              <span
                className={cn(
                  matchScore > 80
                    ? "text-emerald-500"
                    : matchScore > 50
                      ? "text-blue-500"
                      : "text-amber-500",
                )}
              >
                {matchScore}%
              </span>
            </div>
            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-1000 ease-out",
                  matchScore > 80
                    ? "bg-emerald-500"
                    : matchScore > 50
                      ? "bg-blue-500"
                      : "bg-amber-500",
                )}
                style={{ width: `${matchScore}%` }}
              />
            </div>
          </div>
        )}

        {/* Renderizado de descripción (limitado para el card) */}
        <div
          className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />

        {/* Features rápidas */}
        <ul className="space-y-3 mb-8">
          {service.features.slice(0, 3).map((feature) => (
            <li
              key={feature.id}
              className="flex items-center gap-3 text-xs font-bold text-slate-600"
            >
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              {feature.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer: Acciones */}
      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <Link
          href={`/servicio/${service.slug}`}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-all"
        >
          Ver Detalles <ArrowRight size={16} />
        </Link>

        <button
          onClick={onCompare}
          className={cn(
            "text-[10px] font-bold transition-all active:scale-95 underline-offset-4 hover:underline", // Añadido active:scale-95
            isComparing ? "text-blue-600 underline" : "text-slate-400",
          )}
        >
          {isComparing ? "Seleccionado" : "Comparar"}
        </button>
      </div>
    </article>
  );
};
