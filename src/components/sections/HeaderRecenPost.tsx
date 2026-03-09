"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

export const HeaderRecentPost = () => {
  return (
    <header className="mb-12 text-center md:text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-2 text-blue-500 justify-center">
          <Newspaper size={18} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Blog Contable
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-tight">
          Actualidad contable
        </h2>

        {/* Línea decorativa centrada */}
        <div className="h-0.5 w-16 bg-blue-500 rounded-full mx-auto" />

        <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-2">
          Análisis y contenido actualizado sobre normativa tributaria, gestión
          financiera y tendencias empresariales.
        </p>
      </motion.div>
    </header>
  );
};
