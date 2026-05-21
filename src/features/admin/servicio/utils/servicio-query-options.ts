export const SERVICIO_QUERY_KEYS = {
  all: ["admin", "servicios"] as const,

  lists: () =>
    [...SERVICIO_QUERY_KEYS.all, "list"] as const,

  detail: (id: number) =>
    [...SERVICIO_QUERY_KEYS.all, "detail", id] as const,
};