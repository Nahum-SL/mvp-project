  import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPostAction,
  updatePostAction,
  deletePostAction,
} from "../api/blog-mutation";

import { POST_QUERY_KEYS } from "../utils/blog-query-key";

// ===========
// MUTATIONS
// ===========
//
// CREATE
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEYS.all,
      });
    },
  });
};

// UPDATE
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updatePostAction(id, data),

    onSuccess: () => {
      // Invalidar la lista de posts y el post específico actualizado
      queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEYS.all,
      });
    },
  });
};

// DELETE
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEYS.all,
      });
    },
  });
};
