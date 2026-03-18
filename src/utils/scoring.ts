import { Service, ServiceFilters } from "../types/servicio/servicio";

// src/lib/scoring.ts
export const calculateServiceScore = (
  service: Service,
  filters: ServiceFilters,
): number => {
  let score = 0;

  const hasBusinessType =
    filters.businessType &&
    service.businessTypes.includes(filters.businessType);
  const hasPainPoint =
    filters.painPoint && service.painPoints.includes(filters.painPoint);

  // 1. Coincidencia por Tipo de Negocio (Peso: 30)
  if (hasBusinessType) {
    score += 30;
  }

  // 2. Coincidencia por Punto de Dolor (Peso: 50)
  if (hasPainPoint) {
    score += 50;
  }

  // 3. BONUS: Perfect Match (Si coinciden ambos, sumamos 10 puntos extra)
  if (hasBusinessType && hasPainPoint) {
    score += 10;
  }

  // 4. Bonus por búsqueda de texto (Peso: 10)
  if (
    filters.search &&
    (service.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      service.description.toLowerCase().includes(filters.search.toLowerCase()))
  ) {
    score += 10;
  }

  return Math.min(score, 100); // Topamos en 100
};
