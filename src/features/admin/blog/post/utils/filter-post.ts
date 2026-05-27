import type { BlogPost } from "@/src/types/blog/blogPost";
import type { PostFilters } from "../store/post.types";

export function filterPosts(posts: BlogPost[], filters: PostFilters) {
  const search = filters.search.trim().toLowerCase();

  return posts.filter((post) => {
    if (search && !post.title.toLowerCase().includes(search)) {
      return false;
    }

    if (filters.categoryId && post.categoryId !== filters.categoryId) {
      return false;
    }

    if (
      filters.published !== undefined &&
      post.published !== filters.published
    ) {
      return false;
    }

    return true;
  });
}
