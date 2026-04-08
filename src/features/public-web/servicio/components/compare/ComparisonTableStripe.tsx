"use client";

import { useMemo, memo } from "react";

import { ScoredService } from "@/src/types/servicio/scoring.types";
import { Check, Minus } from "lucide-react";

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
      // Dentro de ComparisonTableStripe.tsx
      <div className="mt-12 group/container relative">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="sticky left-0 z-20 bg-slate-50 p-6 text-left border-b border-r border-slate-200 shadow-[4px_0_10px_-5px_rgba(0,0,0,0.05)]">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                      Capacidades
                    </span>
                  </th>
                  {services.map((svc) => (
                    <th
                      key={svc.id}
                      className="p-6 bg-slate-50/50 text-center border-b border-slate-200 min-w-40"
                    >
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-tight">
                        {svc.title}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr
                    key={row.name}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="sticky left-0 z-10 bg-white p-5 border-r border-slate-100 group-hover:bg-slate-50 transition-colors shadow-[4px_0_10px_-5px_rgba(0,0,0,0.05)]">
                      <span className="text-[11px] md:text-xs font-semibold text-slate-600 leading-tight block">
                        {row.name}
                      </span>
                    </td>
                    {row.results.map((hasFeature, idx) => (
                      <td key={idx} className="p-4 text-center">
                        {hasFeature ? (
                          <div className="mx-auto w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-xl shadow-inner shadow-emerald-200/50">
                            <Check size={18} strokeWidth={3} />
                          </div>
                        ) : (
                          <Minus size={18} className="text-slate-200 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  },
);

ComparisonTableStripe.displayName = "ComparisonTableStripe";
