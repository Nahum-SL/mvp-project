// src/features/admin/contacto/components/ContactDeleteDialog.tsx
"use client";

import {
  useContactDeleteModal,
  useContactActions,
} from "../store/contacto.selector";
import { useDeleteContact } from "../hooks/use-contacto-mutation";
import { AlertTriangle } from "lucide-react";

// Componentes Atomicos
import { Dialog } from "@/src/components/ui/dialog/Dialog";
import { LoadingState } from "@/src/components/ui/states/LoadingState";

// ====================
// USAR en el ContactAdminPage
// ====================
export function ContactDeleteDialog() {
  const { isOpen, contactId, contactName } = useContactDeleteModal();
  const { closeDeleteModal } = useContactActions();

  // Consumimos la mutación de borrado
  const { mutate: deleteContact, isPending } = useDeleteContact();

  const handleDelete = () => {
    if (!contactId) return;

    deleteContact(contactId, {
      onSuccess: () => {
        closeDeleteModal();
      },
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={isPending ? () => {} : closeDeleteModal} // Bloquea el cierre si está cargando
      title="Confirmar Eliminación"
    >
      <div className="space-y-4">
        {/* Alerta Visual de Peligro */}
        <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-red-800 dark:text-red-300">
              Acción Irreversible
            </h4>
            <p className="text-xs text-red-700/90 dark:text-red-400/80 mt-0.5">
              Estás a punto de eliminar permanentemente el registro de contacto
              de{" "}
              <span className="font-bold text-red-900 dark:text-red-200">
                {contactName || "este usuario"}
              </span>
              . Esta acción no se puede deshacer.
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          ¿Estás seguro de que deseas continuar? Los datos asociados a este
          prospecto se perderán de los sistemas de administración de la empresa.
        </p>

        {/* Barra de Acciones */}
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            disabled={isPending}
            onClick={closeDeleteModal}
            className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="inline-flex items-center justify-center min-w-25 px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md transition-colors shadow-sm disabled:opacity-50"
          >
            {isPending && <LoadingState message="Eliminando .." />}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
