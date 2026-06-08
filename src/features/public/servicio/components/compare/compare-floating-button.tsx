"use client";

import { cn } from "@/src/lib/utils";
import { Scale } from "lucide-react";

interface Props {
  count: number;
  onClick: () => void;
}

export function CompareFloatingButton({ count, onClick }: Props) {
  const isDisabled = count < 2;
  const countSelect = count === 1 ? "bg-indigo-700" : "bg-indigo-800";

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "fixed bottom-6 right-6 z-40 rounded-full px-5 py-3 shadow-lg font-bold flex items-center gap-2 text-white transition-all duration-300",
        countSelect,
        // Si está deshabilitado, cambia el cursor y reduce opacidad. Si no, mantiene el pointer
        isDisabled
          ? "opacity-60 shadow-none"
          : "cursor-pointer hover:scale-105 active:scale-95",
      )}
    >
      <Scale size={18} />
      <span>
        {isDisabled
          ? `Servicio seleccionado (${count})`
          : `Comparar (${count})`}
      </span>
    </button>
  );
}
