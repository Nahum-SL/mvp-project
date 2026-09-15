// src/features/admin/audit/modals/optimization-modal.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Loader2, Info } from "lucide-react";
import { useCleanupAudit } from "../hooks/use-audit-mutation";
import { toast } from "sonner";

import { FormActions } from "@/src/components/ui/form/FormActions";

interface OptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OptimizationModal({ isOpen, onClose }: OptimizationModalProps) {
  const { mutate: cleanup, isPending } = useCleanupAudit();

  const handleOptimize = () => {
    cleanup(undefined, {
      onSuccess: (result) => {
        if (result.deletedCount > 0) {
          toast.success(
            `Optimización exitosa: ${result.deletedCount} registros eliminados`,
          );
        } else {
          toast.info("No hay registros antiguos que requieran limpieza");
        }
        onClose();
      },
      onError: () => {
        toast.error("Error al procesar la optimización");
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isPending ? undefined : onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100"
          />

          <div className="fixed inset-0 flex items-center justify-center z-101 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-2">
                  <Database size={32} />
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                  Optimizar Base de Datos
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed">
                  Estás a punto de eliminar logs de actividad con más de{" "}
                  <span className="font-bold text-indigo-600">60 días</span> de
                  antigüedad.
                </p>

                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3 text-left">
                  <Info className="text-amber-500 shrink-0" size={18} />
                  <p className="text-[11px] text-amber-700 leading-snug">
                    Esta acción mejora la velocidad de las consultas y el
                    rendimiento del servidor. Los datos eliminados no se pueden
                    recuperar.
                  </p>
                </div>

                <div className="flex flex-col w-full gap-3 mt-4">
                  <button
                    type="button"
                    onClick={handleOptimize}
                    disabled={isPending}
                    className="w-full py-4 bg-slate-900 text-white font-extrabold rounded-2xl hover:bg-indigo-600 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isPending && (
                      <Loader2 className="animate-spin" size={16} />
                    )}
                    {isPending ? "Procesando..." : "Confirmar Optimización"}
                  </button>

                  <button
                    type="button"
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
}
