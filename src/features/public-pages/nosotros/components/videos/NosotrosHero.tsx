// src/features/public-pages/nosotros/components/NosotrosHero.tsx
"use client";

import { motion } from "framer-motion";
export const NosotrosHero = () => {
  return (
    <section className="relative w-full h-svh flex items-center overflow-hidden">
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
      <div
        className="absolute inset-0 bg-linear-to-b 
      from-slate-950/20 via-slate-950/80 to-slate-950"
      />

      <div className="container mx-auto px-6 relative z-10 text-left">
        <motion.h1
          initial={false}
          animate={{ opacity: 1 }}
          className="text-4xl md:text-5xl lg:text-5xl 
          font-extrabold text-white tracking-tighter leading-tight"
        >
          RIGOR{" "}
          <span className="text-sky-500 decoration-sky-500/30">TÉCNICO</span>
          .<br />
          VISIÓN HUMANA.
        </motion.h1>
      </div>
    </section>
  );
};
