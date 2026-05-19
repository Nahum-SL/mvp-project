import { useQuery} from "@tanstack/react-query";
import { getAdminPost, getPostById } from "../api/post.api";
import { POST_QUERY_KEYS } from "../utils/blog-query-key";

// GET
export function useAdminPosts() {
  return useQuery({
    queryKey: [POST_QUERY_KEYS.lists],
    queryFn: getAdminPost,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function usePostById(id: number) {
  return useQuery({
    queryKey: [POST_QUERY_KEYS.detail],
    queryFn: () => getPostById(id),
    enabled: !!id, // Solo ejecutar si hay un ID válido
  });
}

