import type { BlogPost } from "@/src/types/blog/blogPost";

export async function getPublicPosts(): Promise<BlogPost> {
  const res = await fetch(`/api/public/blog/post/}`);

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message ?? `HTTP Error ${res.status}`);
  }
  return await res.json();
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const res = await fetch(`/api/public/blog/posts/${slug}`);

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message ?? `HTTP Error ${res.status}`);
  }
  return await res.json();
}
