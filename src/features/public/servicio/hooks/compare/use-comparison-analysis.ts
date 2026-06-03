import { useMemo } from "react";

import type { ScoredService } from "@/src/types/servicio/scoring.types";

import {
  enrichComparisonServices,
  getBestScore,
  getBestServices,
} from "../../utils/compare/comparison-analysis.helpers";

export function useComparisonAnalysis(
  services: ScoredService[],
  hasContext?: boolean,
) {
  const enrichedServices = useMemo(
    () => enrichComparisonServices(services),
    [services],
  );

  const bestScore = useMemo(
    () => getBestScore(enrichedServices),
    [enrichedServices],
  );

  const bestServices = useMemo(
    () => getBestServices(enrichedServices, bestScore),
    [enrichedServices, bestScore],
  );

  const isTie = bestServices.length > 1;

  const hasWinner = bestServices.length === 1;

  return {
    services: enrichedServices,
    bestScore,
    bestServices,
    isTie,
    hasWinner,
    showAI: Boolean(hasContext),
  };
}
