// features/admin/unete/components/CandidatoFilters.tsx
"use client";

import { Filter, Search } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { JobAppStatus } from "../types";

interface Props {
  activeFilter: JobAppStatus | "TODOS";
  onFilterChange: (filter: JobAppStatus | "TODOS") => void;
  totalResults: number;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export const CandidatoFilters = ({
  activeFilter,
  onFilterChange,
  totalResults,
  searchTerm,
  onSearchChange,
}: Props) => {
  // Definimos explícitamente el tipo del array
  const options: (JobAppStatus | "TODOS")[] = [
    "TODOS",
    ...Object.values(JobAppStatus),
  ];

  return (
    <div
      className="flex flex-col md:flex-row items-center gap-4 
    justify-between bg-white/50 p-2 rounded-4xl 
    md:rounded-3xl border border-slate-100 backdrop-blur-sm"
    >
      {/* --- INPUT DE BÚSQUEDA --- */}
      <div className="relative w-full md:w-72 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 
          text-slate-400 group-focus-within:text-blue-500 transition-colors"
          size={16}
        />
        <input
          type="text"
          placeholder="Buscar por nombre o DNI..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white border border-slate-100 rounded-2xl 
          py-2.5 pl-11 pr-4 text-xs font-medium outline-none focus:ring-2 
          focus:ring-blue-500/10 focus:border-blue-500/50 transition-all"
        />
      </div>

      {/* --- BOTONES DE FILTRO --- */}
      <div className="flex flex-wrap gap-1 justify-center">
        {options.map((s) => (
          <button
            key={s}
            onClick={() => onFilterChange(s)}
            className={cn(
              "px-4 py-2 text-xs font-extrabold uppercase tracking-tighter rounded-2xl transition-all",
              activeFilter === s
                ? "bg-emerald-500 text-white shadow-lg shadow-slate-200"
                : "text-slate-400 hover:bg-slate-100",
            )}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* --- CONTADOR --- */}
      <div
        className="hidden lg:flex px-4 text-[10px] font-extrabold 
      text-slate-300 uppercase tracking-widest items-center gap-2"
      >
        <Filter size={12} /> {totalResults} Resultados
      </div>
    </div>
  );
};
