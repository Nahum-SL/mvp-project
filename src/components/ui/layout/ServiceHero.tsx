// src/components/ui/layout/ServiceHero.tsx
"use client";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronDown } from "lucide-react";
import HeroVideoBackground from "./hero-video-background";

interface Props {
  title: string;
  subtitle?: string;
  videoSrc?: string;
  videoPoster?: string;
}

export default function ServiceHero({
  title,
  subtitle,
  videoSrc = "/video/servicios/servicios-hero-video.webm",
  videoPoster = "/servicios-hero.webp",
}: Props) {

  return (
    <section
      className="relative w-full h-[70vh] md:h-[80vh] 
    min-h-svh flex items-center justify-center overflow-hidden bg-slate-950"
    >

      <HeroVideoBackground 
      poster={videoPoster}
      videoSrc={videoSrc}
      delay={500}
      />

      {/* 2. CONTENIDO CENTRAL */}
      <div className="relative z-20 max-w-5xl px-6 text-center">
        <div className="space-y-6">
          {/* Badge de Confianza */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
          bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
          >
            <ShieldCheck size={16} className="animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em]">
              Soporte Empresarial 360°
            </span>
          </motion.div>

          {/* Título Principal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif tracking-tighter leading-[0.95]">
            {title}
          </h1>

          {/* Subtítulo */}
          {subtitle && (
            <p
              className="text-slate-200/70 text-lg md:text-xl max-w-2xl 
            mx-auto font-medium leading-relaxed drop-shadow-md"
            >
              {subtitle}
            </p>
          )}

          {/* Línea decorativa verde ASESCON */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-2 bg-emerald-500 rounded-full mx-auto mt-8 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          />
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-emerald-500/70"
      >
        <ChevronDown size={32} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
