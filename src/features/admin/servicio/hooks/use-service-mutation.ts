import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createServicioAction,
  deleteServicioAction,
  updateServicioAction,
} from "../api/servicio.mutation";
import { SERVICIO_QUERY_KEYS } from "../utils/servicio-query-options";
import type { Service } from "@/src/types/servicio/servicio-types";

// CREATE
export const useCreateServicio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createServicioAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SERVICIO_QUERY_KEYS.all,
      });
    },
  });
};

// UPDATE
export const useUpdateServicio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updateServicioAction(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SERVICIO_QUERY_KEYS.all,
      });
    },
  });
};

// DELETE
export const useDeleteServicio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteServicioAction,
    
    // Mutación Optimista ejecutada inmediatamente al disparar deleteServicio(id)
    onMutate: async (idDeleted) => {
      // Cancelamos queries salientes para que no sobreescriban nuestra caché optimista
      await queryClient.cancelQueries({ queryKey: SERVICIO_QUERY_KEYS.all });

      // Guardamos una copia del estado previo de la caché para Rollback
      const previousServicios = queryClient.getQueryData<Service[]>(SERVICIO_QUERY_KEYS.all);

      // Modificamos la caché removiendo el elemento de inmediato de la UI
      if (previousServicios) {
        queryClient.setQueryData<Service[]>(
          SERVICIO_QUERY_KEYS.all,
          previousServicios.filter((service) => service.id !== idDeleted)
        );
      }

      // Retornamos el contexto con el valor previo
      return { previousServicios };
    },

    // Si la acción falla en la DB, hacemos rollback automático usando el contexto previo
    onError: (err, idDeleted, context) => {
      if (context?.previousServicios) {
        queryClient.setQueryData(SERVICIO_QUERY_KEYS.all, context.previousServicios);
      }
    },

    // Siempre revalidar al terminar (sea éxito o fallo) para asegurar sincronía con el servidor
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: SERVICIO_QUERY_KEYS.all,
      });
    },
  });
}