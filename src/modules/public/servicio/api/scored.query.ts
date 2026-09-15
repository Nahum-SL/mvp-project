// Manejo de la respuesta de fetch para la API de servicios públicos
import { apiClient } from "@/src/lib/api/api-client";
import { ApiResponse } from "@/src/shared/types";
// Types
import type { ScoredService } from "@/src/types/servicio/scoring.types";
import type { ServiceFilters } from "@/src/types/servicio/servicio-types";

// Build
import { buildServiceSearchParams } from "../utils/build-servicio-search-params";

export async function getScoredServices(
  filters: ServiceFilters,
): Promise<ScoredService[]> {
  const params = buildServiceSearchParams(filters);

  const res = await apiClient<ApiResponse<ScoredService[]>>(
    `/servicio/scored?${params}`,
  );

  return res.data;
}
