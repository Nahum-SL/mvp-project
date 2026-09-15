// src/features/public/servicio/components/selector/selector-filter-item.tsx
"use client";

import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface FilterItemProps {
  label: string;
  value?: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export function SelectorFilterItem({
  label,
  value,
  active,
  onClick,
  children,
  className,
}: FilterItemProps) {
  const isSelected = Boolean(value && value !== "");

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={cn(
        "relative flex flex-col justify-center px-8 py-3 cursor-pointer transition-all duration-300 rounded-full select-none",
        "hover:bg-slate-100",
        active && "bg-white shadow-xl scale-105 z-30 hover:bg-white",
        className,
      )}
    >
      <span
        className={cn(
          "text-[10px] uppercase tracking-[0.2em] mb-0.5 transition-colors font-semibold",
          active ? "text-blue-600" : "text-slate-400",
        )}
      >
        {label}
      </span>

      <div
        className={cn(
          "text-sm font-bold truncate transition-colors",
          isSelected ? "text-slate-900" : "text-slate-500 font-medium",
        )}
      >
        {children}
      </div>

      {isSelected && !active && (
        <div className="absolute top-4 right-6 w-1.5 h-1.5 bg-blue-500 rounded-full" />
      )}
    </div>
  );
}

// Sub-componente de acción unificado aquí por alta cohesión de diseño
interface SearchActionProps {
  isExpanded: boolean;
  isPending?: boolean;
}

export function SearchAction({ isExpanded, isPending }: SearchActionProps) {
  return (
    <button
      type="button"
      className={cn(
        "relative flex items-center justify-center gap-2 rounded-full transition-all duration-500 shrink-0",
        "h-12 md:h-14",
        isExpanded
          ? "bg-emerald-500 w-full md:w-32 px-6 shadow-lg shadow-emerald-100"
          : "bg-sky-600 w-full md:w-14 shadow-lg shadow-sky-100",
        isPending && "opacity-70 cursor-wait",
      )}
    >
      {isPending ? (
        <div className="flex gap-1">
          <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
          <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
        </div>
      ) : (
        <>
          <Search size={18} className="text-white shrink-0" />
          {isExpanded && (
            <span className="text-white text-sm font-bold whitespace-nowrap">
              Buscar
            </span>
          )}
        </>
      )}
    </button>
  );
}
