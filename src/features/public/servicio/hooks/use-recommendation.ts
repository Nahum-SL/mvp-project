import type { ServiceFilters } from "@/src/types/servicio/servicio-types";
import { useQuery } from "@tanstack/react-query";
import { PUBLIC_SERVICIO_QUERY_KEYS } from "../utils/public-servicios-query-key";
import { getRecommendation } from "../api/recommendation.api";

export const useRecommendation = (params: ServiceFilters) => {
  return useQuery({
    queryKey: PUBLIC_SERVICIO_QUERY_KEYS.recommendation(params),
    queryFn: () => getRecommendation(params),
    placeholderData: (previous) => previous,
  });
};
