"use client";

import { motion } from "framer-motion";
import { AboutUs } from "@/src/types/unete/unete";
import { cn } from "@/src/lib/utils";

interface Props {
  data: AboutUs;
}

// Exportado --> src/app/page.tsx

export default function AboutSection({ data }: Props) {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">

      {/* Elementos decorativos de fondo para suavizar la transición */}
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
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                {data.title}
              </h2>
              <p className="mt-8 text-lg text-slate-600 leading-relaxed font-light border-l-2 border-slate-200 pl-6">
                {data.description}
              </p>
            </motion.div>
          </div>

          {/* Lado Derecho: Grid de Cards de Historia/Stats */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-2 gap-6">
            {data.history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative group p-8 rounded-3xl transition-all duration-500",
                  "bg-white border border-slate-200 shadow-sm",
                  "hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2",
                  index % 2 !== 0 ? "md:mt-12" : "", // Efecto de grid escalonado
                )}
              >
                {/* Decoración superior de la card */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl mb-6 flex items-center justify-center transition-colors",
                    item.number > 50
                      ? "bg-blue-600/10 text-blue-600"
                      : "bg-green-500/10 text-green-600",
                  )}
                >
                  <span className="text-xl font-bold italic"></span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter">
                    {item.number}
                    <span className="text-blue-600">+</span>
                  </h3>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs leading-tight">
                    {item.text}
                  </p>
                </div>

                {/* Línea decorativa inferior que aparece en hover */}
                <div 
                className="absolute bottom-0 left-8 right-8 h-1 bg-linear-to-r 
                from-blue-600 to-green-500 scale-x-0 group-hover:scale-x-100 
                transition-transform duration-500 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
