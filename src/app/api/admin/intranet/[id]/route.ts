import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Obtener un contacto específico
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const postId = Number(id);

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

    const data = await serverApiClient(`/intranet/admin/link/${id}`);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo el link de la intranet");
  }
}

// PATCH - Actualizar el Link
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const data = await serverApiClient(`/intranet/admin/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error actualizando el link");
  }
}

// DELETE - Eliminar un lead del sistema
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await serverApiClient(`/intranet/admin/delete/${id}`, {
      method: "DELETE",
    });

    return apiSuccess(null);
  } catch (error: unknown) {
    return handleApiError(error, "Error eliminando link");
  }
}
