"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
}

export default function ServiceHeader({ title, subtitle, src, alt }: Props) {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] min-h-125 overflow-hidden bg-blue-950">
      {/* h-[60vh] en móvil y h-[75vh] en desktop (aprox 600px - 750p */}
      {/* Imagen de fondo con Next.js Image */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vh"
        quality={75}
        className="object-cover object-center opacity-60" // Opacidad para el sombreado
      />

      {/* Overlay Gradiente (Azul Oscuro hacia Transparente) */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-950/90 via-blue-950/50 to-transparent" />

      {/* Contenido del Header */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-8 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-green-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
            {subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl leading-tight">
            {title}
          </h1>
          <div className="mt-6 w-20 h-1.5 bg-green-500 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}