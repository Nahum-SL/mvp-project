import { apiSuccess, handleApiError } from "@/src/lib/api-response";
import { serverApiClient } from "@/src/lib/server-api-client";

// ==========================================
// GET - Obtener estadísticas del dashboard
// ==========================================

export async function GET() {
  try {
    const data = await serverApiClient("/admin/stats");
    return apiSuccess(data);
  } catch (error) {
    return handleApiError(error, "Error obteniendo estadísticas del dashboard");
  }
}
