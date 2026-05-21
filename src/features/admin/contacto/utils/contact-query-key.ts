export const CONTACT_QUERY_KEYS = {
  all: ["contacto"] as const,

  lists: () => [...CONTACT_QUERY_KEYS.all, "list"] as const,

  detail: (id: string) => [...CONTACT_QUERY_KEYS.all, "detail", id] as const,
};
