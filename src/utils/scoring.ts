// Types
import { Service, ServiceFilters } from "../types/servicio/servicio";
// Array de Ids de servicios priorizados a recomendar
import { FEATURED_PRIORITY_IDS } from "../types/servicio/constants";
import { ServiceRecommendationMeta } from "../types/servicio/scoring.types";

export function calculateServiceScore(
  svc: Service,
  filters: ServiceFilters,
): {
  score: number;
  meta: ServiceRecommendationMeta;
} {
  let score = 0;
  const reasons: string[] = [];

  const hasBusinessType =
    filters.businessType &&
    svc.businessTypes.includes(filters.businessType);
  const hasPainPoint =
    filters.painPoint && svc.painPoints.includes(filters.painPoint);

  // Coincidencia por tipo de negocio = 30
  if (
    hasBusinessType
  ) {
    score += 30;
    reasons.push("Optimizado para tu tipo de negocio");
  }

  // Coincidencia por punto de dolor = 50
  if (hasPainPoint) {
    score += 50;
    reasons.push("Resuelve tu problema principal");
  }

  // Si coinciden ambos
  if (hasBusinessType && hasPainPoint  ) {
    score += 10;
    reasons.push("Recomendado a tu problema principal");
  }

  // Coincidencia por busqueda de texto = 10
  if (filters.search) {
    const match = svc.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    if (match) {
      score += 10;
      reasons.push("Coincide con tu búsqueda");
    }
  }

  // Plus si coincide con un servicio priorizado
  if (FEATURED_PRIORITY_IDS.includes(svc.id) && score > 0) {
    score += 5;
  }

  return {
    score,
    meta: {
      impact: Math.min(10, 5 + score),
      effort: Math.max(2, 10 - score),
      risk: filters.painPoint ? 3 : 6,
      reasons,
    },
  };
}
