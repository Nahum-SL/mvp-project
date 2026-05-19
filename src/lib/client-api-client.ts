import { API_URL } from "./api-url";

export const apiClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },  
  });

  if (!res.ok) {
    // Intentamos parsear el error de NestJS (que devuelve { message: string })
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(
      errorBody.message ?? 
      errorBody.error ?? 
      `HTTP Error${res.status}`,
    );
  }

  if (res.status === 204) return undefined as T;

  return res.json();
};
