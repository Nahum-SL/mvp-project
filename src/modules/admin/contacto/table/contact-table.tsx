// src/features/admin/contacto/table/contact-table.tsx
import { Users } from "lucide-react";
import type { Contacto } from "@/src/types/contacto/contacto-type";
import { CONTACT_COLUMNS } from "./contact-columns";
import { ContactRow } from "./contact-row";
// UI Base Atoms
import { Table } from "@/src/components/ui/table/Table";
import { LoadingState } from "@/src/components/ui/states/LoadingState";
import { EmptyState } from "@/src/components/ui/states/EmptyState";

interface ContactTableProps {
  contactos: Contacto[] | undefined;
  isLoading: boolean;
  onEditStatus: (contacto: Contacto) => void;
  onOpenDelete: (payload: { id: string; name: string }) => void;
}

export function ContactTable({
  contactos,
  isLoading,
  onEditStatus,
  onOpenDelete,
}: ContactTableProps) {
  return (
    <Table
      headers={Array.from(CONTACT_COLUMNS)}
      isLoading={isLoading}
      isEmpty={!contactos || contactos.length === 0}
      loadingComponent={
        <LoadingState message="Cargando leads y contactos de la empresa..." />
      }
      emptyComponent={
        <EmptyState
          icon={Users}
          title="No se encontraron prospectos"
          description="Los leads que envíen los usuarios desde el portal público aparecerán ordenados en esta cuadrícula."
        />
      }
    >
      {contactos?.map((contacto) => (
        <ContactRow
          key={contacto.id}
          contacto={contacto}
          onEditStatus={onEditStatus}
          onOpenDelete={onOpenDelete}
        />
      ))}
    </Table>
  );
}
