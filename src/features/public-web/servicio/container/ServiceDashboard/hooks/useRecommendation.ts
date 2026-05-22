import { useEffect, useState } from "react";
import { getRecommendation } from "../../../action";
import { RecommendationResult } from "@/src/types/servicio/recommendation";
import { ServiceFilters } from "@/src/types/servicio/servicio-types";

interface Props {
  filters: ServiceFilters;
}

export function useRecommendation({ filters }: Props) {
  const [recommendation, setRecommendation] =
    useState<RecommendationResult | null>(null);

  const shouldFetch =
    !!filters.businessType || !!filters.painPoint || !!filters.search;

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchData = async () => {
      try {
        const res = await getRecommendation({
          businessType: filters.businessType || undefined,
          painPoint: filters.painPoint || undefined,
          search: filters.search || undefined,
        });

        setRecommendation(res);
      } catch (err) {
        // console.error(err);
      }
    };

    fetchData();
  }, [filters, shouldFetch]);

  return {
    recommendation: shouldFetch ? recommendation : null,
    shouldFetch,
  };
}
