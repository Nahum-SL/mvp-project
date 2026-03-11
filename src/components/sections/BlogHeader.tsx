// src/components/ui/layout/blog/BlogHeroHeader.tsx
"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import Image from "next/image";

interface BlogHeroHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string; // opcional, para un hero con imagen
}

export const BlogHeader = ({
  title,
  subtitle,
  backgroundImage,
}: BlogHeroHeaderProps) => {
  return (
    <section
      className="relative w-full h-[60vh] md:h-[75vh] min-h-125 flex 
    items-center justify-center text-center"
    >
      {/* Imagen o gradiente de fondo */}
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 33vw"
          quality={75}
          className="object-cover object-center brightness-50"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950" />
      )}

      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl px-6 space-y-4"
      >
        <div className="inline-flex items-center gap-2 justify-center text-blue-500">
          <Newspaper size={22} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Centro de Recursos
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white leading-snug">
          {title}
        </h1>

        {subtitle && (
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="h-1 w-16 bg-blue-500 rounded-full mx-auto mt-3" />
      </motion.div>
    </section>
  );
};
