import { serverApiClient } from "@/src/lib/server-api-client";
import { handleApiError } from "@/src/lib/api-response/handle-api-server";
import { apiSuccess } from "@/src/lib/api-response";

// =============
// GET - Listar
// =============

// Obtener todos los contactos para el admin (con autenticación)
export async function GET() {
  try {
    const data = await serverApiClient("/api/post/admin");

    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo posts");
  }
}

