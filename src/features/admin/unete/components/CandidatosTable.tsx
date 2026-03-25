// features/admin/unete/components/CandidatosTable.tsx
"use client";

import { AnimatePresence } from "framer-motion";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import { JobAppStatus, JobApplication } from "@/src/types/unete/unete";
import { updateCandidatoStatus } from "../action";
import { CandidatoFilters } from "./CandidatosFilters";
import { CandidatoRow } from "./CandidatoRow";
import { ConfirmModal } from "./ConfirmModal";

export const CandidatosTable = ({ data }: { data: JobApplication[] }) => {
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<JobAppStatus | "TODOS">("TODOS");
  const [search, setSearch] = useState(""); // <--- Nuevo estado de búsqueda

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    candidatoId: string;
    newStatus: JobAppStatus | null;
  }>({
    isOpen: false,
    candidatoId: "",
    newStatus: null,
  });

  // Lógica de filtrado combinada (Status + Search)
  const filteredData = data.filter((c) => {
    const matchesStatus = filter === "TODOS" ? true : c.status === filter;
    const matchesSearch =
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.dni.includes(search);

    return matchesStatus && matchesSearch;
  });

  // Accion de actualizar
  const handleUpdateStatus = (id: string, status: JobAppStatus) => {
    startTransition(async () => {
      const result = await updateCandidatoStatus(id, status);
      if (result.success) {
        toast.success(`Estado actualizado a ${status.toLowerCase()}`);
      } else {
        toast.error(result.error || "Error al actualizar");
      }
    });
  };

  const openConfirmModal = (id: string, status: JobAppStatus) => {
    // Si es RECHAZADO, pedimos confirmación. Si es REVISADO, lo hacemos directo (o viceversa)
    if (status === JobAppStatus.RECHAZADO) {
      setModalConfig({ isOpen: true, candidatoId: id, newStatus: status });
    } else {
      handleUpdateStatus(id, status);
    }
  };

  return (
    <div className="space-y-6">
      <CandidatoFilters
        activeFilter={filter}
        onFilterChange={setFilter}
        totalResults={filteredData.length}
        searchTerm={search}
        onSearchChange={setSearch}
      />

      <div className="w-full overflow-x-auto bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Postulante
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Puesto / Exp.
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                Fecha
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                Estado
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence mode="popLayout">
              {filteredData.map((candidato, index) => (
                <CandidatoRow
                  key={candidato.id}
                  candidato={candidato}
                  index={index}
                  isPending={isPending}
                  onUpdateStatus={handleUpdateStatus}
                  onOpenModal={openConfirmModal}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="p-20 text-center text-slate-300 uppercase font-extrabold tracking-widest text-xs">
            No hay registros en esta categoría
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={() => {
          if (modalConfig.candidatoId && modalConfig.newStatus) {
            handleUpdateStatus(modalConfig.candidatoId, modalConfig.newStatus);
          }
        }}
        variant="danger"
        title="¿Confirmar rechazo?"
        description="Esta acción marcará al candidato como no apto. Podrás cambiarlo después si es necesario."
        confirmText="Sí, rechazar"
      />
    </div>
  );
};
