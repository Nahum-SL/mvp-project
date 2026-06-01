import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

// ====================================
// POST - Limpiar logs de auditoría
// ====================================

export async function POST() {
  try {
    const data = await serverApiClient("/audit/cleanup", {
      method: "POST"
    });
    
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error limpiando logs de auditoría");
  }
}
