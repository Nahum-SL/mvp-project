"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Service } from "@/src/types/servicio/servicio";

export default function ServiceSlugHero({ service }: { service: Service }) {
  return (
    <section
      className="relative w-full h-[60vh] min-h-125 
    overflow-hidden bg-slate-950 flex items-center"
    >
      {/* Imagen de Fondo con Efecto Parallax Suave */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={service.image || "/placeholder-service.jpg"}
          alt={service.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center opacity-40"
        />
      </motion.div>

      {/* Overlays Decorativos */}
      <div
        className="absolute inset-0 bg-linear-to-b 
      from-slate-950/20 via-slate-950/80 to-slate-950"
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge de Categoría */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-blue-500" />
              <span className="text-blue-400 font-extrabold uppercase tracking-[0.3em] text-[10px]">
                {service.businessTypes[0] || "Consultoría Especializada"}
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl text-white tracking-tighter leading-[1.1]">
              {service.title}
            </h1>

            {/* Puntos de dolor asociados como tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {service.painPoints.map((point) => (
                <span
                  key={point}
                  className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 
                  rounded-full text-white/80 text-[10px] font-bold uppercase tracking-wider"
                >
                  {point}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
