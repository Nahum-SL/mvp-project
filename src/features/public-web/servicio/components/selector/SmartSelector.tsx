// src/components/ui/layout/servicios/SmartSelector/index.tsx
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ServiceFilters } from "@/src/types/servicio/servicio";
import { BUSINESS_TYPES, PAIN_POINTS } from "@/src/types/servicio/constants";
import { FilterItem } from "./Filter";
import { SearchAction } from "./SearchAction";
import { iconMap } from "@/src/lib/icons"; // <-- Importamos tu mapa central
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onFilterChange: Dispatch<SetStateAction<ServiceFilters>>;
  filters: ServiceFilters;
  isPending?: boolean;
}

export const SmartSelector = ({
  onFilterChange,
  filters,
  isPending,
}: Props) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  // Debounce para la búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange((prev) => ({ ...prev, search: searchTerm }));
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, onFilterChange]);

  const selectedBusiness =
    BUSINESS_TYPES.find((t) => t.id === filters.businessType)?.label ||
    "Cualquiera";
  const selectedPain =
    PAIN_POINTS.find((p) => p.id === filters.painPoint)?.label ||
    "Todos los temas";
  const hasFilters = !!(
    filters.businessType ||
    filters.painPoint ||
    searchTerm
  );

  return (
    <div className="relative z-30 -mt-16 mx-auto max-w-5xl w-full px-4">
      <div
        className={cn(
          "bg-white/95 backdrop-blur-xl rounded-[2.5rem] md:rounded-full p-2 shadow-2xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center transition-all duration-500",
          activeSection && "ring-4 ring-slate-900/5",
        )}
      >
        {/* SECCIÓN 1: TIPO DE EMPRESA */}
        <div className="relative flex-1">
          <FilterItem
            label="Empresa"
            value={filters.businessType}
            active={activeSection === "type"}
            onClick={() =>
              setActiveSection(activeSection === "type" ? null : "type")
            }
          >
            {selectedBusiness}
          </FilterItem>

          <AnimatePresence>
            {activeSection === "type" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 mt-3 bg-white rounded-4xl 
                p-3 shadow-2xl border border-slate-100 min-w-70 z-50 overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-1">
                  {BUSINESS_TYPES.map((type) => {
                    const Icon = iconMap[type.icon as keyof typeof iconMap];
                    return (
                      <button
                        key={type.id}
                        onClick={() => {
                          onFilterChange((prev) => ({
                            ...prev,
                            businessType: type.id,
                          }));
                          setActiveSection(null);
                        }}
                        className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 rounded-2xl text-left transition-colors group"
                      >
                        <div className="p-2 bg-slate-100 group-hover:bg-blue-100 rounded-xl transition-colors text-slate-500 group-hover:text-blue-600">
                          {Icon && <Icon size={16} />}
                        </div>
                        <span className="text-sm font-bold text-slate-600">
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:block h-8 w-px bg-slate-100 mx-1" />

        {/* SECCIÓN 2: NECESIDAD / PROBLEMA */}
        <div className="relative flex-1">
          <FilterItem
            label="Necesidad"
            value={filters.painPoint}
            active={activeSection === "pain"}
            onClick={() =>
              setActiveSection(activeSection === "pain" ? null : "pain")
            }
          >
            {selectedPain}
          </FilterItem>

          <AnimatePresence>
            {activeSection === "pain" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 md:left-auto md:right-0 mt-3 
                bg-white rounded-4xl p-3 shadow-2xl border border-slate-100 min-w-75 z-50"
              >
                <div className="max-h-87.5 overflow-y-auto custom-scrollbar pr-1">
                  {PAIN_POINTS.map((point) => {
                    const Icon = iconMap[point.icon as keyof typeof iconMap];
                    return (
                      <button
                        key={point.id}
                        onClick={() => {
                          onFilterChange((prev) => ({
                            ...prev,
                            painPoint: point.id,
                          }));
                          setActiveSection(null);
                        }}
                        className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 rounded-2xl text-left transition-colors group"
                      >
                        <div className="p-2 bg-slate-100 group-hover:bg-emerald-100 rounded-xl transition-colors text-slate-500 group-hover:text-emerald-600">
                          {Icon && <Icon size={16} />}
                        </div>
                        <span className="text-sm font-bold text-slate-600">
                          {point.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:block h-8 w-px bg-slate-100 mx-1" />

        {/* SECCIÓN 3: BÚSQUEDA POR ESCRITO*/}
        <div className="flex-[1.5] flex items-center px-4 py-2 md:py-0">
          <div className="flex flex-col flex-1 pl-4 md:pl-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
              Búsqueda
            </span>
            <input
              type="text"
              placeholder="¿Qué servicio buscas?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setActiveSection(null)}
              className="bg-transparent border-none outline-none text-sm 
              font-bold text-slate-700 placeholder:text-slate-300 w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            {hasFilters && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  onFilterChange({
                    businessType: undefined,
                    painPoint: undefined,
                    search: "", 
                  });
                }}
                className="p-2 text-red-300 hover:text-red-500 transition-colors"
                title="Limpiar filtros"
              >
                <X size={18} />
              </button>
            )}
            <SearchAction isExpanded={hasFilters} isPending={isPending} />
          </div>
        </div>
      </div>

      {/* Overlay invisible para cerrar al hacer clic fuera */}
      {activeSection && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setActiveSection(null)}
        />
      )}
    </div>
  );
};
