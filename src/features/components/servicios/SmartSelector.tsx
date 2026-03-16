// src/components/ui/layout/servicios/SmartSelector.tsx
import { Building2, AlertCircle, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ServiceFilters } from "@/src/types/servicio/servicio";
import { cn } from "@/src/lib/utils";

interface Props {
  // Tipamos la función del useState correctamente
  onFilterChange: Dispatch<SetStateAction<ServiceFilters>>;
  filters: ServiceFilters;
}

export const SmartSelector = ({ onFilterChange, filters }: Props) => {
  // Opciones
  const businessTypes = [
    { label: "MYPE", value: "mype" },
    { label: "Startup", value: "startup" },
    { label: "Corporativo", value: "corporativo" },
  ];

  return (
    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 -mt-32 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Paso 1: Tipo de Empresa */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Building2 size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Soy una...
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {businessTypes.map((type) => (
              <button
                key={type.value}
                onClick={() =>
                  onFilterChange((prev) => ({
                    ...prev,
                    businessType: type.value,
                  }))
                }
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                  filters.businessType == type.value
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
            onChange={(e) =>
              onFilterChange((prev) => ({ ...prev, painPoint: e.target.value }))
            }
            className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-600 outline-none"
          >
            <option value="">Todos los temas</option>
            <option value="impuestos">Reducir Impuestos</option>
            <option value="planillas">Gestión de Planillas</option>
            <option value="legal">Cumplimiento Legal</option>
            <option value="estrategia">Estrategia y Finanzas</option>
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
            placeholder="Ej: Auditoría..."
            onChange={(e) =>
              onFilterChange((prev) => ({ ...prev, search: e.target.value }))
            }
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
          className="mx-auto text-xs font-bold text-slate-400 justify-center items-center hover:text-blue-600 transition"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};
