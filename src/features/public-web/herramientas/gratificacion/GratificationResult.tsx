"use client";

import { GratificationResult as Result } from "../types";

interface Props {
  result: Result;
}

export function GratificationResult({ result }: Props) {
  return (
    <div className="text-center">
      <p className="text-xs text-slate-400">Total estimado</p>
      <p className="text-4xl font-bold text-white">
        S/ {result.total.toFixed(2)}
      </p>
    </div>
  );
}
