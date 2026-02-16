"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/src/types/servicios";
import { cn } from "@/src/lib/utils";

const categories = ["Todos", "Outsourcing", "Asesoria", "Especializados"];

export default function ServiceDashboard() {
  const [activeTab, setActiveTab] = useState("Todos");

  const filteredServices = activeTab === "Todos" 
    ? servicesData 
    : servicesData.filter(s => s.category === activeTab);

  return (
    <section className="px-8 py-20 bg-white">
      {/* Buscador / Filtro Estilo Dashboard */}
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl font-bold text-blue-950 mb-8">Nuestros Servicios</h2>
        
        <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
                activeTab === cat 
                  ? "bg-white text-blue-700 shadow-md" 
                  : "text-slate-500 hover:text-blue-900"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cards */}
      <motion.div 
        layout
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-blue-50 rounded-2xl mb-6 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {/* Aquí puedes poner un icono según el ID */}
                  <span className="text-xs font-bold">{service.id}</span>
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{service.description}</p>
              </div>
              
              <button className="mt-8 text-blue-600 font-bold text-sm inline-flex items-center group-hover:underline">
                Consultar servicio
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}