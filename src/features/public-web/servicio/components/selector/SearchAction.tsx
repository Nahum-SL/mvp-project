// src/components/ui/layout/servicios/SmartSelector/SearchAction.tsx
import { Search } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface SearchActionProps {
  isExpanded: boolean;
  isPending?: boolean;
}

export const SearchAction = ({ isExpanded, isPending }: SearchActionProps) => {
  return (
    <button
      type="button"
      className={cn(
        "relative flex items-center justify-center gap-2 rounded-full transition-all duration-500",
        "h-12 md:h-14",
        isExpanded
          ? "bg-emerald-500 w-full md:w-32 px-6 shadow-lg shadow-slate-200"
          : "bg-sky-600 w-full md:w-14 shadow-lg shadow-blue-200",
        isPending && "opacity-70 cursor-wait",
      )}
    >
      {isPending ? (
        <div className="flex gap-1">
          <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce" />
          <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
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
};
