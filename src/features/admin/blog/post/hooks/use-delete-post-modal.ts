"use client";

import { toast } from "sonner";
import { useDeletePost } from "./use-blog-mutation";

interface UseDeletePostModalProps {
  postId: number;
  onClose: () => void;
}

export function useDeletePostModal({
  postId,
  onClose,
}: UseDeletePostModalProps) {
  const { mutate, isPending } = useDeletePost();

  const handleDelete = () => {
    mutate(postId, {
      onSuccess: () => {
        // Al ser un flujo API estándar, si entra aquí es porque el estatus fue 200 OK.
        toast.success("Artículo eliminado correctamente");
        onClose();
      },
      onError: (error) => {
        // Usamos la instancia estándar de Error de JS/TS sin recurrir a 'any'
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado";
        toast.error(errorMessage);
      },
    });
  };

  return {
    handleDelete,
    isPending,
  };
}
