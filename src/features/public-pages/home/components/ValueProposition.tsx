// src/features/public-pages/home/components/ValueProposition.tsx
"use client";

import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Definimos los beneficios con iconos para que los cuadros tengan más peso visual
export const beneficios = [
  {
    title: "Cumplimiento 100%",
    desc: "Garantía total ante auditorías",
    icon: ShieldCheck,
  },
  {
    title: "Reducción de Riesgos",
    desc: "Escudo fiscal preventivo",
    icon: TrendingUp,
  },
  {
    title: "Soporte Senior",
    desc: "Asesoría experta inmediata",
    icon: Headphones,
  },
];

export const ValueProposition = () => {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="bg-slate-950 rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-3xl min-h-125 lg:min-h-162.5 transition-all">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none will-change-auto" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full transform-gpu" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full transform-gpu" />

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
            {/* LADO IZQUIERDO: Mensaje Principal */}
            <div className="w-full lg:w-1/2 space-y-10">
              <div className="space-y-6">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-blue-400 font-extrabold uppercase text-xs tracking-[0.4em] block"
                >
                  ¿Por qué ASESCON?
                </motion.span>

                <h2 className="text-4xl md:text-6xl text-white leading-[1.1] tracking-tighter">
                  Seguridad que <span className="text-sky-600 to-cyan-500 from-amber-50">impulsa</span>{" "}
                  su negocio.
                </h2>

                <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl">
                  No somos gestores tradicionales. Nuestra metodología de
                  auditoría preventiva permite que usted tome decisiones basadas
                  en certezas, no en suposiciones.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/nosotros?from=nuestra_metodologia"
                  className="inline-flex items-center gap-3 text-white font-bold 
                  uppercase text-xs tracking-widest hover:text-blue-400 transition-colors group"
                >
                  Conoce nuestra metodología
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </Link>
              </div>
            </div>

            {/* LADO DERECHO: Cuadros de Beneficios (Grid) */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {beneficios.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      group p-8 rounded-[2.5rem] border border-white/10 transition-all duration-500
                      bg-white/5 hover:bg-blue-600/10 hover:border-blue-500/50 hover:-translate-y-2
                      ${index === 2 ? "sm:col-span-2" : ""}
                    `}
                  >
                    <div className="flex flex-col gap-4">
                      <div
                        className="bg-blue-500/10 w-12 h-12 rounded-2xl flex items-center 
                      justify-center group-hover:bg-blue-500/50 transition-colors"
                      >
                        <item.icon
                          className="text-blue-500 group-hover:text-white"
                          size={24}
                        />
                      </div>
                      <div>
                        <h3 className="text-white text-xl tracking-tight mb-1">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-sm font-medium leading-snug">
                          {item.desc}
                        </p>
                      </div>
                      <CheckCircle2
                        className="text-blue-500/20 group-hover:text-emerald-500 ml-auto transition-colors"
                        size={20}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
