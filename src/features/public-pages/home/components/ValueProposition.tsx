// src/features/public-pages/home/components/ValueProposition.tsx
"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import { InteractiveVideoBox } from "@/src/features/public-pages/nosotros/components/videos/InteractiveVideoBox";
import { motion } from "framer-motion";
import Link from "next/link";

export const ValueProposition = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* 
            Ajuste CLS: Añadimos min-h-[600px] (aprox) para reservar el espacio 
            y contain-paint para aislar el renderizado.
        */}
        <div className="bg-slate-950 rounded-[4rem] p-10 md:p-20 
        relative overflow-hidden shadow-3xl min-h-125 lg:min-h-162.5 transition-all">
          {/* Fondo con Grid: Agregamos will-change-opacity */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none will-change-auto" />

          {/* Decoraciones: Usamos transform-gpu para que el navegador las maneje por hardware */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full transform-gpu" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full transform-gpu" />

          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">

            {/* LADO DERECHO: Texto */}
            <div className="w-full lg:w-2/5 space-y-10">
              <div className="space-y-6">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-blue-400 font-black uppercase text-xs tracking-[0.4em] block"
                >
                  ¿Por qué ASESCON?
                </motion.span>

                <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] italic tracking-tighter">
                  Seguridad que <span className="text-blue-500">impulsa</span>{" "}
                  su negocio.
                </h2>

                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  No somos gestores tradicionales. Nuestra metodología de
                  **auditoría preventiva** permite que usted tome decisiones
                  basadas en certezas, no en suposiciones.
                </p>
              </div>

              {/* Beneficios */}
              <div className="space-y-3">
                {[
                  "Cumplimiento 100% Garantizado",
                  "Reducción de Riesgos Fiscales",
                  "Soporte Senior Inmediato",
                ].map((item) => (
                  <div // Cambiamos motion.div por div simple para el contenedor si causa saltos
                    key={item}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <CheckCircle2
                      className="text-blue-500"
                      size={18}
                      strokeWidth={3}
                    />
                    <span className="text-sm font-bold text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/nosotros"
                  className="inline-flex items-center gap-3 text-white font-black uppercase text-xs tracking-widest hover:text-blue-400 transition-colors group"
                >
                  Conoce nuestra metodología
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
