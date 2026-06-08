// src/components/ui/layout/intranet/IntranetNavHint.tsx
"use client";

import { motion } from "framer-motion";

export const IntranetNavHint = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-14"
    >
      <div
        className="
        relative overflow-hidden rounded-3xl 
        border border-white/10 
        bg-white/3 backdrop-blur-xl
        p-6 md:p-8
      "
      >
        {/* Glow decorativo */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 blur-[100px] rounded-full" />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Top label */}
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-blue-500/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400">
              Panel de Acceso
            </span>
          </div>

          {/* Title + icon */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-2xl md:text-3xl text-white tracking-tight leading-tight">
              Accede a tus{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600">
                plataformas internas
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm max-w-xl">
            Selecciona una herramienta para ingresar al sistema correspondiente.
            Solo verás plataformas habilitadas para tu cuenta.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
