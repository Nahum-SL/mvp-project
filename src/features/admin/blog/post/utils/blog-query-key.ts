export const POST_QUERY_KEYS = {
  all: ["posts"] as const,

  lists: () =>
    [...POST_QUERY_KEYS.all, "list"] as const,

  detail: (id: number) =>
    [...POST_QUERY_KEYS.all, "detail", id] as const,
};