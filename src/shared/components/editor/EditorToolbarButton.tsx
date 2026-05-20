"use client";

import { cn } from "@/src/lib/utils";

interface Props {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function EditorToolbarButton({ active, onClick, children }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-3 rounded-xl transition-all duration-200",

        active
          ? "bg-blue-600 text-white shadow-lg scale-95 ring-2 ring-blue-300"
          : "hover:bg-white text-slate-400 hover:text-slate-900",
      )}
    >
      {children}
    </button>
  );
}
