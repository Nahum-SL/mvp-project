"use server";

import { API_URL } from "@/src/lib/api-url";
import {
  RecommendationParams,
  RecommendationResult,
} from "@/src/types/servicio/recommendation";

export async function getRecommendation(
  params: RecommendationParams,
): Promise<RecommendationResult> {
  const query = new URLSearchParams();

  if (params.businessType) query.append("businessType", params.businessType);
  if (params.painPoint) query.append("painPoint", params.painPoint);
  if (params.search) query.append("search", params.search);

  const response = await fetch(
    `${API_URL}/api/servicio/recommendation?${query.toString()}`,
    {
      method: "GET",
      cache: "no-store", // importante para recomendaciones dinámicas
    },
  );

  if (!response.ok) {
    throw new Error("Error fetching recommendation");
  }

  return response.json();
}
