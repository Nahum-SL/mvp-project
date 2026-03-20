"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
}

export default function ServiceHero({ title, subtitle, src, alt }: Props) {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] min-h-125 overflow-hidden">
      {/* h-[60vh] en móvil y h-[75vh] en desktop (aprox 600px - 750p */}
      {/* Imagen de fondo con Next.js Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 33vw"
        quality={75}
        className="object-cover object-center brightness-50" // Opacidad para el sombreado
      />

      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido del Header */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-8 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <span className="text-green-500 text-sm md:text-base leading-relaxed font-semibold">
            {subtitle}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-snug">
            {title}
          </h1>
          <div className="mt-6 w-20 h-1.5 bg-green-500 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
