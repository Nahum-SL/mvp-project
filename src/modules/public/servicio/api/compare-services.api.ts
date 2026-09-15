import type {
  CompareResponses,
  CompareServicesPayload,
} from "@/src/types/servicio/recommendation";

import { apiClient } from "@/src/lib/api/api-client";
import { API_URL } from "@/src/lib/api-url";
import { ApiResponse } from "@/src/shared";

export async function compareServices(
  payload: CompareServicesPayload,
): Promise<CompareResponses> {
  const res = await apiClient<ApiResponse<CompareResponses>>(
    "/servicio/recommendation/compare",
    {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.data;
}
