// public-api-client.ts

import { apiClient } from "./api-client";

export async function publicApiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  return apiClient<T>(endpoint, options);
}
