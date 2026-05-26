import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPostAction,
  updatePostAction,
  deletePostAction,
} from "../api/post.mutation";

import { BlogPost } from "@/src/types/blog/blogPost";

import { toast } from "sonner";

import { POST_QUERY_KEYS } from "../utils/post-query-key";

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

    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEYS.lists(),
      });

      queryClient.setQueryData(
        POST_QUERY_KEYS.detail(updatedPost.id),
        updatedPost,
      );

      toast.success("Post actualizado correctamente");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Error actualizando post",
      );
    },
  });
};

// DELETE
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostAction,

    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({
        queryKey: POST_QUERY_KEYS.lists(),
      });

      // Guardar el estado previo de la lista
      const previousPosts = queryClient.getQueryData<BlogPost[]>(
        POST_QUERY_KEYS.lists(),
      );

      // Actualizar la lista de posts en cache eliminando el post borrado
      if (previousPosts) {
        queryClient.setQueryData<BlogPost[]>(
          POST_QUERY_KEYS.lists(),
          previousPosts.filter((post) => post.id !== Number(deletedId)),
        );
      }

      return { previousPosts };
    },

    onError: (error, deletedId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(
          POST_QUERY_KEYS.lists(), // Revertir a la lista previa en caso de error
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
