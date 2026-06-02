import type { ScoredService } from "@/src/types/servicio/scoring.types";
import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";
import { ServiceFilters } from "@/src/types/servicio/servicio-types";

export async function getScoredServices(
  filters: ServiceFilters,
): Promise<ScoredService[]> {
  const params = new URLSearchParams();

  if (filters.businessType) params.set("businessType", filters.businessType);

  if (filters.painPoint) params.set("painPoint", filters.painPoint);

  if (filters.search) params.set("search", filters.search);

  const res = await fetch(
    `${getBaseUrl()}/api/public/servicio/scored?${params}`,
  );

  return handleResponse<ScoredService[]>(res);
}
