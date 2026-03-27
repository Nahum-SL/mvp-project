// src/components/ui/layout/AsesconHero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface HeroProps {
  companyName?: string;
  mainTitle: string;
  subtitle: string;
  ctaText: string;
  videoPoster?: string; // La imagen de fondo
  onCtaClick?: () => void;
}

export default function AsesconHero({
  mainTitle,
  subtitle,
  ctaText,
  videoPoster,
  onCtaClick,
}: HeroProps) {
  return (
    <section
      className="relative w-full min-h-svh flex items-center justify-center 
    overflow-hidden bg-slate-950"
    >
      {/* 1. IMAGEN DE FONDO INMERSIVA */}
      <div className="absolute inset-0 z-0">
        {/* El Video de fondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={videoPoster}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Video de Prueba */}
          <source src="/asescon-hero-video.webm" type="video/webm" />
        </video>

        {/* Overlay de gradiente para que el texto sea legible */}
        <div
          className="absolute inset-0 bg-linear-to-b 
      from-slate-950/20 via-slate-950/30 to-slate-950"
        />
      </div>

      <div className="max-7xl mx-auto px-6 relative z-20 text-center">
        {" "}
        {/* Subimos z-index del contenido */}
        <div className="max-w-2xl mx-auto">
          {/* Título */}
          {/* OPTIMIZACIÓN LCP: Quitamos la animación inicial de opacity: 0 para que pinte instantáneamente */}
          <h1
            className="text-4xl md:text-5xl lg:text-5xl font-serif
            text-white tracking-tighter leading-tight"
          >
            {mainTitle}
          </h1>

          {/* Subtítulo con máximo contraste */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }} // Reducimos delay ligeramente
            className="mt-10 text-lg md:text-2xl text-slate-300 max-w-3xl 
            mx-auto leading-relaxed font-medium drop-shadow-md"
          >
            {subtitle}
          </motion.p>

          {/* Contenedor de Botones */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }} // Reducimos delay ligeramente
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12"
          >
            {/* Link Principal (WhatsApp) */}
            <Link
              href="https://wa.me/51974770644"
              onClick={onCtaClick}
              className="
              group relative w-full sm:w-auto px-8 py-4 bg-white 
              text-slate-950 font-medium rounded-full overflow-hidden 
              transition-all hover:scale-105 active:scale-95 
              flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <div
                className="absolute inset-0 bg-[#25D366] translate-y-full 
              group-hover:translate-y-0 transition-transform duration-300"
              />
              <div
                className="relative flex items-center gap-2 
              group-hover:text-white transition-colors duration-300"
              />
              <div
                className="relative flex items-center gap-2 
              group-hover:text-white transition-colors duration-300"
              >
                <FaWhatsapp size={22} className="shrink-0" />
                <span className="uppercase tracking-widest text-sm">
                  {ctaText}
                </span>
              </div>
            </Link>

            {/* Botón Secundario */}
            <Link
              href="/servicio?from=ver_servicios"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md text-white font-medium rounded-full border border-white/20 hover:bg-white/10 transition-all uppercase tracking-widest text-sm flex items-center justify-center"
            >
              Ver Servicios
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats inferiores con línea decorativa */}
      <div className="absolute bottom-12 w-full z-10 hidden md:block">
        <div className="container mx-auto px-6">
          <div
            className="flex justify-between items-center text-white/50 text-[10px] 
          font-medium tracking-widest uppercase border-t border-white/10 pt-8"
          >
            <span className="hover:text-blue-400 transition-colors cursor-default">
              Estrategia Fiscal
            </span>
            <span className="hover:text-blue-400 transition-colors cursor-default">
              Auditoría Integral
            </span>
            <span className="hover:text-blue-400 transition-colors cursor-default">
              Consultoría Legal
            </span>
          </div>
        </div>
      </div>

      {/* Luz inferior decorativa - Mantenemos esta para el desvanecimiento final */}
      <div
        className="absolute bottom-0 w-full h-32 bg-linear-to-t 
      from-slate-950 to-transparent z-10"
      />
    </section>
  );
}
