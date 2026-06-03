import { RecommendationResult } from "@/src/types/servicio/recommendation";
import { useQuery } from "@tanstack/react-query";
import { PUBLIC_SERVICIO_QUERY_KEYS } from "../utils/public-servicios-query-key";
import { getRecommendation } from "../api/recommendation.api";

export const useRecommendation = (params: RecommendationResult) => {
  return useQuery({
    queryKey: PUBLIC_SERVICIO_QUERY_KEYS.recommendation(params),
    queryFn: () => getRecommendation(params),
    placeholderData: (previous) => previous,
  });
};
