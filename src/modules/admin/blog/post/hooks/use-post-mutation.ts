import { useMutation, useQueryClient } from "@tanstack/react-query";
// Actions
import { createPost, updatePost, deletePost } from "../api/post.mutation";
// Types
import type { BlogPost } from "@/src/types/blog/blogPost";
// Querys
import { POST_QUERY_KEYS } from "../utils/post-query-key";
// Zustand
import { usePostFilters } from "../store/post.selectors";

// ===========
// MUTATIONS
// ===========
//
// CREATE
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

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
  const filters = usePostFilters();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updatePost(id, data),

    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEYS.lists(filters),
      });

      queryClient.setQueryData(
        POST_QUERY_KEYS.detail(updatedPost.id),
        updatedPost,
      );
    },

  });
};

// DELETE
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const filters = usePostFilters();

  return useMutation({
    mutationFn: deletePost,

    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({
        queryKey: POST_QUERY_KEYS.lists(filters),
      });

      const previousPosts = queryClient.getQueryData<BlogPost[]>(
        POST_QUERY_KEYS.lists(filters),
      );

      if (previousPosts) {
        queryClient.setQueryData(
          POST_QUERY_KEYS.lists(filters),
          previousPosts.filter((p) => p.id !== Number(deletedId)),
        );
      }

      return { previousPosts };
    },

    onError: (_error, _deletedId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(
          POST_QUERY_KEYS.lists(filters), // Revertir a la lista previa en caso de error
          context.previousPosts,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEYS.all,
      });
    },
  });
};
