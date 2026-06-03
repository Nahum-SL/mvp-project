// src/features/public/servicio/utils/build-service-search-params.ts

import type { ServiceFilters } from "@/src/types/servicio/servicio-types";

/**
 * Centraliza la construcción de query params para todos los endpoints
 * relacionados a filtros de servicios.
 */
export function buildServiceSearchParams(
  filters: Partial<ServiceFilters>,
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.businessType) {
    params.set("businessType", filters.businessType);
  }

  if (filters.painPoint) {
    params.set("painPoint", filters.painPoint);
  }

  if (filters.search?.trim()) {
    params.set("search", filters.search.trim());
  }

  return params;
}
