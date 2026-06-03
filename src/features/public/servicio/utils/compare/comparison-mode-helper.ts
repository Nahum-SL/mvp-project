// src/features/public/servicio/utils/compare/comparison-mode.helpers.ts

import type { ScoredService } from "@/src/types/servicio/scoring.types";
import type { ComparisonModeKey } from "./comparison-copys.config";

interface ResolveModeParams {
  serviceId: number;
  bestServices: Pick<ScoredService, "id">[];
  showAI: boolean;
  isTie: boolean;
  hasWinner: boolean;
}

/**
 * Resuelve de forma pura el modo visual que debe adoptar la tarjeta del servicio.
 */
export function getComparisonMode({
  serviceId,
  bestServices,
  showAI,
  isTie,
  hasWinner,
}: ResolveModeParams): ComparisonModeKey {
  if (!showAI) return "neutral";

  const isBest = bestServices.some((s) => s.id === serviceId);
  if (!isBest) return "neutral";

  if (isTie) return "tie";
  if (hasWinner) return "winner";

  return "neutral";
}
