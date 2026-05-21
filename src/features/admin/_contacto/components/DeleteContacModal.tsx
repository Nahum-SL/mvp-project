// src/features/admin/contacto/components/DeleteContactModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
  name: string;
}

export const DeleteContactModal = ({
  isOpen,
  onClose,
  onConfirm,
  isPending,
  name,
}: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Fondo desenfocado) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100"
          />

          {/* Contenedor del Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-101 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative border border-slate-100"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icono de Alerta */}
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
                  <AlertTriangle size={32} />
                </div>

                {/* Título */}
                <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                  ¿ELIMINAR PROSPECTO?
                </h3>

                {/* Descripción */}
                <p className="text-slate-500 text-sm leading-relaxed">
                  Estás a punto de eliminar a{" "}
                  <span className="font-bold text-slate-800">{name}</span>. Esta
                  acción es irreversible y el registro desaparecerá de la base
                  de datos de ASESCON.
                </p>

                {/* Acciones (Botones apilados) */}
                <div className="flex flex-col w-full gap-3 mt-6">
                  <button
                    onClick={onConfirm}
                    disabled={isPending}
                    className="w-full py-4 bg-red-600 text-white font-extrabold rounded-2xl hover:bg-red-700 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-red-100 disabled:bg-red-400"
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : null}
                    {isPending
                      ? "Eliminando..."
                      : "Sí, eliminar permanentemente"}
                  </button>

                  <button
                    onClick={onClose}
                    disabled={isPending}
                    className="w-full py-4 bg-slate-100 text-slate-600 font-extrabold rounded-2xl hover:bg-slate-200 transition-colors uppercase text-xs tracking-widest disabled:opacity-50"
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
};
