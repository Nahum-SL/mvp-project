import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const data = await serverApiClient(`/servicio/${slug}`);

    return apiSuccess(data);
  } catch (error) {
    return handleApiError(error, "Error obteniendo slug del servicio");
  }
}
