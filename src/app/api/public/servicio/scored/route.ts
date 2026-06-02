import { serverApiClient } from "@/src/lib/server-api-client";
import { handleApiError, apiSuccess } from "@/src/lib/api-response";

// =================================
// GET - Obtener score de servicios
// =================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const data = await serverApiClient(
      `/servicio/scored?${searchParams.toString()}`,
    );
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo score de servicios");
  }
}
