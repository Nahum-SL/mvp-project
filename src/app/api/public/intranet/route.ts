import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

export async function GET() {
  try {
    const data = await serverApiClient("/intranet/public-links");
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo links públicos");
  }
}