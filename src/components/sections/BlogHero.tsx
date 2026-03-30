// src/components/ui/layout/blog/BlogHeroHeader.tsx
"use client";

import { motion } from "framer-motion";
import { Newspaper, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  subtitle?: string;
  videoSrc?: string;
  videoPoster?: string;
}

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
          quality={60}
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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Badge de Sección */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 
          border border-blue-500/20 text-blue-400">
            <Newspaper size={16} className="animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em]">
              Centro de Inteligencia Fiscal
            </span>
          </div>

          {/* Título*/}
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif tracking-tighter leading-[0.9]">
            {title}
          </h1>

          {/* Subtítulo: Más legible sobre el video */}
          {subtitle && (
            <p
              className="text-slate-300 text-lg md:text-xl max-w-2xl 
            mx-auto font-medium leading-relaxed drop-shadow-md"
            >
              {subtitle}
            </p>
          )}

          {/* Línea decorativa animada */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1.5 bg-blue-600 rounded-full mx-auto mt-8 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
          />
        </motion.div>
      </div>

      {/* Indicador de scroll sutil */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-blue-500/50"
      >
        <Link href="/blog/#recentPost">
          <ChevronDown size={30} strokeWidth={1} />
        </Link>
      </motion.div>
    </section>
  );
};
