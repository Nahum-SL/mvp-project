import { serverApiClient } from "@/src/lib/server-api-client";
import { handleApiError, apiSuccess } from "@/src/lib/api-response";

// =================================================
// POST - Enviar formulario de jobApplication - Unete
// =================================================

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = await serverApiClient("/unete/submit", {
      method: "POST",
      body: formData,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error enviando formulario de unete");
  }
}