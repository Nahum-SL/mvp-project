import { serverApiClient } from "@/src/lib/server-api-client";
import { handleApiError, apiSuccess } from "@/src/lib/api-response";

// =============
// POST - Crear
// =============

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = await serverApiClient("/api/servicio/recommendation",{
      method: "POST",
      body: formData,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
      return handleApiError(error, "Error comparando servicios");
    }
}  
