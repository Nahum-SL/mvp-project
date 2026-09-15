// src/features/public/servicio/components/selector/search-filter.tsx
"use client";

import { X } from "lucide-react";
import { SearchAction } from "./selector-filter-item";
interface SearchFilterProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  onFocus: () => void;
  hasFilters: boolean;
  isPending?: boolean;
}

export function SearchFilter({
  value,
  onChange,
  onClear,
  onFocus,
  hasFilters,
  isPending,
}: SearchFilterProps) {
  return (
    <div className="flex-[1.5] flex items-center px-4 py-2 md:py-0">
      <div className="flex flex-col flex-1 pl-4 md:pl-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
          Búsqueda
        </span>
        <input
          type="text"
          placeholder="¿Qué servicio buscas?"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300 w-full focus:ring-0 p-0"
        />
      </div>

      <div className="flex items-center gap-2">
        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
            title="Limpiar filtros"
          >
            <X size={18} />
          </button>
        )}
        <SearchAction 
          isExpanded={hasFilters} 
          isPending={isPending} 
        />
      </div>
    </div>
  );
}
