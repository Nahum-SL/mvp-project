import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

// =============
// GET - Listar
// =============

// Obtener todos los leads de los clientes para el admin (con autenticación)
export async function GET() {
  try {
    const data = await serverApiClient("/contacto/admin/all");
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo contactos");
  }
}
