import type { BlogPost } from "@/src/types/blog/blogPost";
import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

export async function getAdminPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${getBaseUrl()}/api/admin/blog/post`);
  return handleResponse<BlogPost[]>(res);
}

export async function getPostById(id: number): Promise<BlogPost> {
  const res = await fetch(`${getBaseUrl()}/api/admin/blog/post/${id}`);
  return handleResponse<BlogPost>(res);
}
