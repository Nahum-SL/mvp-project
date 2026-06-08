// src/components/ui/layout/blog/BlogHeroHeader.tsx
"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import Image from "next/image";

interface Props {
  title: string;
  subtitle?: string;
  videoSrc?: string;
  videoPoster?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export const BlogHero = ({
  title,
  subtitle,
  videoPoster = "/asesoria-niif.webp",
}: Props) => {
  return (
    <section
      className="relative w-full h-[70vh] md:h-[80vh] min-h-svh flex 
    items-center justify-center overflow-hidden bg-slate-950"
    >
      <div className="absolute inset-0 z-0">
        {/* 1. Imagen PRIORITARIA (LCP friendly) */}
        <Image
          src={videoPoster || "/fallback.jpg"}
          alt="Hero background"
          fill
          sizes="100vw"
          quality={75}
          priority
          className="object-cover object-center"
        />

        {/* Overlay de profundidad: Oscuro abajo para conectar con el feed de posts */}
        <div
          className="absolute inset-0 bg-linear-to-b 
          from-slate-950/40 via-slate-950/30 to-slate-950 z-10"
        />
      </div>

      {/* 2. CONTENIDO INFORMATIVO */}
      <div className="relative z-20 max-w-4xl px-6 text-center">
        <div className="space-y-6">
          {/* Badge de Sección */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 
          border border-blue-500/20 text-blue-400"
          >
            <Newspaper size={16} className="animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em]">
              Centro de Inteligencia Fiscal
            </span>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.4 }}
          >
            {/* Título*/}
            <h1 className="text-5xl md:text-7xl lg:text-8xl pb-5 text-white font-serif tracking-tighter leading-[0.9]">
              {title}
            </h1>

            {/* Subtítulo: Más legible sobre el video */}
            {subtitle && (
              <p
                className="text-slate-300 text-lg md:text-xl max-w-2xl 
            mx-auto font-medium font-sans leading-relaxed drop-shadow-md"
              >
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Línea decorativa animada */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
            className="h-1.5 w-15 bg-blue-600 rounded-full mx-auto mt-8 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
          />
        </div>
      </div>
    </section>
  );
};
