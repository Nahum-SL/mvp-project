import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

import type { ScoredService } from "@/src/types/servicio/scoring.types";
import type { ServiceFilters } from "@/src/types/servicio/servicio-types";

import { buildServiceSearchParams } from "../utils/build-servicio-search-params";

export async function getScoredServices(
  filters: ServiceFilters,
): Promise<ScoredService[]> {
  const params = buildServiceSearchParams(filters);

  const res = await fetch(
    `${getBaseUrl()}/api/public/servicio/scored?${params}`,
  );

  return handleResponse<ScoredService[]>(res);
}
