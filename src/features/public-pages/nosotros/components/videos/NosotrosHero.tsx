// src/features/public-pages/nosotros/components/NosotrosHero.tsx
"use client";

import { motion } from "framer-motion";
export const NosotrosHero = () => {
  return (
    <section className="relative h-[80vh] min-h-screen flex items-center overflow-hidden">
      {/* El Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* Video de Prueba */}
        <source src="/nosotros-hero-video.webm" type="video/webm" />
      </video>

      {/* Overlay de gradiente para que el texto sea legible */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black text-white italic tracking-tighter"
        >
          RIGOR {" "}
          <span className="text-sky-500 decoration-sky-500/30">
            TÉCNICO
          </span>
          .<br />
          VISIÓN HUMANA.
        </motion.h1>
      </div>
    </section>
  );
};
