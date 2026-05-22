"use client";
import { useAdminContacts } from "../hooks/use-contacto-query";
import { useContactActions } from "../store/contacto.selector";
import { Table } from "@/src/components/ui/table/Table";
import { LoadingState } from "@/src/components/ui/states/LoadingState";
import { EmptyState } from "@/src/components/ui/states/EmptyState";
import { ContactRow } from "./ContactRow";
import { Users } from "lucide-react";

const HEADERS = [
  "Nombre ",
  "Teléfono",
  "Fecha Nac.",
  "Estado",
  "Comentario",
  "Acciones",
];

export function ContactTable() {
  const { data: contactos, isLoading, isError, error } = useAdminContacts();
  const { setActiveContact, openDeleteModal } = useContactActions();

  if (isError) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 rounded-lg text-sm">
        Error al cargar los datos:
        {error instanceof Error ? error.message : "Error desconocido"}
      </div>
    );
  }
  return (
    <Table
      headers={HEADERS}
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
          onEditStatus={setActiveContact}
          onOpenDelete={openDeleteModal}
        />
      ))}
    </Table>
  );
}
