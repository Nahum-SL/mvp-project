import { serverApiClient } from "@/src/lib/server-api-client";
import { handleApiError, apiSuccess } from "@/src/lib/api-response";

// =============
// GET - Listar
// =============

// Obtener todos los servicios para el admin (con autenticación)

export async function GET() {
  try {
    const data = await serverApiClient("/api/servicio/admin");

    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo servicios");
  }
}
