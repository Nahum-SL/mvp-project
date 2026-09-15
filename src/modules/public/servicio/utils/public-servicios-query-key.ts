export const PUBLIC_SERVICIO_QUERY_KEYS = {
  all: ["public", "servicios"] as const,

  list: (filters?: unknown) =>
    [...PUBLIC_SERVICIO_QUERY_KEYS.all, "list", filters] as const,

  detail: (slug: string) =>
    [...PUBLIC_SERVICIO_QUERY_KEYS.all, "detail", slug] as const,

  recommendation: (params?: unknown) =>
    [...PUBLIC_SERVICIO_QUERY_KEYS.all, "recommendation", params] as const,

  scored: (params?: unknown) =>
    [...PUBLIC_SERVICIO_QUERY_KEYS.all, "scored", params] as const,

  compare: (ids: number[], filters?: unknown) =>
    [...PUBLIC_SERVICIO_QUERY_KEYS.all, "compare", ids, filters] as const,
};
