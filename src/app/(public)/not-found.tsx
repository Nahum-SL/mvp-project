"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex items-center justify-center px-6 py-32 bg-white">
      {/* Glow decorativo */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-transparent pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* 404 gigante */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[120px] md:text-[160px] font-bold tracking-tight text-slate-900 leading-none"
        >
          404
        </motion.h1>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-semibold text-slate-900 mt-4"
        >
          Página no encontrada
        </motion.h2>

        {/* Subtexto */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 mt-4 max-w-md mx-auto text-sm"
        >
          Puede que el enlace esté desactualizado o que la página haya sido
          movida. Pero no te preocupes, podemos ayudarte a encontrar lo que
          necesitas.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all"
          >
            Volver al inicio
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/servicio"
            className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
          >
            Ver servicios disponibles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
