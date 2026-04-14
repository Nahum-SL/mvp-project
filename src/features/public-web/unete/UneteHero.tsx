"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Rocket,
  ChartNoAxesCombined,
  Handshake,
  Lightbulb,
} from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  src: string;
  alt: string;
}

export default function UneteHero({
  title,
  subtitle = "Oportunidad laboral",
  src,
  alt,
}: Props) {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* BACKGROUND IMAGE */}
      <Image
        src={src}
        alt={alt}
        sizes="100vw"
        fill
        priority
        className="object-cover opacity-40"
      />

      {/* GRADIENT OVERLAY PRO */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/80 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-blue-400 text-sm font-semibold tracking-wide uppercase"
            >
              {subtitle}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg max-w-lg"
            >
              Únete a un equipo que está transformando la forma en que las
              empresas gestionan su crecimiento. Buscamos talento con hambre de
              aprender y crecer.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("unete-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-all"
              >
                Postular ahora
              </button>

              <button className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all">
                Ver más
              </button>
            </motion.div>

            {/* TRUST / CULTURA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-6 pt-6 text-sm text-slate-400"
            >
              <span>✔ Crecimiento profesional</span>
              <span>✔ Buen ambiente</span>
              <span>✔ Proyectos reales</span>
            </motion.div>
          </div>

          {/* RIGHT SIDE (CARD FLOATING) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-white font-bold text-xl mb-4">
                ¿Por qué trabajar con nosotros?
              </h3>

              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-center gap-3">
                  <Rocket className="text-blue-400" size={18} />
                  <span>Proyectos con impacto real</span>
                </li>

                <li className="flex items-center gap-3">
                  <ChartNoAxesCombined className="text-blue-400" size={18} />
                  <span>Crecimiento constante</span>
                </li>

                <li className="flex items-center gap-3">
                  <Handshake className="text-blue-400" size={18} />
                  <span>Cultura colaborativa</span>
                </li>

                <li className="flex items-center gap-3">
                  <Lightbulb className="text-blue-400" size={18} />
                  <span>Innovación continua</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
