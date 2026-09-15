import { useQuery } from "@tanstack/react-query";
import { getPostBySlug, getPublicPosts } from "../api/blog-public.api";
import { PUBLIC_POST_QUERY_KEYS } from "../utils/public-post-query";

export function usePublicPosts() {
  return useQuery({
    queryKey: PUBLIC_POST_QUERY_KEYS.all,
    queryFn: getPublicPosts,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: PUBLIC_POST_QUERY_KEYS.all,
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
  });
}
