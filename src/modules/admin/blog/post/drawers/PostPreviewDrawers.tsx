// features/admin/blog/post/drawers/PostPreviewDrawer.tsx
"use client";

import { Drawer } from "@/src/components/ui/drawer/Drawer";
import { usePreviewDrawer, usePostActions } from "../store/post.selectors";
import { usePostById } from "../hooks/use-post-queries"; // Hook Query por ID
import { LoadingState } from "@/src/components/ui/states/LoadingState";
import { ErrorState } from "@/src/components/ui/states/ErrorStates";
import { PostPreviewContent } from "./PostPreviewContent";

export function PostPreviewDrawer() {
  const { isOpen, postId } = usePreviewDrawer();
  const { closePreviewDrawer } = usePostActions();

  // Ejecuta la query si postId no es null
  const { data: post, isLoading, isError } = usePostById(postId);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closePreviewDrawer}
      title="Previsualización de Publicación"
      subtitle="Verificación de diseño del artículo y metadatos"
    >
      {isLoading && <LoadingState message="Cargando artículo..." />}

      {isError && (
        <ErrorState
          title="Error de lectura"
          description="Ocurrió un contratiempo consultando la base de datos del blog."
        />
      )}

      {!isLoading && post && <PostPreviewContent post={post} />}
    </Drawer>
  );
}
