// src/features/admin/contacto/hooks/use-contacto-mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CONTACT_QUERY_KEYS } from "../utils/contact-query-key";

import {
  updateStateContactAction,
  deleteContactAction,
} from "../api/contacto.mutation";

import type { Contacto } from "@/src/types/contacto/contacto-type";

export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStateContactAction,

    onSuccess: (updatedContact) => {
      queryClient.invalidateQueries({
        queryKey: CONTACT_QUERY_KEYS.lists(),
      });

      queryClient.setQueryData(
        CONTACT_QUERY_KEYS.detail(updatedContact.id),
        updatedContact,
      );
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContactAction,

    onMutate: async (idDeleted) => {
      await queryClient.cancelQueries({
        queryKey: CONTACT_QUERY_KEYS.lists(),
      });

      const previousContactos = queryClient.getQueryData<Contacto[]>(
        CONTACT_QUERY_KEYS.lists(),
      );

      if (previousContactos) {
        queryClient.setQueryData<Contacto[]>(
          CONTACT_QUERY_KEYS.lists(),
          previousContactos.filter((contacto) => contacto.id !== idDeleted),
        );
      }

      return { previousContactos };
    },

    onError: (_err, _idDeleted, context) => {
      if (context?.previousContactos) {
        queryClient.setQueryData(
          CONTACT_QUERY_KEYS.lists(),
          context.previousContactos,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: CONTACT_QUERY_KEYS.lists(),
      });
    },
  });
};
