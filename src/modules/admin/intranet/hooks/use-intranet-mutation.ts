// src/features/admin/intranet/hooks/use-intranet-mutation.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  createIntranetLinkAction,
  updateIntranetLinkAction,
  deleteIntranetLinkAction,
} from "../api/intranet.mutation";

import { INTRANET_QUERY_KEYS } from "../utils/intranet-query-key";

import type { IntranetLink } from "@/src/types/intranet/intranet-types";

// ======================
// CREATE
// ======================

export const useCreateIntranetLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIntranetLinkAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: INTRANET_QUERY_KEYS.lists(),
      });

      toast.success("Link creado correctamente");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Error creando link",
      );
    },
  });
};

// ======================
// UPDATE
// ======================

export const useUpdateIntranetLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIntranetLinkAction,

    onSuccess: (updatedLink) => {
      // Refetch listas
      queryClient.invalidateQueries({
        queryKey: INTRANET_QUERY_KEYS.lists(),
      });

      // Actualizar cache individual
      queryClient.setQueryData(
        INTRANET_QUERY_KEYS.detail(updatedLink.id),
        updatedLink,
      );

      toast.success("Link actualizado correctamente");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Error actualizando link",
      );
    },
  });
};

// ======================
// DELETE
// ======================

export const useDeleteIntranetLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIntranetLinkAction,

    // Dentro de useDeleteIntranetLink en use-intranet-mutation.ts
    onMutate: async (idDeleted) => {
      // Cancelar queries salientes de la lista específicamente
      await queryClient.cancelQueries({
        queryKey: INTRANET_QUERY_KEYS.lists(),
      });

      // Guardar el estado previo de la lista
      const previousLinks = queryClient.getQueryData<IntranetLink[]>(
        INTRANET_QUERY_KEYS.lists(),
      );

      // Actualizar optimistamente la lista correcta
      if (previousLinks) {
        queryClient.setQueryData<IntranetLink[]>(
          INTRANET_QUERY_KEYS.lists(),
          previousLinks.filter((link) => link.id !== Number(idDeleted)),
        );
      }

      return { previousLinks };
    },
    onError: (_err, _idDeleted, context) => {
      if (context?.previousLinks) {
        queryClient.setQueryData(
          INTRANET_QUERY_KEYS.lists(), // Revertir en la lista
          context.previousLinks,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: INTRANET_QUERY_KEYS.all,
      });
    },
  });
};
