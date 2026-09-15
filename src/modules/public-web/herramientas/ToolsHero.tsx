"use client";

import { motion } from "framer-motion";

export default function ToolsHero() {
  return (
    <section className="py-24 text-center max-w-3xl mx-auto px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl mt-10 font-extrabold tracking-tight"
      >
        Herramientas Inteligentes
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 text-slate-400 text-lg"
      >
        Automatiza cálculos, evita errores y toma mejores decisiones financieras
        con herramientas diseñadas para empresas peruanas.
      </motion.p>
    </section>
  );
}
