export const PUBLIC_POST_QUERY_KEYS = {
  all: ['public', 'posts'] as const,
  detail: (slug: string) => [...PUBLIC_POST_QUERY_KEYS.all, 'detail', slug] as const,
};