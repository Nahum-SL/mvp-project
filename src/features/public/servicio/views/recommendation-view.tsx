"use client";

import type { ServiceFilters } from "@/src/types/servicio/servicio-types";
import FeaturedRecommendation from "../components/recommendation/FeaturedRecommendation";
import { useRecommendation } from "../hooks/use-recommendation";

interface RecommendationViewProps {
  recomendation: ServiceFilters;
}

export function RecommendationView({ recomendation }: RecommendationViewProps) {
  const { data } = useRecommendation(recomendation);

  if (!data || !data.bestMatch) {
    return null;
  }
  
  return (
    <FeaturedRecommendation
      service={data.bestMatch}
      alternatives={data.alternatives}
      insights={data.insights ?? undefined}
    />
  );
}
