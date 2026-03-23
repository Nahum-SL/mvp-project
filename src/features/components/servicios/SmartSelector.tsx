// src/components/ui/layout/servicios/SmartSelector.tsx

import { useState, useEffect } from "react";
import { Building2, AlertCircle, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ServiceFilters } from "@/src/types/servicio/servicio";
import { cn } from "@/src/lib/utils";
import {
  BUSINESS_TYPES,
  type PainPointID,
  PAIN_POINTS,
} from "@/src/types/servicio/constants";

interface Props {
  // Tipamos la función del useState correctamente
  onFilterChange: Dispatch<SetStateAction<ServiceFilters>>;
  filters: ServiceFilters;
  isPending?: boolean;
}

export const SmartSelector = ({
  onFilterChange,
  filters,
  isPending,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState(filters.search);

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange((prev) => ({ ...prev, search: searchTerm }));
    }, 300); // Espera 300ms después de dejar de escribir

    return () => clearTimeout(handler);
  }, [searchTerm, onFilterChange]);

  return (
    <div
      className={cn(
        "bg-white p-8 md:p-12 rounded-[3rem] transition-all duration-500 shadow-xl border border-slate-100 -mt-32 relative z-10",
        isPending && "opacity-70 cursor-wait", // Feedback visual de carga
      )}
    >
      {/* Indicador de carga sutil */}
      {isPending && (
        <div className="absolute top-4 right-10 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
          <span className="text-[10px] font-bold text-blue-600 uppercase">
            Actualizando...
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Paso 1: Tipo de Empresa */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Building2 size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Mi empresa es ..
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {BUSINESS_TYPES.map((type) => (
              <button
                key={type.id}
                disabled={isPending}
                onClick={() =>
                  onFilterChange((prev) => ({
                    ...prev,
                    businessType: type.id,
                  }))
                }
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                  filters.businessType == type.id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-slate-200 bg-slate-50 hover:bg-blue-50",
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Paso 2: Punto de Dolor */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Ayuda con...
            </span>
          </div>
          <select
            value={filters.painPoint}
            onChange={(e) =>
              onFilterChange((prev) => ({
                ...prev,
                painPoint: e.target.value as PainPointID | "",
              }))
            }
            className="w-full p-4 bg-slate-50 rounded-2xl 
            border-none focus:ring-2 focus:ring-blue-600 font-bold 
            text-slate-600 outline-none appearance-none"
          >
            <option value="">Todos los temas</option>
            {PAIN_POINTS.map((point) => (
              <option key={point.id} value={point.id}>
                {point.label}
              </option>
            ))}
          </select>
        </div>

        {/* Paso 3: Buscador */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Search size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Búsqueda rápida
            </span>
          </div>
          <input
            type="text"
            value={searchTerm}
            placeholder="Ej: Auditoría..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-600 placeholder:text-slate-300 outline-none"
          />
        </div>
        <button
          onClick={() =>
            onFilterChange({
              businessType: "",
              painPoint: "",
              search: "",
            })
          }
          className="flex text-xs font-bold text-slate-400 justify-center items-center hover:text-blue-600 transition"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};
