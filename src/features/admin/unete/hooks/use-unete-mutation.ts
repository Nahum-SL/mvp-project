import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { UNETE_QUERY_KEYS } from "../utils/unete-query-key";
import { updateJobAppStatusAction } from "../api/unete.mutation";

// ==================================
// UPDATE STATUS DE POSTULACION
// ==================================
export const useUpdateJobAppStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJobAppStatusAction,

    onSuccess: (updatedApp) => {
      // Refetch listas
      queryClient.invalidateQueries({
        queryKey: UNETE_QUERY_KEYS.lists(),
      });

      queryClient.setQueryData(
        UNETE_QUERY_KEYS.detail(updatedApp.id),
        updatedApp,
      );
      toast.success("Postulación actualizada correctamente");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Error actualizando postulación",
      );
    }
  });
};
