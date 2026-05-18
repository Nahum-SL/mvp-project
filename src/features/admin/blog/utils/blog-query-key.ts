export const BLOG_QUERY_KEY = {
  all: ["blog"] as const,

  categories: () => [...BLOG_QUERY_KEY.all, "categories"] as const,

  adminPosts: () => [...BLOG_QUERY_KEY.all, "admin-posts"] as const,

  postById: (id: number) => [...BLOG_QUERY_KEY.all, "post", id] as const,
};
