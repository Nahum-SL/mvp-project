// src/components/ui/layout/servicios/ComparisonTableStripe.tsx
"use client";

import { Service } from "@/src/types/servicio/servicio";
import { Check, Minus, Info } from "lucide-react";

export const ComparisonTableStripe = ({
  services,
}: {
  services: Service[];
}) => {
  // Extraemos todas las features únicas de ambos servicios para crear las filas
  const allFeatureNames = Array.from(
    new Set(services.flatMap((s) => s.features.map((f) => f.name))),
  );

  return (
    <div className="w-full mt-10 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50">
            <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Capacidades
            </th>
            {services.map((svc) => (
              <th key={svc.id} className="p-8 text-center">
                <span className="text-sm font-black text-blue-600 uppercase">
                  {svc.title}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {allFeatureNames.map((featureName) => (
            <tr
              key={featureName}
              className="group hover:bg-slate-50/30 transition-colors"
            >
              <td className="p-6 flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600">
                  {featureName}
                </span>
                <Info
                  size={14}
                  className="text-slate-300 opacity-0 group-hover:opacity-100 cursor-help"
                />
              </td>
              {services.map((svc) => {
                const hasFeature = svc.features.some(
                  (f) => f.name === featureName,
                );
                return (
                  <td key={svc.id} className="p-6 text-center">
                    {hasFeature ? (
                      <div className="inline-flex p-2 bg-emerald-50 rounded-full">
                        <Check size={16} className="text-emerald-500" />
                      </div>
                    ) : (
                      <Minus size={16} className="text-slate-200 mx-auto" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
