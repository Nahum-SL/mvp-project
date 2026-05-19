import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export async function serverApiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();

  const token = cookieStore.get("asescon_token")?.value;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));

    throw new Error(
      errorBody?.message ??
      errorBody?.error ??
      `HTTP Error ${res.status}`
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}