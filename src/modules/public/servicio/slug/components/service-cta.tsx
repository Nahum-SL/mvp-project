"use client";

import Link from "next/link";

export default function ServiceCTA({ serviceTitle }: { serviceTitle: string }) {
  return (
    <section className="py-28 bg-slate-950 text-white text-center relative overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-500/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-semibold mb-6">
          Empieza a optimizar tu empresa hoy
        </h2>

        <p className="text-slate-400 mb-10">
          Consultoría especializada en {serviceTitle}
        </p>

        <Link
          href="/#contacto"
          className="px-10 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:scale-[1.03] transition"
        >
          Agendar ahora
        </Link>
      </div>
    </section>
  );
}