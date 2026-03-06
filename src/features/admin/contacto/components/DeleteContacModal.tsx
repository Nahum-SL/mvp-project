// src/features/admin/contacto/components/DeleteContactModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-black uppercase italic text-slate-900 tracking-tight">
                ¿Eliminar Prospecto?
              </h3>
              <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                Estás a punto de eliminar a{" "}
                <span className="font-bold text-slate-700">{name}</span>. Esta
                acción no se puede deshacer.
              </p>

              <div className="flex gap-3 mt-8 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors"
                >
                  <X size={32} />
                  Cancelar
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isPending}
                  className="flex-1 px-6 py-4 rounded-2xl bg-red-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-red-600 disabled:bg-red-300 transition-all flex items-center justify-center gap-2"
                >
                  {isPending && <Loader2 size={16} className="animate-spin" />}
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
