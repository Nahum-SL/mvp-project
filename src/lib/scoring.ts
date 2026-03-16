import { Service, ServiceFilters } from "@/src/types/servicio/servicio";

export function calculateServiceScore(
  service: Service,
  filters: ServiceFilters,
): number {
  let score = 0;

  // match tipo empresa
  if (
    filters.businessType &&
    service.businessTypes.includes(filters.businessType)
  ) {
    score += 50;
  }

  // match problema
  if (filters.painPoint && service.painPoints.includes(filters.painPoint)) {
    score += 40;
  }

  // match búsqueda
  if (
    filters.search &&
    service.title.toLowerCase().includes(filters.search.toLowerCase())
  ) {
    score += 10;
  }

  return Math.min(score, 100);
}
