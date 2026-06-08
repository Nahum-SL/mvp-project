import type { BlogPost } from "@/src/types/blog/blogPost";
import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

export async function getPublicPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${getBaseUrl()}/api/public/blog/post`);
  return handleResponse<BlogPost[]>(res)
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const res = await fetch(`${getBaseUrl()}/api/public/blog/post/${slug}`);
  return handleResponse<BlogPost>(res)
}