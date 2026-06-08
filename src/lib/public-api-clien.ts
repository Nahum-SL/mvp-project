// public-api-client.ts

const API_URL = process.env.API_URL;

export async function publicApiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, options);

  if (!res.ok) {
    throw new Error(`HTTP Error ${res.status}`);
  }

  return res.json();
}
