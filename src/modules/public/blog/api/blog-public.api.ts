import type { BlogPost } from "@/src/types/blog/blogPost";

import { ApiResponse } from "@/src/shared";

import { apiClient } from "@/src/lib/api/api-client";

export async function getPublicPosts(): Promise<BlogPost[]> {
  const res = await apiClient<ApiResponse<BlogPost[]>>(`/post`, {
    next: { revalidate: 3600 },
  });
  return res.data;
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const res = await apiClient<ApiResponse<BlogPost>>(`/post/slug/${slug}`);
  return res.data;
}
