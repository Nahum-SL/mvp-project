// features/admin/servicio/views/servicio-management-view.tsx
"use client";
import Link from "next/link";
import { Plus, LayoutGrid } from "lucide-react";

import { ServicesTable } from "../table/services-table";
import { DeleteServiceModal } from "../modals/delete-service-modal";
import { ServicePreviewDrawer } from "../drawers/service-preview-drawer";

import { useFilteredServicios } from "../hooks/use-filtered-servicio";
import { useAdminServices } from "../hooks/use-service-queries";

export function ServicioManagementView() {

  const { data: Services = [], isLoading } = useAdminServices();
  const filterServices = useFilteredServicios({services: Services});

  return (
    <div className="space-y-8">

      {/* Grid de Contenido Principal (Filtros + Tabla) */}
      <div className="space-y-4">
        {/* Aquí puedes montar un componente de Filtros en el futuro */}
        <ServicesTable services={filterServices} isLoading={isLoading} />
      </div>

      {/* Inyecciones Globales del Estado de UI (Zustand Control) */}
      <DeleteServiceModal />
      <ServicePreviewDrawer />
    </div>
  );
}
