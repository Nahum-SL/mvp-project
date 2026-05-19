import { useQuery } from "@tanstack/react-query";
import { getPostBySlug, getPublicPosts } from "../api/blog-public.api";

export function usePublicPosts() {
  return useQuery({
    queryKey: ["public-posts"],
    queryFn: getPublicPosts,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: ["post-slug"],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
  });
}
