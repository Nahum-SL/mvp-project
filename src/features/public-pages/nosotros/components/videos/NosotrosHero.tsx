// src/features/public-pages/nosotros/components/NosotrosHero.tsx
"use client";

import { motion } from "framer-motion";
import HeroVideoBackground from "@/src/components/ui/layout/hero-video-background";

interface Props {
  titlePrimary?: string;
  titleSecondary?: string;
  subtitle?: string;
  badge?: string;
}

export const NosotrosHero = ({
  titlePrimary = "RIGOR TÉCNICO",
  titleSecondary = "VISIÓN HUMANA",
  subtitle = "Desde 1998 consolidando la seguridad jurídica y contable de las empresas peruanas.",
  badge = "NUESTRA ESENCIA",
}: Props) => {
  return (
    <section className="relative w-full h-[80vh] min-h-svh flex items-center overflow-hidden bg-slate-950">
      <HeroVideoBackground
        videoSrc="/nosotros-hero-video.webm"
        poster="/nosotros-hero-image.webp"
        delay={500}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Badge: Puede mantener la animación, no suele ser el LCP */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-emerald-500" />
            <span className="text-xs font-bold tracking-[0.3em] text-emerald-400 uppercase">
              {badge}
            </span>
          </motion.div>

          {/* TÍTULO: Quitamos initial/animate y usamos CSS puro para la entrada sutil */}
          <h1 className="text-4xl md:text-7xl lg:text-8xl text-white leading-[0.95] font-serif mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="block font-light opacity-90">{titlePrimary}.</span>
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-white via-white to-slate-500">
              {titleSecondary}.
            </span>
          </h1>

          {/* SUBTÍTULO (EL LCP): Cero Framer Motion aquí. Usamos clases de Tailwind para opacidad inmediata */}
          <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed font-light opacity-100 transition-opacity duration-700">
            {subtitle}
          </p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-6 hidden md:block"
          >
            <div className="w-px h-16 bg-linear-to-b from-sky-500 to-transparent opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
