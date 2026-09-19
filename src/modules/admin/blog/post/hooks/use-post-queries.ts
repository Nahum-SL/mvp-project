import { useQuery } from "@tanstack/react-query";
// Actions
import { getAdminPosts, getPostById } from "../api/post.query";
// Querys 
import { POST_QUERY_KEYS } from "../utils/post-query-key";
// Zustand
import { usePostFilters } from "../store/post.selectors";

// GET
export function useAdminPosts() {
  const filters = usePostFilters();

  return useQuery({
    queryKey: POST_QUERY_KEYS.lists(filters),
    queryFn: () => getAdminPosts(filters),
    placeholderData: (previousData) => previousData,
  });
}

export function usePostById(id: number | null) {
  return useQuery({
    queryKey: POST_QUERY_KEYS.detail(id ?? 0),
    queryFn: () => getPostById(id!), // Si id es null, usar 0 o un valor predeterminado
    enabled: id !== null && id > 0, // Solo ejecutar si id es válido
  });
}
