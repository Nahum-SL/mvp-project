// src/features/public/servicio/components/servicio-detail/service-features.tsx

import type { ServiceFeature } from "@/src/types/servicio/servicio-types";
import { CheckCircle2 } from "lucide-react";

interface ServiceFeaturesProps {
  features: ServiceFeature[];
}

export function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <section className="border-t border-slate-100 pt-16">
      <h3 className="text-xl font-medium text-slate-900 mb-10 uppercase tracking-tighter">
        ¿Qué incluye nuestra solución?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="
              flex gap-4 p-6 rounded-3xl
              bg-slate-50 border border-slate-100
              hover:border-green-500/60 transition-colors
            "
          >
            <CheckCircle2 className="text-green-500 shrink-0" size={24} />

            <div>
              <p className="font-extrabold text-slate-900 uppercase text-xs tracking-wide">
                {feature.name}
              </p>

              <p className="text-xs text-slate-500 mt-1 font-bold">
                Implementación inmediata y gestión estratégica.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
