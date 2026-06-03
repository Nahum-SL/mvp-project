// src/features/public/servicio/hooks/compare/use-comparison-banner.ts

import type { ScoredService } from "@/src/types/servicio/scoring.types";

interface BannerAnalysisInput {
  showAI: boolean;
  hasWinner: boolean;
  isTie: boolean;
  bestServices: ScoredService[];
}

export type BannerType = "winner" | "tie" | "no-context";

export interface BannerState {
  type: BannerType;
  winner?: ScoredService;
  tiedServices: ScoredService[];
}
// alimenta de manera reactiva a los hooks especializados. useComparisonBanner
/**
 * Hook especializado en digerir el estado del análisis general y extraer
 * la configuración exacta requerida para pintar el banner informativo.
 */
export function useComparisonBanner({
  showAI,
  hasWinner,
  isTie,
  bestServices,
}: BannerAnalysisInput): BannerState {
  if (!showAI) {
    return { type: "no-context", tiedServices: [] };
  }

  if (hasWinner && bestServices[0]) {
    return { type: "winner", winner: bestServices[0], tiedServices: [] };
  }

  if (isTie) {
    return { type: "tie", tiedServices: bestServices };
  }

  return { type: "no-context", tiedServices: [] };
}
