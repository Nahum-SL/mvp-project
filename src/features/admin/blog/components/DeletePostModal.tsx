// src/features/admin/blog/components/DeletePostModal.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { deletePostAction } from "../action";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  postTitle: string;
}

export const DeletePostModal = ({
  isOpen,
  onClose,
  postId,
  postTitle,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deletePostAction(postId);
      if (result.success) {
        toast.success("Artículo eliminado correctamente");
        onClose();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-101 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
                  <AlertTriangle size={32} />
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">
                  ¿ELIMINAR ARTÍCULO?
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed">
                  Estás a punto de borrar{" "}
                  <span className="font-bold text-slate-800">
                    {postTitle}
                  </span>
                  . Esta acción es irreversible y el contenido desaparecerá del
                  blog público.
                </p>

                <div className="flex flex-col w-full gap-3 mt-6">
                  <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="w-full py-4 bg-red-600 text-white font-extrabold rounded-2xl hover:bg-red-700 transition-colors uppercase text-xs tracking-widest flex items-center justify-center gap-2"
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
