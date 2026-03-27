// src/components/ui/layout/servicios/SmartSelector/Filter.tsx
import { cn } from "@/src/lib/utils";

interface FilterItemProps {
  label: string;
  value?: string; // Lo hacemos opcional
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const FilterItem = ({
  label,
  value,
  active,
  onClick,
  children,
  className,
}: FilterItemProps) => {
  // Verificamos si hay un valor real seleccionado (no vacío)
  const isSelected = value && value !== "";

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex flex-col justify-center px-8 py-3 cursor-pointer transition-all duration-300 rounded-full",
        "hover:bg-slate-100", // Hover sutil
        active && "bg-white shadow-xl scale-105 z-30 hover:bg-white", // Estado abierto
        className,
      )}
    >
      <span
        className={cn(
          "text-[10px] uppercase tracking-[0.2em] mb-0.5 transition-colors",
          active ? "text-blue-600" : "text-slate-400",
        )}
      >
        {label}
      </span>

      <div
        className={cn(
          "text-sm font-bold truncate transition-colors",
          isSelected ? "text-slate-900" : "text-slate-500 font-medium",
          // Si está seleccionado, el texto es más oscuro y fuerte
        )}
      >
        {children}
      </div>

      {/* Indicador visual de que hay un filtro activo (Punto azul) */}
      {isSelected && !active && (
        <div className="absolute top-3 right-6 w-1.5 h-1.5 bg-blue-500 rounded-full" />
      )}
    </div>
  );
};
