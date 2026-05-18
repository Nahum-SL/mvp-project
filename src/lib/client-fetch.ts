// Uso para schemas

export async function clientFetch<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const isFormData = init?.body instanceof FormData;

  const res = await fetch(input, {
    ...init,
    headers: {
      ...(isFormData
        ? {}
        : { "Content-Type": "application/json" }),

      ...init?.headers,
    },
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    throw new Error(
      error?.message ?? "Error de servidor"
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}