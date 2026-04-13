"use client";

import { motion } from "framer-motion";
import { Calculator, CalendarClock } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    title: "Calculadora de Gratificación",
    description:
      "Calcula tu gratificación en segundos con precisión según normativa peruana. Incluye bonificación extraordinaria y escenarios reales.",
    icon: Calculator,
    href: "/herramientas/calculadora-gratificacion",
    color: "emerald",
    badge: "Más usada",
  },
  {
    title: "Cronograma SUNAT",
    description:
      "Consulta automáticamente tus fechas de vencimiento según tu RUC y evita multas por retrasos.",
    icon: CalendarClock,
    href: "/herramientas/cronograma-sunat",
    color: "sky",
    badge: "Gratis",
  },
];

export default function ToolsGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-28">
      <div className="grid md:grid-cols-2 gap-10">
        {tools.map((tool, i) => {
          const Icon = tool.icon;

          return (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={tool.href} className="group block">
                <div
                  className="relative p-10 rounded-[2.5rem] border border-slate-800
                    bg-slate-900/50 backdrop-blur-xl
                    hover:border-slate-700 transition-all duration-300
                    hover:shadow-2xl hover:shadow-slate-900/50 overflow-hidden"
                >
                  {/* Glow */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition
                      bg-linear-to-br from-${tool.color}-500/20 to-transparent blur-3xl`}
                  />

                  {/* Badge */}
                  <div className="absolute top-6 right-6 text-[10px] uppercase tracking-widest text-slate-400">
                    {tool.badge}
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center
                        bg-${tool.color}-500/10 mb-6`}
                    >
                      <Icon className={`w-6 h-6 text-${tool.color}-500`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4">{tool.title}</h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                      {tool.description}
                    </p>

                    {/* CTA */}
                    <div
                      className={`inline-flex items-center gap-2 text-sm font-bold
                        text-${tool.color}-400 group-hover:text-${tool.color}-300 transition`}
                    >
                      Usar herramienta →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
