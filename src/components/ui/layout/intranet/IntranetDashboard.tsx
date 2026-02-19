"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { intranetLinks } from "@/src/types/intranet";
import { cn } from "@/src/lib/utils";
import { FaArrowRight } from "react-icons/fa";

export default function IntranetDashboard() {
  return (
    <section className="relative py-24 bg-slate-950 min-h-screen">
      {/* Luces decorativas de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {intranetLinks.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.url || "#"}
                className={cn(
                  "group relative block h-full p-8 rounded-3xl transition-all duration-300",
                  "bg-white/3 border border-white/10 hover:border-blue-500/50",
                  "backdrop-blur-sm hover:bg-white/6 hover:shadow-2xl hover:shadow-blue-500/10",
                )}
              >
                {/* Icono / Indicador Decorativo */}
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 border-2 border-blue-400 rounded-md opacity-70" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {item.description}
                </p>

                {/* Footer del Card */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold">
                    Acceder ahora
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                    <FaArrowRight className="text-white text-xs -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                </div>

                {/* Resplandor interno al hacer hover */}
                <div className="absolute inset-0 rounded-3xl bg-radial-at-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
