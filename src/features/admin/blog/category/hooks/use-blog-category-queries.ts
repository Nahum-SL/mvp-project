import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/blog-category-client";
import { CATEGORY_QUERY_KEYS } from "../utils/blog-category-keys";

export function useCategories() {
  return useQuery({
    queryKey: [CATEGORY_QUERY_KEYS.lists],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}