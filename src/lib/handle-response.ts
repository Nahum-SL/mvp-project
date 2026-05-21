// src/lib/handle-response.ts
import { ApiErrorResponse } from "@/src/types/api";

/**
 * Procesa una respuesta de 'fetch'. Si la respuesta es exitosa (ok),
 * devuelve el JSON estructurado. Si falla, extrae el mensaje de error 
 * generado por handleApiError/NestJS y lanza una excepción.
 */
export async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // Intentamos recuperar el JSON de error estructurado por nuestro BFF/NestJS
    const errorBody: ApiErrorResponse | null = await res.json().catch(() => null);

    // Lanzamos el error con el mensaje real del backend o un fallback genérico
    throw new Error(
      errorBody?.message ?? `Error del servidor (HTTP ${res.status})`
    );
  }

  // Si la respuesta fue un 204 No Content (como en el Delete), retornamos undefined de forma segura
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}