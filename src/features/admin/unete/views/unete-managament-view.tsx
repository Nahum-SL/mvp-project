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
      {/* Núcleo de Contenido Técnico */}
      <main className="w-full">
        <CandidateTable candidates={candidates} isLoading={isLoading} />
      </main>

      {/* Overlays Pasivos Operacionales */}
      <UneteStatusModal />
    </div>
  );
}
