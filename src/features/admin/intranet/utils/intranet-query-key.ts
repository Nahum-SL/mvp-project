export const INTRANET_QUERY_KEYS = {
  all: ["admin", "intranet"] as const,

  lists: () => [...INTRANET_QUERY_KEYS.all, "list"] as const,

  detail: (id: number) => [...INTRANET_QUERY_KEYS.all, "detail", id] as const,
};
