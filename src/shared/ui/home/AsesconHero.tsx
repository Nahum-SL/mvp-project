"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface HeroProps {
  companyName?: string; // Lo volví opcional por si no se usa
  mainTitle: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export default function AsesconHero({
  mainTitle,
  subtitle,
  ctaText,
  onCtaClick,
}: HeroProps) {
  return (
    <section className="
    relative min-h-screen w-full overflow-hidden bg-slate-950 
    flex flex-col justify-between text-center pt-32 md:pt-44 pb-12 md:pb-32
    ">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-14">
          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.95]"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={onCtaClick}
              className="group relative w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-[#25D366] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <FaWhatsapp size={22} className="shrink-0" />
                <span className="uppercase tracking-widest text-sm">
                  {ctaText}
                </span>
              </div>
            </button>
            <Link
              href="/servicios"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold rounded-full border border-white/20 hover:bg-white/5 transition-colors uppercase tracking-widest text-sm"
            >
              Saber más
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats - Limpio y solo para Desktop */}
      <div className="hidden lg:block relative z-10 w-full mt-10 mb-10">
        <div className="container mx-auto px-6">
          <div className="
          flex justify-between items-center text-white/40 text-[10px]
          font-bold tracking-[0.5em]
          uppercase border-t border-white/10 pt-4
          ">
            {[
              "Estrategia Fiscal",
              "Auditoría Integral",
              "Consultoría Legal",
            ].map((stat, i) => (
              <motion.span
                key={stat}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.2 }}
              >
                {stat}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Línea decorativa final */}
      <div className="absolute bottom-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent"/>
    </section>
  );
}
