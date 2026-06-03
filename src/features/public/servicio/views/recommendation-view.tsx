"use client";

import FeaturedRecommendation from "../components/recommendation/FeaturedRecommendation";
import { useRecommendation } from "../hooks/use-recommendation";
import type { ServiceFilters } from "@/src/types/servicio/servicio-types";
import type { RecommendationResult } from "@/src/types/servicio/recommendation";

interface RecommendationViewProps {
  recomendation: RecommendationResult;
}

export function RecommendationView({ recomendation }: RecommendationViewProps) {
  const { data } = useRecommendation(recomendation);

  if (!data) return null;

  return (
    <FeaturedRecommendation
      service={data.bestMatch}
      alternatives={data.alternatives}
      insights={data.insights ?? undefined}
    />
  );
}
