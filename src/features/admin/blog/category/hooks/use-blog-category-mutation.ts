import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlogCategoryAction } from "../api/blog-category-mutation";
import { CATEGORY_QUERY_KEYS } from "../utils/blog-category-keys";

// CREATE
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: createBlogCategoryAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CATEGORY_QUERY_KEYS.all,
      });
    },
  });
};
