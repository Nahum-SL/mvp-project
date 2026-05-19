import { serverApiClient } from "@/src/lib/server-api-client";
import { NextResponse } from "next/server";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/servicio/[id] -> Obtener un servicio específico
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const postId = Number(id);

    // Replicamos el BadRequestException de tu controlador de NestJS
    if (isNaN(postId)) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "ID de servicio inválido",
          error: "Bad Request",
        },
        { status: 400 },
      );
    }

    const data = await serverApiClient(`/api/servicio/${id}`);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo servicio");
  }
}

// PATCH /api/servicio/[id] -> Actualizar un servicio
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const data = await serverApiClient(`/api/servicio/${id}`, {
      method: "PATCH",
      body: formData,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error actualizando servicio");
  }
}

// DELETE /api/servicio/[id] -> Eliminar un servicio
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await serverApiClient(`/api/servicio/${id}`, {
      method: "DELETE",
    });

    return apiSuccess(null);
  } catch (error: unknown) {
    return handleApiError(error, "Error eliminando servicio");
  }
}
