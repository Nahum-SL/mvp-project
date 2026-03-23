"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  videoSrc?: string; // Ruta del .webm
  posterSrc?: string; // Ruta de la imagen fija (fallback)
}

export default function IntranetHero({
  title,
  subtitle,
  videoSrc = "/video/intranet/intranet-hero-video.webm",
  posterSrc = "/fondo-intranet.webp",
}: Props) {
  return (
    <section
      className="relative w-full h-[65vh] md:h-[75vh] min-h-150 
    overflow-hidden bg-slate-950 flex items-center"
    >
      {/* BACKGROUND LAYER: Video + Poster */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src={videoSrc} type="video/webm" />
        </video>

        {/* MÁSCARAS DE GRADIENTE: Para que el texto "explote" visualmente */}
        {/* 1. Gradiente desde la izquierda (oscuridad para el texto) */}
        <div
          className="absolute inset-0 bg-linear-to-r 
        from-slate-950 via-slate-950/70 to-transparent z-1"
        />

        {/* 2. Gradiente inferior (para suavizar la unión con los Cards) */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t 
        from-slate-950 to-transparent z-2"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Badge minimalista */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-blue-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">
              Ecosistema Digital
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-extrabold text-white tracking-tighter
            leading-none uppercase drop-shadow-2xl"
          >
            {title}
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-slate-400 text-lg md:text-xl max-w-xl 
            leading-relaxed font-light italic"
          >
            {subtitle}
          </motion.p>

          {/* Indicador de Seguridad (Mejorado con Lucide) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex items-center gap-2 text-slate-500 text-[10px] 
            uppercase tracking-[0.2em] font-semibold"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Acceso Encriptado de Nivel Empresarial
          </motion.div>
        </div>
      </div>

      {/* Decoración lateral discreta */}
      <div
        className="hidden lg:block absolute right-0 top-0 h-full 
11      w-1/4 bg-linear-to-l from-blue-500/10 to-transparent pointer-events-none z-1"
      />
    </section>
  );
}
