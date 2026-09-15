export const UNETE_QUERY_KEYS = {
  all: ["admin-unete"] as const,

  lists: () => [...UNETE_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...UNETE_QUERY_KEYS.all, "detail", id] as const,
};
