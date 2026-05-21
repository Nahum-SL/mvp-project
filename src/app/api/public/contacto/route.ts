// src/app/api/public/contacto/route.ts
import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

export async function POST(request: Request) {
  try {
    // 1. Extraer el JSON del body enviado desde el formulario
    const body = await request.json();
    
    // 2. Enviarlo como JSON estricto a NestJS
    const data = await serverApiClient("/api/contacto/enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error enviando contacto");
  }
}