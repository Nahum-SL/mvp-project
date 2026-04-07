"use client";

import { useMemo, memo } from "react";

import { ScoredService } from "@/src/types/servicio/scoring.types";
import { Check, Minus, Info } from "lucide-react";

// Usamos memo para evitar re-renders si el dashboard cambia pero no los servicios a comparar
export const ComparisonTableStripe = memo(
  ({ services }: { services: ScoredService[] }) => {
    // 1. Calculamos las filas de forma plana para renderizado directo O(1)
    const rows = useMemo(() => {
      // Obtenemos nombres únicos
      const names = Array.from(
        new Set(services.flatMap((s) => (s.features ?? []).map((f) => f.name))),
      );

      // Mapeamos a una estructura que la tabla recorra sin lógica extra
      return names.map((name) => ({
        name,
        results: services.map((svc) =>
          svc.features.some((f) => f.name === name),
        ),
      }));
    }, [services]);

    return (
      <div
        className="w-full mt-10 overflow-hidden rounded-3xl 
      border border-slate-100 bg-white shadow-sm [content-visibility:auto]"
      >
        <div className="overflow-x-auto scrollbar-hide select-none">
          <table className="w-full text-left border-collapse min-w-150">
            <thead>
              <tr className="bg-slate-50/50">
                <th
                  className="p-6 md:p-8 text-[10px] font-extrabold uppercase 
                tracking-widest text-slate-400 sticky left-0 
                bg-slate-50 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]"
                >
                  Capacidades
                </th>
                {services.map((svc) => (
                  <th key={svc.id} className="p-6 md:p-8 text-center min-w-50">
                    <span className="text-sm font-extrabold text-blue-600 uppercase">
                      {svc.title}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {rows.map((row) => (
                <tr
                  key={row.name}
                  className="group hover:bg-slate-50/30 transition-colors"
                >
                  {/* Columna Fija: Sticky left-0 es vital para móvil */}
                  <td
                    className="p-5 md:p-6 sticky left-0 bg-white 
                  group-hover:bg-slate-50/30 z-10 
                  border-r border-slate-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] md:text-xs font-bold text-slate-600 leading-tight">
                        {row.name}
                      </span>
                      <Info
                        size={14}
                        className="text-slate-300 hidden md:block shrink-0"
                      />
                    </div>
                  </td>

                  {row.results.map((hasFeature, idx) => (
                    <td key={idx} className="p-5 md:p-6 text-center">
                      {hasFeature ? (
                        <div className="inline-flex p-2 bg-emerald-50 rounded-full">
                          <Check size={16} className="text-emerald-500" />
                        </div>
                      ) : (
                        <Minus size={16} className="text-slate-200 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Guía visual para el usuario móvil */}
        <div className="md:hidden p-4 bg-slate-50 text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest border-t border-slate-100 animate-pulse">
          ← Desliza para comparar →
        </div>
      </div>
    );
  },
);

ComparisonTableStripe.displayName = "ComparisonTableStripe";
