"use client";

import { motion } from "framer-motion";
import { Cloud } from "lucide-react";

export default function DashboardLoader() {
  return (
    <div
      className="
      relative flex items-center justify-center 
      min-h-[60vh] overflow-hidden
      bg-slate-900
      bg-linear-to-br
      from-[rgba(32,35,91,0.7)]
      to-[rgba(7,9,33,0.7)]
      "
    >
      {/* Glow radial (igual al de tu card) */}
      <div
        className="
        absolute w-125 aspect-square 
        rounded-full blur-3xl opacity-70
        bg-[radial-gradient(circle,#199AFC90_0,#0D102380_100%)]
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/50" />

      {/* Contenido */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Contenedor icono */}
        <div className="relative flex items-center justify-center">
          {/* Energy ring */}
          <motion.div
            className="
            absolute w-28 h-28 rounded-full
            border-2 border-transparent border-t-cyan-400/60 border-b-cyan-400/60
            "
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Segundo ring */}
          <motion.div
            className="
            absolute w-36 h-36 rounded-full
            border border-transparent border-l-sky-400/30 border-r-sky-400/30
            "
            animate={{ rotate: -360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Glow */}
          <motion.div
            className="absolute w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Icono */}
          <Cloud
            size={56}
            className="relative text-cyan-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.7)]"
          />
        </div>

        {/* Texto */}
        <p className="text-slate-300 text-sm tracking-wide">
          Cargando panel de administración...
        </p>
      </div>
    </div>
  );
}
