// Url del backend en Nestjs
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiClientOptions = RequestInit & {
  token?: string;
};

export async function apiClient<T>(
  endpoint: string,
  { token, headers, ...options }: ApiClientOptions = {},
): Promise<T> {
  console.log("🔵 API_URL:", API_URL);
  console.log("🔵 ENDPOINT:", endpoint);
  console.log("🔵 FULL URL:", `${API_URL}${endpoint}`);

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

  console.log("🟢 STATUS:", response.status);
  console.log("🟢 URL:", response.url);

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
