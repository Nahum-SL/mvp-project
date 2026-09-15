// Ejemplo de uso en la capa views/
"use client";

import { useAdminContacts } from "../hooks/use-contacto-query";
import { useContactActions } from "../store/contacto.selector";
import { ContactTable } from "../table/contact-table";
import { ContactDeleteDialog } from "../drawers/ContactDeleteDialog";
import { ContactDrawer } from "../drawers/ContactDrawer";

export function ContactAdminView() {
  // 1. La Vista consume las queries y los selectores globales de acción
  const { data: contactos, isLoading, isError, error } = useAdminContacts();
  const { setActiveContact, openDeleteModal } = useContactActions();

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-700 bg-red-50 rounded-lg">
        Error: {error instanceof Error ? error.message : "Error desconocido"}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Coordinación y Pasaje de datos listos hacia la capa de Tabla */}
      <ContactTable 
        contactos={contactos}
        isLoading={isLoading}
        onEditStatus={setActiveContact}
        onOpenDelete={openDeleteModal}
      />

      {/* Overlays Desacoplados controlados por Zustand */}
      <ContactDeleteDialog />
      <ContactDrawer />
    </div>
  );
}