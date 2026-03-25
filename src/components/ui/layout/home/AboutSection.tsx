// src/components/ui/layout/home/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import { AboutUs } from "@/src/types/unete/unete";
import { cn } from "@/src/lib/utils";
// Importamos los iconos necesarios
import { Award, Users, Building2, CheckCircle2, LucideIcon } from "lucide-react";

interface Props {
  data: AboutUs;
}

// Mapeo de iconos por ID
const iconMap: Record<number, LucideIcon> = {
  1: Award, // Experiencia
  2: Users, // Clientes
  3: Building2, // Áreas/Infraestructura
  4: CheckCircle2, // Casos resueltos
};

export default function AboutSection({ data }: Props) {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-slate-950 to-transparent opacity-[0.05]" />
      <div className="absolute -right-24 top-1/4 w-96 h-96 bg-blue-100/50 blur-[120px] rounded-full" />
      <div className="absolute -left-24 bottom-1/4 w-96 h-96 bg-green-50/50 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Lado Izquierdo: Texto Principal */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-green-500 rounded-full" />
                <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs">
                  Nuestra Trayectoria
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                {data.title}
              </h2>
              <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed font-light border-l-2 border-slate-200 pl-6">
                {data.description}
              </p>
            </motion.div>
          </div>

          {/* Lado Derecho: Grid de Cards */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            {data.history.map((item, index) => {
              const Icon = iconMap[item.id] || CheckCircle2; // Icono por defecto

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "relative group p-8 rounded-[2.5rem] transition-all duration-500",
                    "bg-white border border-slate-200 shadow-sm",
                    "hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2",
                    index % 2 !== 0 ? "md:mt-12" : "",
                  )}
                >
                  {/* Contenedor del Icono */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                      item.number > 50
                        ? "bg-blue-600/10 text-amber-400 group-hover:bg-yellow-500 group-hover:text-white"
                        : "bg-cyan-500/10 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white",
                    )}
                  >
                    <Icon size={28} strokeWidth={2.5} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-5xl font-extrabold text-slate-900 tracking-tighter">
                      {item.number}
                      <span className="text-blue-600 ml-1">+</span>
                    </h3>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] leading-tight group-hover:text-slate-900 transition-colors">
                      {item.text}
                    </p>
                  </div>

                  {/* Línea decorativa inferior */}
                  <div
                    className="absolute bottom-0 left-8 right-8 h-1 bg-linear-to-r 
                    from-blue-600 to-green-500 scale-x-0 group-hover:scale-x-100 
                    transition-transform duration-500 rounded-full"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
