import { useMemo } from "react";
import { calculateServiceScore } from "@/src/utils/scoring";
import { ScoredService } from "@/src/types/servicio/scoring.types";
import { ServiceFilters } from "@/src/types/servicio/servicio";

interface Props {
  services: ScoredService[];
  filters: ServiceFilters;
}

export function useServiceScoring({ services, filters }: Props) {
  return useMemo<ScoredService[]>(() => {
    return services.map((svc) => {
      const result = calculateServiceScore(svc, filters);

      return {
        ...svc,
        relevanceScore: result.score,
        recommendationMeta: result.meta,
      };
    });
  }, [services, filters]);
}
