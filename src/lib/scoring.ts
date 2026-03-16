import { Service, ServiceFilters } from "../types/servicio/servicio";

export const calculateServiceScore = (
  service: Service,
  filters: ServiceFilters,
): number => {
  let score = 0;

  // 1. Coincidencia por Tipo de Negocio (Peso: 2)
  if (
    filters.businessType &&
    service.businessTypes.includes(filters.businessType)
  ) {
    score += 20;
  }

  // 2. Coincidencia por Punto de Dolor (Peso: 5 - Es lo más importante)
  if (filters.painPoint && service.painPoints.includes(filters.painPoint)) {
    score += 50;
  }

  // 3. Bonus por búsqueda de texto (Peso: 1)
  if (
    filters.search &&
    service.title.toLowerCase().includes(filters.search.toLowerCase())
  ) {
    score += 10;
  }

  return score;
};
