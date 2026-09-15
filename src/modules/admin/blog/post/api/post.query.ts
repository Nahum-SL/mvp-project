import type { BlogPost } from "@/src/types/blog/blogPost";
import type { PostFilters } from "../store/post.types";
import type { PaginatedResponse } from "@/src/types/api/paginated-response";
import { handleResponse } from "@/src/lib/handle-response";
import { API_URL } from "@/src/lib/api-url";

export async function getAdminPosts(
  filters: PostFilters,
): Promise<PaginatedResponse<BlogPost>> {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.categoryId) {
    params.set("categoryId", String(filters.categoryId));
  }

  if (filters.published !== undefined) {
    params.set("published", String(filters.published));
  }

  params.set("page", String(filters.page));
  params.set("limit", String(filters.limit));

  const res = await fetch(
    `${API_URL}/post/admin?${params.toString()}`,
  );

  return handleResponse<PaginatedResponse<BlogPost>>(res);
}

export async function getPostById(id: number): Promise<BlogPost> {
  const res = await fetch(`${API_URL}/post/${id}`);
  return handleResponse<BlogPost>(res);
}
