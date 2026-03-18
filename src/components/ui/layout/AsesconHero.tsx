// src/components/ui/layout/AsesconHero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

interface HeroProps {
  companyName?: string;
  mainTitle: string;
  subtitle: string;
  ctaText: string;
  image: string; // La imagen de fondo
  onCtaClick?: () => void;
}

export default function AsesconHero({
  mainTitle,
  subtitle,
  ctaText,
  image,
  onCtaClick,
}: HeroProps) {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center 
    overflow-hidden bg-slate-950"
    >
      {/* 1. IMAGEN DE FONDO INMERSIVA */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt="Background"
          fill
          sizes="100vw" // CORREGIDO: Ocupa todo el ancho
          quality={80} // Ajuste ligero de calidad para balancear peso/visual
          priority // Mantenemos prioridad para LCP
          className="object-cover object-center" // Eliminado scale-105 para mejor LCP
        />

        {/* CORREGIDO: CAPA DE DEGRADADO UNIFICADA Y EFICIENTE */}
        {/* Usamos estilos en línea (inline styles) para combinar los degradados complejos en una sola capa */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `
              linear-gradient(to right, rgba(30, 58, 138, 0.2), transparent, transparent), /* Degradado Azul Izquierdo */
              linear-gradient(to top, #020617 0%, transparent 50%, rgba(2, 6, 17, 0.4) 100%), /* Degradado Vertical (from-via-to) */
              rgba(2, 6, 17, 0.7) /* Oscurecimiento general (Overley) */
            `,
          }}
        />
      </div>

      <div className="max-7xl mx-auto px-6 relative z-20 text-center">
        {" "}
        {/* Subimos z-index del contenido */}
        <div className="max-w-3xl mx-auto">
          {/* Título */}
          {/* OPTIMIZACIÓN LCP: Quitamos la animación inicial de opacity: 0 para que pinte instantáneamente */}
          <h1
            className="text-5xl md:text-5xl lg:text-5xl 
            font-black text-white tracking-tighter 
            leading-[0.9]"
          >
            {mainTitle}
          </h1>

          {/* Subtítulo con máximo contraste */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }} // Reducimos delay ligeramente
            className="mt-10 text-lg md:text-2xl text-slate-200 max-w-3xl 
            mx-auto leading-relaxed font-medium drop-shadow-md"
          >
            {subtitle}
          </motion.p>

          {/* Contenedor de Botones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }} // Reducimos delay ligeramente
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12"
          >
            {/* Link Principal (WhatsApp) */}
            <Link
              href="https://wa.me/51974770644"
              onClick={onCtaClick}
              className="
              group relative w-full sm:w-auto px-8 py-4 bg-white 
              text-slate-950 font-black rounded-full overflow-hidden 
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
              href="/servicio"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md text-white font-black rounded-full border border-white/20 hover:bg-white/10 transition-all uppercase tracking-widest text-sm flex items-center justify-center"
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
          font-black tracking-widest uppercase border-t border-white/10 pt-8"
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
