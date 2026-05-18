import { serverApiClient } from "@/src/lib/server-api";
import { apiSuccess } from "@/src/lib/api-response";
import { handleApiError } from "@/src/lib/handle-api-server";

export async function GET() {
  try {
    const data = await serverApiClient("/api/blog/category");

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
    const data = await serverApiClient("/api/blog/category",{
      method: "POST",
      body: formData,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
      return handleApiError(error, "Error al crear categoria");
    }
}  
