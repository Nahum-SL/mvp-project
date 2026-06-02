import { serverApiClient } from "@/src/lib/server-api-client";
import { handleApiError, apiSuccess } from "@/src/lib/api-response";

// =============
// POST - Comparar
// =============

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await serverApiClient("/servicio/recommendation/compare", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error comparando servicios");
  }
}
