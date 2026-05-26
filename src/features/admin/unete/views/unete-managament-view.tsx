// features/admin/unete/views/UneteManagementView.tsx
"use client";

import { useAdminJobApplications } from "../hooks/use-unete-query";
import { CandidateTable } from "../table/candidatos-table";
import { UneteStatusModal } from "../modals/unete-status-modal";
import { Users } from "lucide-react";

export function UneteManagementView() {
  const { data: candidates = [], isLoading } = useAdminJobApplications();

  return (
    <div className="space-y-6 container mx-auto px-4 py-6 max-w-7xl">
      {/* Encabezado Desacoplado Integrado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100 dark:border-gray-800">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 rounded-2xl mt-1 shrink-0">
            <Users size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-gray-50 font-sans tracking-tight uppercase italic">
              Bolsa de Trabajo
            </h1>
            <p className="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider mt-0.5">
              Revisión de Currículums y Gestión de Candidatos Únete a
              Nosotros
            </p>
          </div>
        </div>
      </div>

      {/* Núcleo de Contenido Técnico */}
      <main className="w-full">
        <CandidateTable candidates={candidates} isLoading={isLoading} />
      </main>

      {/* Overlays Pasivos Operacionales */}
      <UneteStatusModal />
    </div>
  );
}
