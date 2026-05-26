// IntranetPreviewDrawer.tsx

"use client";

import { Drawer } from "@/src/components/ui/drawer/Drawer";

import {
  useIntranetActions,
  usePreviewDrawerLinkId,
  usePreviewDrawerOpen,
} from "../store/intranet.selector";

import { useAdminIntranetLink } from "../hooks/use-intranet-queries";

import { LoadingState } from "@/src/components/ui/states/LoadingState";
import { ErrorState } from "@/src/components/ui/states/ErrorStates";

import { IntranetPreviewContent } from "./IntranetPreviewContent";

export function IntranetPreviewDrawer() {
  const isOpen = usePreviewDrawerOpen();
  const linkId = usePreviewDrawerLinkId();
    
  const { closePreviewDrawer } = useIntranetActions();

  const { data, isLoading, isError } = useAdminIntranetLink(linkId);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closePreviewDrawer}
      title="Previsualización"
      subtitle="Detalles del acceso"
    >
      {isLoading && <LoadingState message="Cargando información..." />}

      {isError && (
        <ErrorState
          title="No se pudo cargar el enlace"
          description="Ocurrió un problema consultando la información."
        />
      )}

      {data && <IntranetPreviewContent link={data} />}
    </Drawer>
  );
}
