"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface HeroProps {
  companyName: string;
  mainTitle: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export default function AsesconHero({
  companyName = "ASESCON",
  mainTitle,
  subtitle,
  ctaText,
  onCtaClick,
}: HeroProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center text-center pt-5">
      {/* Background Decorativo: Efecto de iluminación superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Badge Superior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-[0.3em] text-blue-400 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {companyName}
            </span>
          </motion.div>

          {/* Título Principal con Gradiente */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white text-shadow-2xs tracking-tighter leading-[0.95]"
          >
            {mainTitle}
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {subtitle}
          </motion.p>

          {/* Botones de Acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onCtaClick}
              className="group relative px-8 py-4 bg-white text-slate-950 font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              {/* Fondo que sube en hover */}
              <div className="absolute inset-0 bg-[#25D366] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

              {/* Contenido del botón (Icono + Texto) */}
              <div className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <FaWhatsapp size={22} className="shrink-0" />
                <span className="uppercase tracking-widest text-sm">
                  {ctaText}
                </span>
              </div>
            </button>{" "}
            <Link
              href="/servicios"
              className="px-8 py-4 bg-transparent text-white font-bold rounded-full border border-white/20 hover:bg-white/5 transition-colors uppercase tracking-widest text-sm"
            >
              Saber más
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Elemento decorativo inferior: Línea de horizonte */}
      <div className="absolute bottom-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

      {/* Stats rápidas flotantes (Solo Desktop) */}
      <div className="absolute bottom-12 left-0 w-full hidden md:block">
        <div className="container mx-auto px-6 flex justify-between items-center text-white/40 text-[10px] font-bold tracking-[0.5em] uppercase">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Estrategia Fiscal
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            Auditoría Integral
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            Consultoría Legal
          </motion.span>
        </div>
      </div>
    </section>
  );
}
