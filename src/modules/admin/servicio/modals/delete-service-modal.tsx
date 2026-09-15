// features/admin/servicio/modals/delete-servicio-modal.tsx
"use client";
import {
  useDeleteServicioModal,
  useServicioActions,
} from "../store/servicio.selector";
import { useDeleteServicio } from "../hooks/use-service-mutation";
import { Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function DeleteServiceModal() {
  const { isOpen, serviceId, serviceTitle } = useDeleteServicioModal();
  const { closeDeleteModal } = useServicioActions();
  const { mutate: deleteServicio, isPending } = useDeleteServicio();

  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    if (!serviceId) return;

    deleteServicio(serviceId, {
      onSuccess: () => {
        toast.success("Servicio eliminado del catálogo");
        closeDeleteModal();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-4xl max-w-md w-full p-8 shadow-2xl space-y-6 border border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
          <AlertTriangle size={24} />
        </div>

        <div className="space-y-2">
          <h3 className="font-extrabold text-slate-900 text-lg">
            ¿Eliminar este servicio?
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Estás a punto de eliminar{" "}
            <strong className="text-slate-800">{serviceTitle}</strong>. Esta
            acción limpiará los registros de la base de datos y purgará los
            archivos multimedia de Cloudinary de forma permanente.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            disabled={isPending}
            onClick={closeDeleteModal}
            className="flex-1 py-4 bg-slate-50 text-slate-500 font-bold rounded-2xl text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={handleConfirmDelete}
            className="flex-1 py-4 bg-red-500 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            {isPending ? "Eliminando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
