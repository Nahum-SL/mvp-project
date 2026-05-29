// features/admin/intranet/views/IntranetManagementView.tsx
"use client";

import { useAdminIntranetLinks } from "../hooks/use-intranet-queries";
import { LinkHeader } from "../table/LinkHeader"; // Tu componente para título y botón nuevo
import { LinkTable } from "../table/LinkTable";
import { IntranetPreviewDrawer } from "../drawers/IntranetPreviewDrawer";
import { DeleteIntranetModal } from "../modals/delete-intranet-modal";

export function IntranetManagementView() {
  // Asignamos un array vacío como fallback instantáneo para solucionar el error de tipado
  const { data: links = [], isLoading } = useAdminIntranetLinks();

  return (
    <div className="space-y-6 container mx-auto px-4 py-6 max-w-7xl">
      {/* 1. Orquestación del Encabezado Funcional */}
      <LinkHeader />

      {/* 2. Orquestación del Núcleo de Información */}
      <main className="w-full">
        <LinkTable links={links} isLoading={isLoading} />
      </main>

      {/* 3. Orquestación de Overlays Globales Pasivos de la Feature */}
      {/* Viven en la raíz de la view listos para activarse vía Zustand */}
      <IntranetPreviewDrawer />

      <DeleteIntranetModal />
    </div>
  );
}
