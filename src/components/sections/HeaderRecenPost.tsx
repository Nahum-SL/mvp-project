// src/features/blog/components/HeaderRecentPost.tsx

"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

export const HeaderRecentPost = () => {
  return (
    <header className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        {/* Bloque principal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-xl space-y-3"
        >
          <div className="flex items-center gap-2 text-blue-600">
            <Newspaper size={18} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Blog Contable
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            Actualidad contable
          </h2>

          {/* Línea decorativa minimal */}
          <div className="h-0.5 w-12 bg-blue-600 rounded-full" />

          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Análisis y contenido actualizado sobre normativa tributaria, gestión
            financiera y tendencias empresariales.
          </p>
        </motion.div>

        {/* Datos secundarios */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-6 text-sm text-slate-500"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900">+500</span>
            <span className="text-xs">Artículos</span>
          </div>

          <div className="h-6 w-px bg-slate-200" />

          <div className="flex flex-col">
            <span className="font-semibold text-slate-900">Contenido</span>
            <span className="text-xs">Especializado</span>
          </div>
        </motion.div>
      </div>

      {/* Separador */}
      <div className="mt-8 border-t border-slate-200" />
    </header>
  );
};
