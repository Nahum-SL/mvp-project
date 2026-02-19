"use client";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

const stats = [
  { label: "Años de Experiencia", value: "30+", color: "text-blue-600" },
  { label: "Clientes Satisfechos", value: "700+", color: "text-slate-900" },
  { label: "Áreas de Producción", value: "20", color: "text-slate-900" },
  { label: "Casos Resueltos", value: "90%", color: "text-blue-600" },
];

export default function StatsGrid() {
  return (
    <section className="bg-slate-50 py-16 md:py-24 border-y border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-2"
            >
              <span
                className={cn(
                  "text-5xl md:text-7xl font-black tracking-tighter",
                  stat.color,
                )}
              >
                {stat.value}
              </span>
              <span className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
