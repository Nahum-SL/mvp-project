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

  const { data: Services, isLoading } = useAdminServices();
  const filterServices = useFilteredServicios({services: Services}); // Aquí aplicamos los filtros a los servicios obtenidos
  return (
    <div className="space-y-8">
      {/* Header Corporativo del Catálogo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-8 rounded-4xl border border-slate-100 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600">
            <LayoutGrid size={20} />
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Catálogo de Servici os
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Administra los pilares de consultoría estratégica, flujos
            corporativos y puntos de dolor visibles en la plataforma.
          </p>
        </div>

        <Link
          href="/admin/servicio/nuevo"
          className="bg-slate-900 text-white px-6 py-4 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-50 flex items-center justify-center gap-2 shrink-0 group self-start sm:self-auto"
        >
          <Plus
            size={16}
            className="group-hover:rotate-90 transition-transform"
          />
          Nuevo Servicio
        </Link>
      </div>

      {/* Grid de Contenido Principal (Filtros + Tabla) */}
      <div className="space-y-4">
        {/* Aquí puedes montar un componente de Filtros en el futuro */}
        <ServicesTable services={filterServices} isLoading={isLoading} filters={filterServices} />
      </div>

      {/* Inyecciones Globales del Estado de UI (Zustand Control) */}
      <DeleteServiceModal />
      <ServicePreviewDrawer />
    </div>
  );
}
