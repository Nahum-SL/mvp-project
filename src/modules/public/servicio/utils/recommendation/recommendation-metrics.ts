import { ServiceRecommendationMeta } from "@/src/types/servicio/scoring.types";

export function buildRecommendationMetrics(meta: ServiceRecommendationMeta) {
  return [
    {
      id: "impact",
      label: "Impacto",
      value: meta.impact,
      score: Math.round(meta.impact / 10),
    },
    {
      id: "effort",
      label: "Esfuerzo",
      value: meta.effort,
      score: Math.round(meta.effort / 10),
    },
    {
      id: "risk",
      label: "Riesgo",
      value: meta.risk,
      score: Math.round(meta.risk / 10),
    },
  ] as const;
}
