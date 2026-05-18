import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/blog-category-queries";
import { BLOG_QUERY_KEY } from "../../utils/blog-query-key";

export function useCategories() {
  return useQuery({
    queryKey: [BLOG_QUERY_KEY.categories],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}