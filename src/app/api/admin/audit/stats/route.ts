import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

// ============================================
// GET - Obtener las estadísticas de auditoría
// ============================================

export async function GET() {
  try {
    const data = await serverApiClient("/audit/stats", {
      cache: "no-store",
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo estadísticas de auditoría");
  }
}
