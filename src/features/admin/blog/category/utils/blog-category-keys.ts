export const CATEGORY_QUERY_KEYS = {
  all: ["categories"] as const,

  lists: () =>
    [...CATEGORY_QUERY_KEYS.all, "list"] as const,
};