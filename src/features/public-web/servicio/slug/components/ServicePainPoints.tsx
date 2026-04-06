"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ServicePainPoints({
  painPoints,
}: {
  painPoints: string[];
}) {
  return (
    <section className="py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Top gradient separator */}
      <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-slate-950 to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Glow sutil */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-175 h-175 from-red-500/10 to-blue-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-xs uppercase tracking-[0.4em] text-red-400 mb-4">
              Problemas comunes
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Situaciones que frenan el crecimiento de tu empresa
            </h2>

            <p className="text-slate-400 mt-4 text-sm">
              Identificamos los puntos críticos que impactan directamente en la
              eficiencia, el cumplimiento y la rentabilidad.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((point) => (
              <div
                key={point}
                className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute inset-0 bg-linear-to-r from-red-500/10 to-transparent blur-xl" />
                </div>

                <div className="relative z-10 flex items-start gap-4">
                  {/* Icono */}
                  <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>

                  {/* Texto */}
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      {/* Transition divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-20 fill-white"
          preserveAspectRatio="none"
        >
          <path d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96V120H0Z" />
        </svg>
      </div>
    </section>
  );
}
