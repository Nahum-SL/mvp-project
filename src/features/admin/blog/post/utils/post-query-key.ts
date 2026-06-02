import type { PostFilters } from "../store/post.types";

export const POST_QUERY_KEYS = {
  all: ["posts"] as const,

  lists: (filters: PostFilters) =>
    [...POST_QUERY_KEYS.all, "list", filters] as const,

  detail: (id: number) =>
    [...POST_QUERY_KEYS.all, "detail", id] as const,
};