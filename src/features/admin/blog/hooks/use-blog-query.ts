import { useQuery} from "@tanstack/react-query";
import { getCategories, getAdminPost, getPostById } from "../api/blog-client";
import { BLOG_QUERY_KEY } from "../utils/blog-query-key";

// GET
export function useCategories() {
  return useQuery({
    queryKey: [BLOG_QUERY_KEY.categories],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useAdminPosts() {
  return useQuery({
    queryKey: [BLOG_QUERY_KEY.adminPosts],
    queryFn: getAdminPost,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function usePostById(id: number) {
  return useQuery({
    queryKey: [BLOG_QUERY_KEY.postById(id)],
    queryFn: () => getPostById(id),
    enabled: !!id, // Solo ejecutar si hay un ID válido
  });
}

