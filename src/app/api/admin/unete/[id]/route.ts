import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Obtener un candidato específico
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const candidateId = Number(id);

    if (isNaN(candidateId)) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "ID de candidato inválido",
          error: "Bad Request",
        },
        { status: 400 },
      );
    }

    const data = await serverApiClient(`/unete/${id}/status`);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, "Error obteniendo el candidato");
  }
}
