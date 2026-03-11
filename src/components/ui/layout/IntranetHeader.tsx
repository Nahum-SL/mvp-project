"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
}

export default function IntranetHeader({ title, subtitle, src, alt }: Props) {
  return (
    <section className="relative w-full h-[65vh] md:h-[75vh] min-h-125 overflow-hidden bg-slate-950 flex items-center">
      {/* Background Image con máscara de desvanecimiento */}
      <div className="absolute inset-0 z-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          priority
          quality={75}
          className="object-cover object-right md:object-center opacity-60"
        />
        {/* Gradiente lineal de izquierda a derecha para asegurar legibilidad del texto */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Badge minimalista estilo corporativo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-0.5 bg-blue-500" />
            <span className="text-blue-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">
              Portal Corporativo
            </span>
          </motion.div>

          {/* Título: Mantenemos el impacto pero con alineación izquierda */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase"
          >
            {title}
          </motion.h1>

          {/* Subtítulo: Más descriptivo y elegante */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed font-light italic"
          >
            {subtitle}
          </motion.p>

          {/* Elemento de confianza: Un pequeño detalle de "Seguridad" */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-widest"
          >
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Acceso Encriptado y Seguro
          </motion.div>
        </div>
      </div>

      {/* Decoración lateral derecha (Solo Desktop) */}
      <div className="hidden lg:block absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-blue-600/5 to-transparent pointer-events-none" />
    </section>
  );
}
