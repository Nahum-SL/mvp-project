// features/admin/intranet/modals/DeleteIntranetModal.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Importamos tus selectores específicos de Intranet
import { useDeleteModal, useIntranetActions } from "../store/intranet.selector";
// Importamos el hook de mutación correspondiente (Créalo en tus mutations si no existe aún)
import { useDeleteIntranetLink } from "../hooks/use-intranet-mutation";

export function DeleteIntranetModal() {
  // ==========================================
  // ZUSTAND STORE (Estados y Acciones locales)
  // ==========================================
  const { isOpen, id: linkId, title: linkTitle } = useDeleteModal();
  const { closeDeleteModal } = useIntranetActions();

  // ==========================================
  // REACT QUERY MUTATION
  // ==========================================
  const { mutate, isPending } = useDeleteIntranetLink();

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleDelete = () => {
    if (linkId === null) return;

    // Convertimos el id a string usando String() para cumplir con la firma de tu API
    mutate(String(linkId), {
      onSuccess: () => {
        toast.success("Enlace corporativo eliminado correctamente");
        closeDeleteModal();
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Error inesperado al eliminar",
        );
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP CON FILTRO BLUR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Evita el cierre accidental si la operación está en curso
            onClick={!isPending ? closeDeleteModal : undefined}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100"
          />

          {/* CONTENEDOR FLOTANTE DEL MODAL */}
          <div className="fixed inset-0 flex items-center justify-center z-101 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icono de Alerta de Destrucción */}
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
                  <AlertTriangle size={32} />
                </div>

                {/* Título de Confirmación */}
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">
                  ¿ELIMINAR ACCESO?
                </h3>

                {/* Mensaje Descriptivo Dinámico */}
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Estás a punto de borrar permanentemente el enlace{" "}
                  <span className="font-extrabold text-slate-800 italic">
                    {linkTitle}
                  </span>{" "}
                  de la intranet. Esta acción es completamente irreversible.
                </p>

                {/* Fila de Botones de Acción */}
                <div className="flex flex-col w-full gap-3 mt-6">
                  {/* Botón Peligroso de Confirmación */}
                  <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="w-full py-4 bg-red-600 text-white font-extrabold rounded-2xl hover:bg-red-700 transition-colors uppercase text-xs tracking-widest flex items-center justify-center gap-2 disabled:opacity-70 outline-none focus:ring-2 focus:ring-red-500/20"
                  >
                    {isPending && (
                      <Loader2 className="animate-spin" size={16} />
                    )}
                    {isPending ? "Eliminando..." : "Sí, eliminar acceso"}
                  </button>

                  {/* Botón de Cancelación */}
                  <button
                    onClick={closeDeleteModal}
                    disabled={isPending}
                    className="w-full py-4 bg-slate-100 text-slate-600 font-extrabold rounded-2xl hover:bg-slate-200 transition-colors uppercase text-xs tracking-widest disabled:opacity-50 outline-none"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
