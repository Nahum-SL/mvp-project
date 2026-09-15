//
import { apiClient } from "@/src/lib/api/api-client";
import { ApiResponse } from "@/src/shared";
// Builds
import { buildServiceSearchParams } from "../utils/build-servicio-search-params";
// Types
import type { ServiceFilters } from "@/src/types/servicio/servicio-types";
import type { RecommendationResult } from "@/src/types/servicio/recommendation";

export async function getRecommendation(
  filters: ServiceFilters,
): Promise<RecommendationResult> {
  const params = buildServiceSearchParams(filters);
  const res = await apiClient<ApiResponse<RecommendationResult>>(
    `/servicio/recommendation?${params}`,
  );
  return res.data;
}
