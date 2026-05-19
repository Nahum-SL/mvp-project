import { apiSuccess, handleApiError } from "@/src/lib/api-response";
import { serverApiClient } from "@/src/lib/server-api-client";

export async function GET() {
  try {
    const data = await serverApiClient("/api/post");

    return apiSuccess(data);
  } catch (error) {
    return handleApiError(
      error,
      "Error obteniendo posts públicos"
    );
  }
}