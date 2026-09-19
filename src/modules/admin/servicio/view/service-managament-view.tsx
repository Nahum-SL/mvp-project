// features/admin/servicio/views/servicio-management-view.tsx
"use client";

// Componentes de Vista - Tabla
import { ServicesTable } from "../table/services-table";
// Modals con Previzualisar - Eliminar
import { DeleteServiceModal } from "../modals/delete-service-modal";
import { ServicePreviewDrawer } from "../drawers/service-preview-drawer";
// Hooks
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
