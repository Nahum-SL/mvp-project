// Proximamente se conectara con el backend hecho con NestJS
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  src: string;
  alt: string;
}

export default function UneteHeader({
  title,
  subtitle = "Oportunidad Laboral",
  src,
  alt,
}: Props) {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] min-h-screen overflow-hidden flex items-center">
      {/* Imagen de fondo */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        quality={75}
        className="object-cover object-center"
      />

      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} // Mismo efecto x: -30 que ServiceHeader
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Subtítulo dinámico para coherencia */}
            <span className="text-green-500 text-sm md:text-base font-semibold leading-relaxed">
              {subtitle}
            </span>

            <h1 className="text-3xl md:text-5xl text-white leading-snug">
              {title}
            </h1>

            {/* Decoración centralizada */}
            <div className="mt-8 w-20 h-1.5 bg-green-500 mx-auto rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
