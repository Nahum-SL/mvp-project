"use client";

import { CheckCircle2 } from "lucide-react";
import { Service } from "@/src/types/servicio/servicio";

interface Props {
  features: Service["features"];
}

export default function ServiceBenefits({ features }: Props) {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Cabezera */}
        <header className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-500 mb-4">
            La solución
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
            De problemas complejos a resultados medibles
          </h2>

          <p className="text-slate-500 mt-4 text-sm">
            Transformamos cada punto crítico en una oportunidad de mejora y
            crecimiento sostenible.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative p-8 rounded-3xl border border-slate-200 
              bg-white hover:border-emerald-500/40 transition-all"
            >
              {/* Glow hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
              transition bg-linear-to-r from-emerald-500/10 to-transparent blur-xl" />

              <CheckCircle2 className="text-emerald-500 mb-4 relative z-10" />

              <h3 className="font-semibold text-lg text-slate-900 relative z-10">
                {feature.name}
              </h3>

              <p className="text-slate-500 mt-2 text-sm relative z-10">
                Enfoque estratégico orientado a eficiencia, cumplimiento y
                crecimiento empresarial.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
