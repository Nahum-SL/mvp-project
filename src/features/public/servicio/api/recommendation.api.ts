// recommendation.api.ts

import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

import { buildServiceSearchParams } from "../utils/build-servicio-search-params";
import type { ServiceFilters } from "@/src/types/servicio/servicio-types";

export async function getRecommendation(
  filters: ServiceFilters,
): Promise<ServiceFilters> {
  const params = buildServiceSearchParams(filters);

  const res = await fetch(
    `${getBaseUrl()}/api/public/servicio/recommendation?${params}`,
  );

  return handleResponse<ServiceFilters>(res);
}
