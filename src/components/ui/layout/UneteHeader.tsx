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
    <section className="relative w-full h-[60vh] md:h-[70vh] min-h-90 overflow-hidden bg-slate-950 flex items-center">
      {/* Imagen de fondo */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        quality={75}
        className="object-cover object-center opacity-40"
      />

      {/* Overlay: Cambiado a gradiente radial/lineal para mejorar legibilidad central */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} // Mismo efecto x: -30 que ServiceHeader
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Subtítulo dinámico para coherencia */}
            <span className="text-green-400 font-semibold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block">
              {subtitle}
            </span>

            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
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
