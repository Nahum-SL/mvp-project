import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlogCategoryAction } from "../api/blog-category-mutation";
import { BLOG_QUERY_KEY } from "../../utils/blog-query-key";

// CREATE
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlogCategoryAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BLOG_QUERY_KEY.all,
      });
    },
  });
};
