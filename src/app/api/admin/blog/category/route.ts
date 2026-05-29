import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

export async function GET() {
  try {
    const data = await serverApiClient("/blog/category");

    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

// =============
// POST - Crear
// =============

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = await serverApiClient("/blog/category",{
      method: "POST",
      body: formData,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
      return handleApiError(error, "Error al crear categoria");
    }
}  
