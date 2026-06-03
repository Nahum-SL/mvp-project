// src/features/public/servicio/components/compare/comparison-banner.tsx
"use client";

import { Info, Sparkles, Trophy } from "lucide-react";
import { COMPARISON_BANNERS } from "../../utils/compare/comparison-copys.config";
import type { BannerState } from "../../hooks/compare/use-comparison-banner";

interface ComparisonBannerProps {
  banner: BannerState;
}

export function ComparisonBanner({ banner }: ComparisonBannerProps) {
  const { type, winner, tiedServices } = banner;

  if (type === "no-context") {
    return (
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-800 shadow-sm animate-in fade-in slide-in-from-top-2">
        <Info size={18} className="shrink-0" />
        <p className="text-xs md:text-sm font-medium">
          <strong>{COMPARISON_BANNERS.noContext.title}</strong>{" "}
          {COMPARISON_BANNERS.noContext.text}
        </p>
      </div>
    );
  }

  if (type === "winner" && winner) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 text-sm text-indigo-800 border border-indigo-100 shadow-sm animate-in fade-in slide-in-from-top-2">
        <Trophy className="shrink-0 text-indigo-600" size={18} />
        <p className="leading-relaxed">
          Basado en tus objetivos,{" "}
          <strong className="font-bold text-indigo-950">{winner.title}</strong>{" "}
          {COMPARISON_BANNERS.winner.text}
        </p>
      </div>
    );
  }

  if (type === "tie") {
    return (
      <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 text-sm text-emerald-800 border border-emerald-100 shadow-sm">
          <Sparkles className="shrink-0 text-emerald-500" size={18} />
          <p className="leading-relaxed">{COMPARISON_BANNERS.tie.text}</p>
        </div>

        <div className="space-y-1 text-xs text-slate-500 pl-2 border-l-2 border-emerald-200">
          {tiedServices.map((s) => (
            <div key={s.id} className="font-medium">
              • {s.title}: alto impacto, balanceado en esfuerzo y riesgo.
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
