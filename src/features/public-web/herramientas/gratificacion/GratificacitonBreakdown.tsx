"use client";

import { GratificationResult } from "../types";

interface Props {
  result: GratificationResult;
}

export function GratificationBreakdown({ result }: Props) {
  return (
    <div className="space-y-2 text-sm text-slate-400">
      <div className="flex justify-between">
        <span>Base</span>
        <span>S/ {result.base.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>Bonificación (9%)</span>
        <span>S/ {result.bonus.toFixed(2)}</span>
      </div>
    </div>
  );
}
