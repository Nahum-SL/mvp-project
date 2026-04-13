"use client";

import { useState } from "react";

interface Props {
  total: number;
}

export function GratificationActions({ total }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Mi gratificación es S/ ${total.toFixed(2)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full mt-4 p-3 rounded-xl bg-emerald-500 text-white"
    >
      {copied ? "Copiado" : "Copiar resultado"}
    </button>
  );
}
