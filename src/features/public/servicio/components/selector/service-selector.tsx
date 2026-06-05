// src/features/public/servicio/components/selector/service-selector.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { iconMap } from "@/src/lib/icons";
import { cn } from "@/src/lib/utils";
// Hooks
import { useServiceSelector } from "../../hooks/filters/use-service-selector";
// Types & Constants
import {
  BUSINESS_TYPES,
  PAIN_POINTS,
  type BusinessTypeID,
  type PainPointID,
} from "@/src/types/servicio/constants";
import type { ServiceFilters } from "@/src/types/servicio/servicio-types";
// Subcomponents
import { SelectorFilterItem } from "./selector-filter-item";
import { SearchFilter } from "./search-filter";

interface ServiceSelectorProps {
  filters: ServiceFilters;
  searchInput: string;
  setSearchInput: (val: string) => void;
  setBusinessType: (id?: BusinessTypeID) => void;
  setPainPoint: (id?: PainPointID) => void;
  clearFilters: () => void;
  isPending?: boolean;
}

type DropdownSection = "type" | "pain" | null;

export function ServiceSelector({
  filters,
  searchInput,
  setSearchInput,
  setBusinessType,
  setPainPoint,
  clearFilters,
  isPending,
}: ServiceSelectorProps) {
  const [activeSection, setActiveSection] = useState<DropdownSection>(null);
  const { selectedBusinessLabel, selectedPainPointLabel, isFiltered } =
    useServiceSelector(filters);

  const toggleSection = (section: DropdownSection) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="relative z-30 -mt-16 mx-auto max-w-5xl w-full px-4">
      <div
        className={cn(
          "bg-white/95 backdrop-blur-xl rounded-[2.5rem] md:rounded-full p-2 shadow-2xl border border-slate-200",
          "flex flex-col md:flex-row items-stretch md:items-center transition-all duration-500",
          activeSection && "ring-4 ring-slate-900/5",
        )}
      >
        {/* SECCIÓN 1: TIPO DE EMPRESA */}
        <div className="relative flex-1">
          <SelectorFilterItem
            label="Empresa"
            value={filters.businessType}
            active={activeSection === "type"}
            onClick={() => toggleSection("type")}
          >
            {selectedBusinessLabel}
          </SelectorFilterItem>

          <AnimatePresence>
            {activeSection === "type" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-3 bg-white rounded-4xl p-3 shadow-2xl border border-slate-100 min-w-70 z-50 overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-1">
                  {BUSINESS_TYPES.map((type) => {
                    const Icon = iconMap[type.icon as keyof typeof iconMap];
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          setBusinessType(type.id);
                          setActiveSection(null);
                        }}
                        className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 rounded-2xl text-left transition-colors group"
                      >
                        <div className="p-2 bg-slate-100 group-hover:bg-blue-100 rounded-xl transition-colors text-slate-500 group-hover:text-blue-600">
                          {Icon && <Icon size={16} />}
                        </div>
                        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
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
          <SelectorFilterItem
            label="Necesidad"
            value={filters.painPoint}
            active={activeSection === "pain"}
            onClick={() => toggleSection("pain")}
          >
            {selectedPainPointLabel}
          </SelectorFilterItem>

          <AnimatePresence>
            {activeSection === "pain" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 md:left-auto md:right-0 mt-3 bg-white rounded-4xl p-3 shadow-2xl border border-slate-100 min-w-75 z-50"
              >
                <div className="max-h-72 overflow-y-auto custom-scrollbar pr-1 flex flex-col gap-1">
                  {PAIN_POINTS.map((point) => {
                    const Icon = iconMap[point.icon as keyof typeof iconMap];
                    return (
                      <button
                        key={point.id}
                        type="button"
                        onClick={() => {
                          setPainPoint(point.id);
                          setActiveSection(null);
                        }}
                        className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 rounded-2xl text-left transition-colors group"
                      >
                        <div className="p-2 bg-slate-100 group-hover:bg-emerald-100 rounded-xl transition-colors text-slate-500 group-hover:text-emerald-600">
                          {Icon && <Icon size={16} />}
                        </div>
                        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
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

        {/* SECCIÓN 3: BÚSQUEDA INPUT */}
        <SearchFilter
          value={searchInput}
          onChange={setSearchInput}
          onClear={clearFilters}
          onFocus={() => setActiveSection(null)}
          hasFilters={isFiltered}
          isPending={isPending}
        />
      </div>

      {/* Overlay de cierre seguro */}
      {activeSection && (
        <div
          className="fixed inset-0 -z-10 bg-transparent"
          onClick={() => setActiveSection(null)}
        />
      )}
    </div>
  );
}
