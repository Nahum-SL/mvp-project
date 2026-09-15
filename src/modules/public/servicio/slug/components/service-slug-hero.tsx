"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Service } from "@/src/types/servicio/servicio-types";

export default function ServiceSlugHero({ service }: { service: Service }) {
  return (
    <section className="relative w-full flex items-center min-h-svh overflow-hidden bg-slate-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={service.image || "/placeholder-service.jpg"}
          alt={service.title}
          fill
          priority
          className="object-cover object-center opacity-30"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/30 via-slate-950/80 to-slate-950" />

      {/* Glow radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-200 h-200 bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-blue-500" />
            <span className="text-blue-400 uppercase tracking-[0.4em] text-xs font-bold">
              {service.businessTypes[0] ?? "Consultoria"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-[1.05] max-w-4xl">
            {service.title}
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-slate-300 max-w-2xl">
            Optimiza la gestión y reduce riesgos con una estrategia diseñada
            para empresas que exigen precisión y resultados.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#contacto"
              className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:scale-[1.03] transition"
            >
              Agendar Consultoría
            </Link>

            <button
              onClick={() => {
                const el = document.getElementById("detalles");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
            >
              Ver detalles
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
