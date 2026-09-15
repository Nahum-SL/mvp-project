import { useQuery } from "@tanstack/react-query";
import { getScoredServices } from "../api/scored.query";
import { PUBLIC_SERVICIO_QUERY_KEYS } from "../utils/public-servicios-query-key";
import type { ServiceFilters } from "@/src/types/servicio/servicio-types";

export const useScoredServices = (params: ServiceFilters) => {
  return useQuery({
    queryKey: PUBLIC_SERVICIO_QUERY_KEYS.scored(params),
    queryFn: () => getScoredServices(params),
    placeholderData: (previous) => previous,
  });
};
