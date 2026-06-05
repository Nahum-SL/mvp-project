"use client";

import { Scale } from "lucide-react";

interface Props {
  count: number;
  onClick: () => void;
}

export function CompareFloatingButton({ count, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 rounded-full px-5 py-3 shadow-lg flex items-center gap-2 cursor-pointer
      bg-slate-900 text-white hover:bg-indigo-800
      "
    >
      <Scale size={18} />
      <span>Comparar ({count})</span>
    </button>
  );
}
