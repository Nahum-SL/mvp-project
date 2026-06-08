"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import HeroVideoBackground from "@/src/components/ui/layout/hero-video-background";

interface Props {
  title: string;
  subtitle: string;
  videoSrc?: string; // Ruta del .webm
  posterSrc?: string; // Ruta de la imagen fija (fallback)
}

export default function IntranetHero({
  title,
  subtitle,
  posterSrc = "/fondo-intranet.webp",
  videoSrc = "/video/intranet/intranet-hero-video.webm",
}: Props) {
  return (
    <section
      className="relative w-full h-[80vh] md:h-[75vh] min-h-svh 
    overflow-hidden bg-slate-950 flex items-center"
    >
      <HeroVideoBackground
        poster={posterSrc}
        videoSrc={videoSrc}
        delay={0}
        overlay={
          <>
            {/* Overlay lateral (clave para texto) */}
            <div className="absolute inset-0 z-10 bg-linear-to-r from-slate-950 via-slate-950/70 to-transparent" />

            {/* Overlay inferior */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-slate-950 to-transparent z-10" />
          </>
        }
      />

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
            <span
              className="text-blue-400 font-bold uppercase tracking-[0.4em] 
            text-[10px] md:text-xs"
            >
              Ecosistema Digital
            </span>
          </motion.div>

          {/* Título */}
          <h1
            className="text-5xl md:text-7xl
            text-white tracking-tighter font-serif
            leading-none uppercase drop-shadow-2xl"
          >
            {title}
          </h1>

          {/* Subtítulo */}
          <p
            className="mt-6 text-slate-400 text-lg md:text-xl max-w-xl 
            leading-relaxed font-light"
          >
            {subtitle}
          </p>

          {/* Indicador de Seguridad (Mejorado con Lucide) */}
          <div
            className="mt-10 flex items-center gap-2 text-slate-300 text-[10px] 
            uppercase tracking-[0.2em] font-semibold"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Acceso Encriptado
          </div>
        </div>
      </div>

      {/* Decoración lateral discreta */}
      <div
        className="hidden lg:block absolute right-0 top-0 h-full 
        w-1/4 bg-linear-to-l from-blue-500/10 to-transparent pointer-events-none z-1"
      />
    </section>
  );
}
