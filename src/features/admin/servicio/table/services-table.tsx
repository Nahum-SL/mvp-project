// features/admin/servicio/table/servicio-table.tsx
"use client";
import { LayoutGrid } from "lucide-react";
import { ServiceRow } from "./services-row";
import type {
  Service,
  ServiceFilters,
} from "@/src/types/servicio/servicio-types";
import { Table } from "@/src/components/ui/table/Table";
import { EmptyState } from "@/src/components/ui/states/EmptyState";

//
interface Props {
  services: Service[]; // Soporte SSR fallback híbrido de carga rápida
  isLoading: boolean; // Indicador de carga para mostrar estados de UI adecuados
  filters: ServiceFilters[];
}

export function ServicesTable({ services, isLoading }: Props) {
  const tableHeaders = ["Servicio", "Target", "Estado", "Acciones"];

  return (
    <Table
      headers={tableHeaders}
      isLoading={isLoading}
      isEmpty={!services.length}
      emptyComponent={
        <EmptyState
          icon={LayoutGrid}
          title="No se encontraron servicios"
          description="Prueba modificando los filtros."
        />
      }
    >
      {services.map((svc) => (
        <ServiceRow key={svc.id} svc={svc} />
      ))}
    </Table>
  );
}
