import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

// =============
// GET - Listar
// =============

// Obtener todos los candidatos que han aplicado a "Únete"
export async function GET() {
  try {
    const data = await serverApiClient("/unete");
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo candidatos");
  }
}