// src/app/admin/contacto/[id]/route.ts
import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Obtener un contacto específico
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const data = await serverApiClient(`/contacto/admin/${id}`);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo el detalle del contacto");
  }
}

// PATCH - Actualizar el estado del contacto (ej. de PENDIENTE a ATENDIDO)
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const data = await serverApiClient(`/contacto/admin/status/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error actualizando el estado del contacto");
  }
}

// DELETE - Eliminar un lead del sistema
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await serverApiClient(`/contacto/admin/delete/${id}`, {
      method: "DELETE",
    });

    return apiSuccess(null);
  } catch (error: unknown) {
    return handleApiError(error, "Error eliminando contacto");
  }
}
