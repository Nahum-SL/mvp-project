"use client";

import { useState } from "react";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/src/types/servicios";
import { cn } from "@/src/lib/utils";

const categories = ["Todos", "Outsourcing", "Asesoria", "Especializados"];

export default function ServiceDashboard() {
  const [activeTab, setActiveTab] = useState("Todos");

  const filteredServices =
    activeTab === "Todos"
      ? servicesData
      : servicesData.filter((s) => s.category === activeTab);

  return (
    <section className="px-6 py-24 bg-slate-50">
      {/* Título Principal - Aumentado para impacto y claridad */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-extrabold text-blue-950 tracking-tight">
          Nuestras Soluciones
        </h2>
        <p className="mt-4 text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
          Servicios integrales diseñados para potenciar el crecimiento de su
          empresa.
        </p>
      </div>

      {/* Filtros - Corregidos para Scroll Móvil */}
      <div className="w-full max-w-7xl mx-auto overflow-x-auto pb-8 no-scrollbar flex justify-start md:justify-center px-4 md:px-0">
        <div
          className={cn(
            "inline-flex bg-white p-2 rounded-2xl border border-slate-200 shadow-sm",
            "flex-nowrap whitespace-nowrap",
            "mx-auto md:mx-0", // Esto ayuda a mantener el centrado si hay espacio
          )}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-6 md:px-8 py-3 rounded-xl text-sm md:text-base 2xl:text-lg font-bold transition-all duration-300 relative",
                activeTab === cat
                  ? "text-blue-700"
                  : "text-slate-500 hover:text-blue-900",
              )}
            >
              {activeTab === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-50 rounded-xl border border-blue-100 -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Grid de Cards - Ajustado para legibilidad */}
      <motion.div
        layout
        className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group bg-white rounded-4xl p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Badge de Categoría para contexto rápido */}
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                  {service.category}
                </span>

                {/* Título de Card - Aumentado a 2xl/3xl */}
                <h3 className="text-2xl md:text-3xl font-bold text-blue-950 mt-6 mb-4 leading-snug">
                  {service.title}
                </h3>

                {/* Descripción - Aumentada a text-base/lg y mejor contraste */}
                <p className="text-slate-600 leading-relaxed text-base md:text-lg 2xl:text-xl">
                  {service.description}
                </p>
              </div>

              {/* Botón de acción - Más grande y con mejor área de click */}
              <Link
                href={`/servicios/${service.slug}`}
                className="mt-10 w-fit text-blue-700 font-extrabold text-base md:text-lg inline-flex items-center group-hover:gap-3 transition-all"
              >
                Consultar servicio
                <svg
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
