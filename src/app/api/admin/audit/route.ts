import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

// ====================================
// GET - Obtener los logs registrados
// ====================================

export async function GET() {
  try {
    const data = await serverApiClient("/audit", {
      cache: "no-store",
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo logs de auditoría");
  }
}
