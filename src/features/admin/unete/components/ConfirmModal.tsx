// features/admin/unete/components/ConfirmModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  variant?: "danger" | "primary";
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmar",
  variant = "primary",
}: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm 
            z-100 flex items-center justify-center p-4"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
            w-full max-w-md bg-white rounded-4xl shadow-2xl z-101 overflow-hidden"
          >
            <div className="p-8 text-center">
              <div
                className={cn(
                  "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6",
                  variant === "danger"
                    ? "bg-rose-100 text-rose-600"
                    : "bg-blue-100 text-blue-600",
                )}
              >
                <AlertCircle size={32} />
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">
                {title}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {description}
              </p>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={cn(
                    `flex-1 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest 
                    text-white shadow-lg transition-all active:scale-95`,
                    variant === "danger"
                      ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
                      : "bg-slate-900 hover:bg-slate-800 shadow-slate-900/20",
                  )}
                >
                  {confirmText}
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
