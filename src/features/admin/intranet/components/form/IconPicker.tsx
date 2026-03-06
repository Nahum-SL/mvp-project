// features/admin/intranet/components/form/IconPicker.tsx
"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react"; // Importamos el tipo específico
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

const ICON_LIST = [
  "Link",
  "FileText",
  "Users",
  "Briefcase",
  "Calendar",
  "Shield",
  "HardDrive",
  "Mail",
  "Globe",
  "MessageSquare",
  "BarChart",
  "ClipboardList",
  "Settings",
  "HelpCircle",
  "ExternalLink",
] as const; // 'as const' es vital para que IconName no sea solo string[]

export type IconName = (typeof ICON_LIST)[number];

interface Props {
  value: IconName; // Mantenemos string para compatibilidad con el schema de Zod
  onChange: (iconName: IconName) => void;
  error?: string;
}

export const IconPicker = ({ value, onChange, error }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Buscamos el componente de forma segura
  // Usamos el casting 'as LucideIcon' para que React sepa cómo renderizarlo
  const SelectedIcon =
    (Icons[value as keyof typeof Icons] as LucideIcon) || null;

  const filteredIcons = ICON_LIST.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4 p-6 bg-white rounded-4xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 italic">
          Icono del Acceso
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
        <Icons.Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
          size={14}
        />
        <input
          type="text"
          placeholder="Buscar icono..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all outline-none font-medium"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-5 gap-3 max-h-50 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
        {filteredIcons.map((iconName) => {
          // Tipado estricto en el mapeo
          const IconComponent = Icons[
            iconName as keyof typeof Icons
          ] as LucideIcon;

          return (
            <motion.button
              key={iconName}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(iconName)}
              className={cn(
                "p-3 rounded-2xl flex items-center justify-center transition-all border-2",
                value === iconName
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200"
                  : "bg-white text-slate-400 border-slate-50 hover:border-slate-200 hover:text-slate-600",
              )}
            >
              <IconComponent
                size={20}
                strokeWidth={value === iconName ? 2.5 : 2}
              />
            </motion.button>
          );
        })}
      </div>

      {error && (
        <p className="text-red-500 text-[10px] font-black italic uppercase tracking-widest bg-red-50 p-2 rounded-lg border border-red-100">
          {error}
        </p>
      )}
    </div>
  );
};
