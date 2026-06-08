export const INTRANET_PUBLIC_QUERY_KEY = {
    all: ["public", "intranet"] as const,
    links: () => [...INTRANET_PUBLIC_QUERY_KEY.all, "links"] as const,
}