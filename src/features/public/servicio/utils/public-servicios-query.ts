export const PUBLIC_SERVICIO_QUERY_KEYS = {
  all: ['public', 'servicios'] as const,
  detail: (slug: string) => [...PUBLIC_SERVICIO_QUERY_KEYS.all, 'detail', slug] as const,
};