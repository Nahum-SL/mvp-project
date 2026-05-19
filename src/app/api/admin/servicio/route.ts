import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

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

// =============
// POST - Crear
// =============

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = await serverApiClient("/api/servicio",{
      method: "POST",
      body: formData,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
      return handleApiError(error, "Error creando el servicio");
    }
}  
