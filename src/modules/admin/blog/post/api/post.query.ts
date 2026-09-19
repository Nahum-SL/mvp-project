'use server';

import type { BlogPost } from "@/src/types/blog/blogPost";
import type { PostFilters } from "../store/post.types";
import type { PaginatedResponse } from "@/src/types/api/paginated-response";
import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";


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

  const res = await serverApiClient<ApiResponse<PaginatedResponse<BlogPost>>>(
    `/post/admin?${params.toString()}`,
  );

  return res.data;
}

export async function getPostById(id: number): Promise<BlogPost> {
  const res = await serverApiClient<ApiResponse<BlogPost>>(`/post/${id}`);
  return res.data;
}
