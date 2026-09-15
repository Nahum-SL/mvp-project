// features/admin/unete/modals/UpdateStatusModal.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, ClipboardCheck } from "lucide-react";
import { useStatusModal, useUneteActions } from "../store/unete.selector";
import { useUneteStatusForm } from "../hooks/use-unete-status-form";

export function UneteStatusModal() {
  const { isOpen } = useStatusModal();
  const { closeStatusModal } = useUneteActions();
  const { form, onSubmit, isPending } = useUneteStatusForm();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo desenfocado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isPending ? closeStatusModal : undefined}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100"
          />

          {/* Modal Contenedor */}
          <div className="fixed inset-0 flex items-center justify-center z-101 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl relative border border-slate-100 dark:border-gray-800"
            >
              {/* Botón Cerrar */}
              <button
                type="button"
                disabled={isPending}
                onClick={closeStatusModal}
                className="absolute right-5 top-5 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>

              <form
                onSubmit={onSubmit}
                className="space-y-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-1">
                  <ClipboardCheck size={24} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 uppercase tracking-tight italic">
                    Calificar Candidato
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-gray-500 font-medium mt-0.5">
                    Modifica el estado del postulante en el flujo del proceso de
                    selección
                  </p>
                </div>

                {/* Input Controlado RHF */}
                <div className="w-full text-left pt-2">
                  <label className="text-[10px] font-extrabold text-slate-400 dark:text-gray-500 uppercase tracking-widest block mb-2 italic">
                    Seleccionar Estado Actual
                  </label>
                  <select
                    {...form.register("status")}
                    disabled={isPending}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 text-sm font-semibold text-slate-800 dark:text-gray-200 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500/20 focus:ring-2 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="PENDIENTE">⏳ PENDIENTE</option>
                    <option value="REVISADO">✅ REVISADO</option>
                    <option value="RECHAZADO">❌ RECHAZADO</option>
                  </select>
                </div>

                {/* Botoneras */}
                <div className="flex flex-col w-full gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl transition-colors uppercase text-xs tracking-widest flex items-center justify-center gap-2 disabled:opacity-70 outline-none"
                  >
                    {isPending && (
                      <Loader2 className="animate-spin" size={14} />
                    )}
                    {isPending ? "Guardando..." : "Actualizar Estado"}
                  </button>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={closeStatusModal}
                    className="w-full py-3 bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-gray-400 font-bold rounded-2xl hover:bg-slate-100 dark:hover:bg-gray-700/60 transition-colors uppercase text-xs tracking-widest disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
