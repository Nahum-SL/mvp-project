import type { BlogPost } from "@/src/types/blog/blogPost";
import { handleResponse } from "@/src/lib/handle-response";
import { API_URL } from "@/src/lib/api-url";
import { apiClient } from "@/src/lib/api/api-client";
import { ApiResponse } from "@/src/shared";


export async function getPublicPosts(): Promise<BlogPost[]> {
    const res = await apiClient<ApiResponse<BlogPost[]>>(`${API_URL}/post`, {next: { revalidate: 3600 }});
    return res.data;
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
    const res = await apiClient<ApiResponse<BlogPost>>(`${API_URL}/post/${slug}`);
    return res.data;
}