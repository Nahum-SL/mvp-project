import { useQuery} from "@tanstack/react-query";
import { getAdminPosts, getPostById } from "../api/post.query";
import { POST_QUERY_KEYS } from "../utils/post-query-key";

// GET
export function useAdminPosts() {
  return useQuery({
    queryKey: POST_QUERY_KEYS.lists(),
    queryFn: getAdminPosts,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function usePostById(id: number | null) {
  return useQuery({
    queryKey: POST_QUERY_KEYS.detail(id ?? 0),
    queryFn: () => getPostById(id!), // Si id es null, usar 0 o un valor predeterminado
    enabled: id !== null && id > 0, // Solo ejecutar si id es válido
  });
}

