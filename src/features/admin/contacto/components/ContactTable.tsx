// src/features/admin/contacto/components/contact-table.tsx
"use client";

import { useAdminContacts } from "../hooks/use-contacto-query";
import { useDeleteContact } from "../hooks/use-contacto-mutation";
import {
  useContactActions,
  useActiveContact,
} from "../store/contacto.selector";

import { ContactRow } from "./ContactRow";
import { ContactStatusFormView } from "./ContactStatusView";
import { Loader2, Users, X } from "lucide-react";

export function ContactTable() {
  // Cache de Datos
  const { data: contactos, isLoading, isError, error } = useAdminContacts();

  // Operación Mutación (Optimista)
  const { mutate: deleteContact, isPending: isDeleting } = useDeleteContact();

  // Orquestación con Zustand
  const activeContact = useActiveContact();
  const { setActiveContact } = useContactActions();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium">Cargando leads y contactos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 rounded-lg text-sm">
        Error al cargar los datos:{" "}
        {error instanceof Error ? error.message : "Error desconocido"}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Contenedor de la Tabla */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm bg-white dark:bg-gray-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
              <th className="px-6 py-3.5">Nombre / Correo</th>
              <th className="px-6 py-3.5">Teléfono</th>
              <th className="px-6 py-3.5">Fecha Nac.</th>
              <th className="px-6 py-3.5">Estado</th>
              <th className="px-6 py-3.5">Comentario</th>
              <th className="px-6 py-3.5 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
            {contactos && contactos.length > 0 ? (
              contactos.map((contacto) => (
                <ContactRow
                  key={contacto.id}
                  contacto={contacto}
                  onEditStatus={(c) => setActiveContact(c)}
                  onDelete={(id) => deleteContact(id)}
                  isDeleting={isDeleting}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Users className="w-8 h-8 text-gray-300" />
                    <p>No se encontraron registros de contactos disponibles</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal / Sidebar Drawer de Actualización de Estado */}
      {activeContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in">
          <div className="w-full max-w-md h-full bg-white dark:bg-gray-900 shadow-xl p-6 flex flex-col gap-6 animate-slide-in border-l border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Gestionar Contacto
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activeContact.name}
                </p>
              </div>
              <button
                onClick={() => setActiveContact(null)}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1">
              <ContactStatusFormView />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
