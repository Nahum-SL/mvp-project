// Url del backend en Nestjs
const API_URL = process.env.API_URL;

type ApiClientOptions = RequestInit & {
  token?: string;
};

export async function apiClient<T>(
  endpoint: string,
  { token, headers, ...options }: ApiClientOptions = {},
): Promise<T> {
  // Validar que la ruta API exista
  if (!API_URL) {
    throw new Error("API_URL is not defined.");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(
      error?.message ?? error?.error ?? `HTTP Error ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

//
