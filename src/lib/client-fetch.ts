export async function clientFetch<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);

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