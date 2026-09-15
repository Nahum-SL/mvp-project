import { cookies } from "next/headers";
import { apiClient } from "./api-client";

export async function serverApiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();

  const token = cookieStore.get("asescon_token")?.value;

  return apiClient<T>(endpoint, {
    ...options,
    token,
  });
}
