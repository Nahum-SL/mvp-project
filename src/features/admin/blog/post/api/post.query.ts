import type { BlogPost } from "@/src/types/blog/blogPost";
import { handleResponse } from "@/src/lib/handle-response";

export async function getAdminPost(): Promise<BlogPost[]> {
  const res = await fetch("/api/admin/blog/post");
  return handleResponse<BlogPost[]>(res);
}

export async function getPostById(id: number): Promise<BlogPost> {
  const res = await fetch(`/api/admin/blog/post/${id}`);
  return handleResponse<BlogPost>(res);
}
