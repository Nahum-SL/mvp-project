"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useDeletePost } from "../hooks/use-post-mutation";

import { useDeleteModal, usePostActions } from "../store/post.selectors";
import { toast } from "sonner";

export const DeletePostModal = () => {
  // =========
  // STORE
  // =========
  const { isOpen, postId, postTitle } = useDeleteModal();
  const { closeDeleteModal } = usePostActions();

  // =========
  // MUTATION
  // =========
  const {mutate, isPending  } = useDeletePost();

  // =========
  // HANDLERS
  // =========
  const handleDelete = () => {
    if (!postId) return;

    mutate(postId, {
      onSuccess: () => {
        toast.success("Artículo eliminado correctamente");

        closeDeleteModal();
      },

      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "Error inesperado",
        );
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isPending ? closeDeleteModal : undefined}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100"
          />

          {/* MODAL */}
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
                  <span className="font-bold text-slate-800">{postTitle}</span>.
                  Esta acción es irreversible.
                </p>

                <div className="flex flex-col w-full gap-3 mt-6">
                  <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="w-full py-4 bg-red-600 text-white font-extrabold rounded-2xl hover:bg-red-700 transition-colors uppercase text-xs tracking-widest flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isPending && (
                      <Loader2 className="animate-spin" size={16} />
                    )}

                    {isPending ? "Eliminando..." : "Sí, eliminar"}
                  </button>

                  <button
                    onClick={closeDeleteModal}
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
