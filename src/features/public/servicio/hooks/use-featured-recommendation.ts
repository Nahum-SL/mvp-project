"use client";
import { buildRecommendationMetrics } from "../utils/recommendation/recommendation-metrics";
// Utils - descripcion
import { stripHtml } from "../utils/service-description";
// Types
import type { ScoredService } from "@/src/types/servicio/scoring.types";
import type { RecommendationResult } from "@/src/types/servicio/recommendation";

export function useFeaturedRecommendation(
  service: ScoredService,
  insights?: RecommendationResult["insights"],
) {
  const metrics = buildRecommendationMetrics(service.recommendationMeta);
  const confidence = Math.round((insights?.confidence ?? 0) * 100);

  return {
    metrics,
    confidence,
    reasons: service.recommendationMeta.reasons,
    description: stripHtml(service.description ?? ""),
  };
}
