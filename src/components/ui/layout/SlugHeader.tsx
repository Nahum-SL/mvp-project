"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  src: string;
  alt: string;
  category: string;
  title: string;
}

export default function SlugHeader({ src, alt, category, title }: Props) {
  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] min-h-100 overflow-hidden bg-blue-950 flex items-center justify-center text-center">
      {/* Imagen de Fondo */}
      <Image
        src={src}
        alt={alt}
        fill
        priority // Recomendado para el Hero de la página
        sizes="100vh"
        quality={75}
        className="object-cover object-center opacity-40"
      />

      {/* Overlay: Gradiente radial para enfocar el texto y blur decorativo */}
      <div className="absolute inset-0 bg-radial-at-c from-blue-950/40 via-blue-950/80 to-blue-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-3xl rounded-full" />

      {/* Contenido Centrado */}
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
            {category}
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white mt-4 tracking-tighter leading-tight max-w-4xl mx-auto">
            {title}
          </h1>

          {/* Decoración similar al ServiceHeader pero centrada */}
          <div className="mt-8 w-16 h-1 bg-green-500 mx-auto rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
