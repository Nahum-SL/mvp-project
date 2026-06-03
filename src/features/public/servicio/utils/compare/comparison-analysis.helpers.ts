import type { ScoredService } from "@/src/types/servicio/scoring.types";
import { COMPARISON_SCORE_TOLERANCE } from "@/src/constants/servicio-public/servicio-ui";

export function enrichComparisonServices(
  services: ScoredService[],
): ScoredService[] {
  return services.map((service) => ({
    ...service,
    impact: service.recommendationMeta?.impact ?? 0,
    effort: service.recommendationMeta?.effort ?? 0,
    risk: service.recommendationMeta?.risk ?? 0,
    priorityScore: service.priorityScore ?? 0,
  }));
}

export function getBestScore(services: ScoredService[]): number {
  if (!services.length) return 0;

  return Math.max(...services.map((service) => service.priorityScore ?? 0));
}

export function getBestServices(
  services: ScoredService[],
  bestScore: number,
): ScoredService[] {
  return services.filter(
    (service) =>
      Math.abs((service.priorityScore ?? 0) - bestScore) <
      COMPARISON_SCORE_TOLERANCE,
  );
}
