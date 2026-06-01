export const AUDIT_QUERY_KEYS = {
  all: ["audit"] as const,
  logs: () => [...AUDIT_QUERY_KEYS.all, "logs"] as const,
  stats: () => [...AUDIT_QUERY_KEYS.all, "stats"] as const,
};
