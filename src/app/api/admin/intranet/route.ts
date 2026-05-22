import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";


// =============
// GET - Listar
// =============

// Obtener todos los links de la intranet
export async function GET() {
  try {
    const data = await serverApiClient("/api/intranet/admin/all");
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo links");
  }
}

// =============
// POST - Crear
// =============

// Crear el link
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = await serverApiClient("/api/intranet/admin/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error creando link");
  }
}

