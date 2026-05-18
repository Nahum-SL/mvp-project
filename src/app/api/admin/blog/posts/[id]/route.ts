// Maneja: GET (un post), PATCH/PUT (editar) y DELETE (borrar) de un post específico

import { serverApiClient } from "@/src/lib/server-api";
import { NextResponse } from "next/server";
import { handleApiError } from "@/src/lib/handle-api-server";
import { apiSuccess } from "@/src/lib/api-response";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/post/[id] -> Obtener un post específico
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const postId = Number(id);

    // Replicamos el BadRequestException de tu controlador de NestJS
    if (isNaN(postId)) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "ID de post inválido",
          error: "Bad Request",
        },
        { status: 400 },
      );
    }

    const data = await serverApiClient(`/api/post/${id}`);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo post");
  }
}


// PATCH /api/post/[id] -> Actualizar un post
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const data = await serverApiClient(`/api/post/${id}`, {
      method: "PATCH",
      body: formData,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error actualizando post");
  }
}

// DELETE /api/post/[id] -> Eliminar un post
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await serverApiClient(`/api/post/${id}`, {
      method: "DELETE",
    });

    return apiSuccess(null);
  } catch (error: unknown) {
    return handleApiError(error, "Error eliminando post");
  }
}
