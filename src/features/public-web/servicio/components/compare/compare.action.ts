"use server";

import { API_URL } from "@/src/lib/api-url";
import { ScoredService } from "@/src/types/servicio/scoring.types";
import { RecommendationParams } from "@/src/types/servicio/recommendation";

export async function compareServices(
  ids: number[],
  filters: RecommendationParams,
): Promise<ScoredService[]> {
  const response = await fetch(
    `${API_URL}/api/servicio/recommendation/compare`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids,
        filters,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Error comparing services");
  }

  return response.json();
}
