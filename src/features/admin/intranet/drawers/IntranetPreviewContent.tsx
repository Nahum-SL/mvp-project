// features/admin/intranet/drawers/IntranetPreviewContent.tsx
import type { IntranetLink } from "@/src/types/intranet/intranet-types";
import { iconMap } from "@/src/lib/icons";
import {
  ExternalLink,
  Calendar,
  ShieldCheck,
  Layers,
  Link2,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Props {
  link: IntranetLink;
}

export function IntranetPreviewContent({ link }: Props) {
  // Mapeamos dinámicamente el ícono desde el diccionario estático de la plataforma
  const IconComponent =
    link.icon && iconMap[link.icon as keyof typeof iconMap]
      ? iconMap[link.icon as keyof typeof iconMap]
      : Link2;

  return (
    <div className="space-y-6">
      {/* Encabezado Visual del Enlace */}
      <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-gray-800/40 rounded-3xl border border-slate-100 dark:border-gray-800">
        <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-md shadow-blue-200 dark:shadow-none">
          <IconComponent size={24} />
        </div>
        <div>
          <h4 className="font-extrabold text-slate-900 dark:text-gray-100 uppercase text-sm tracking-tight italic">
            {link.title}
          </h4>
          <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mt-0.5">
            ID de Base de Datos: #{link.id}
          </p>
        </div>
      </div>

      {/* Grid de Información Técnica */}
      <div className="space-y-5">
        {/* Descripción descriptiva */}
        <div>
          <span className="text-[10px] font-extrabold text-slate-400 dark:text-gray-500 uppercase tracking-widest block mb-1.5 italic">
            Descripción Funcional
          </span>
          <p className="text-sm text-slate-600 dark:text-gray-300 font-medium bg-slate-50/40 dark:bg-gray-800/20 p-4 rounded-2xl border border-slate-100 dark:border-gray-800/60 leading-relaxed">
            {link.description ||
              "Este acceso directo no posee una descripción administrativa registrada."}
          </p>
        </div>

        {/* Dirección de Destino */}
        <div>
          <span className="text-[10px] font-extrabold text-slate-400 dark:text-gray-500 uppercase tracking-widest block mb-1.5 italic">
            Enlace de Destino (URL)
          </span>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center justify-between break-all bg-blue-50/40 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30 group transition-colors"
          >
            <span className="truncate">{link.url}</span>
            <ExternalLink
              size={14}
              className="shrink-0 ml-2 text-blue-400 group-hover:text-blue-600 transition-colors"
            />
          </a>
        </div>

        {/* Bloque Informativo Dual */}
        <div className="grid grid-cols-2 gap-4">
          {/* Tarjeta de Estado */}
          <div className="p-4 bg-slate-50/50 dark:bg-gray-800/10 rounded-2xl border border-slate-100 dark:border-gray-800/40">
            <span className="text-[10px] font-extrabold text-slate-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5 italic mb-2">
              <ShieldCheck size={12} /> Visibilidad
            </span>
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest italic border",
                link.isVisible
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30"
                  : "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
              )}
            >
              {link.isVisible ? "Visible" : "Oculto"}
            </span>
          </div>

          {/* Tarjeta de Prioridad */}
          <div className="p-4 bg-slate-50/50 dark:bg-gray-800/10 rounded-2xl border border-slate-100 dark:border-gray-800/40">
            <span className="text-[10px] font-extrabold text-slate-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5 italic mb-2">
              <Layers size={12} /> Orden Interno
            </span>
            <span className="text-sm font-extrabold text-slate-700 dark:text-gray-200 bg-slate-100 dark:bg-gray-800 px-3 py-1 rounded-lg italic">
              Posición #{link.order}
            </span>
          </div>
        </div>

        {/* Auditoría / Fechas */}
        {link.createdAt && (
          <div className="pt-3 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-slate-400 dark:text-gray-500 text-xs font-semibold">
            <span className="flex items-center gap-1">
              <Calendar size={12} /> Registrado el:
            </span>
            <span>
              {new Date(link.createdAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
