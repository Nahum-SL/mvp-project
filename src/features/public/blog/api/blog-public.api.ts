import type { BlogPost } from "@/src/types/blog/blogPost";
import { handleResponse } from "@/src/lib/handle-response";

export async function getPublicPosts(): Promise<BlogPost[]> {
  const res = await fetch(`/api/public/blog/post/`);
  return handleResponse<BlogPost[]>(res)
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const res = await fetch(`/api/public/blog/post/${slug}`);
  return handleResponse<BlogPost>(res)
}
