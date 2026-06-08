import { getPublicPosts } from "../../api/blog-public.api";
import type { BlogPost } from "@/src/types/blog/blogPost";

export function useNavigationPost(currentSlug: string) {
  const res = getPublicPosts();
  const posts: BlogPost[] = Array.isArray(res) ? res : [];

  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return { prevPost: null, nextPost: null };

  return {
    prevPost: posts[(currentIndex - 1 + posts.length) % posts.length],
    nextPost: posts[(currentIndex + 1) % posts.length],
  };
}
