// src/components/ui/icon-picker.tsx
"use client";

import { useState, useMemo } from "react";
import { Search, LucideIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

export interface IconPickerProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  icons: Record<T, LucideIcon>;
  error?: string;
  label?: string;
}

export const IconPicker = <T extends string>({
  value,
  onChange,
  icons,
  error,
  label = "Icono del Acceso",
}: IconPickerProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Convertimos las llaves del mapa de íconos inyectado en un Array indexable
  const iconList = useMemo(() => Object.keys(icons) as T[], [icons]);

  // Recuperamos el ícono seleccionado actualmente
  const SelectedIcon = icons[value] as LucideIcon;

  // Filtramos basándonos en el término de búsqueda
  const filteredIcons = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return iconList.filter((name) => name.toLowerCase().includes(lowerSearch));
  }, [searchTerm, iconList]);

  return (
    <div className="space-y-4 p-6 bg-white rounded-4xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 italic">
          {label}
        </h3>
        {SelectedIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100"
          >
            <SelectedIcon size={16} strokeWidth={3} />
            <span className="text-xs font-bold uppercase tracking-tighter">
              {value}
            </span>
          </motion.div>
        )}
      </div>

      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
          size={14}
        />
        <input
          type="text"
          placeholder="Buscar icono..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border-none 
          rounded-xl focus:ring-2 focus:ring-blue-500/20 
          transition-all outline-none font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-5 gap-3 max-h-50 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
        {filteredIcons.map((iconName) => {
          const IconComponent = icons[iconName] as LucideIcon;
          const isSelected = value === iconName;

          return (
            <motion.button
              key={iconName}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(iconName)}
              className={cn(
                "p-3 rounded-2xl flex items-center justify-center transition-all border-2",
                isSelected
                  ? "bg-sky-600 text-white border-slate-50 shadow-lg shadow-blue-200"
                  : "bg-white text-slate-400 border-slate-50 hover:border-slate-200 hover:text-slate-600",
              )}
            >
              <IconComponent size={20} strokeWidth={isSelected ? 2.5 : 2} />
            </motion.button>
          );
        })}
      </div>

      {error && (
        <p className="text-red-500 text-[10px] font-extrabold italic uppercase tracking-widest bg-red-50 p-2 rounded-lg border border-red-100">
          {error}
        </p>
      )}
    </div>
  );
};

// =======================
// ICON PICKER
// =======================

// SIRVE para:

// Zustand
// filtros
// selects externos
// settings
// configuraciones
// drawers
// preview
// componentes no-RHF