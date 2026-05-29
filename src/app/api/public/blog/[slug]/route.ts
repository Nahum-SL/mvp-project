import { serverApiClient } from "@/src/lib/server-api-client";
import { apiSuccess, handleApiError } from "@/src/lib/api-response";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  },
) {
  try {
    const { slug } = await params;

    const data = await serverApiClient(`/post/slug/${slug}`);

    return apiSuccess(data);
  } catch (error) {
    return handleApiError(error, "Error obteniendo post");
  }
}
