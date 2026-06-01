// src/features/admin/audit/views/audit-admin-view.tsx
"use client";

import { useState } from "react";
import { Database, Loader2 } from "lucide-react";
import { useAuditLogs, useAuditStats } from "../hooks/use-audit-queries";

// Subcomponentes refactorizados
import { AuditCardStats } from "../components/AuditStats";
import { LogsTable } from "../table/table-log";
import { OptimizationModal } from "../modals/optimization-modal";
import SectionHeader from "../../components/SectionHeader";

export function AuditAdminView() {
  const [isOptimizeOpen, setIsOptimizeOpen] = useState(false);

  // Consumo de Server State unificado mediante TanStack Query
  const {
    data: logs,
    isLoading: isLogsLoading,
    isError: isLogsError,
  } = useAuditLogs();
  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useAuditStats();

  const isLoading = isLogsLoading || isStatsLoading;
  const isError = isLogsError || isStatsError;

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-700 bg-red-50 rounded-2xl border border-red-100">
        Ocurrió un error al sincronizar los registros de auditoría con el
        servidor.
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* 1. Header de sección Coordinado */}
      <SectionHeader
        title="Auditoría del Sistema"
        subtitle="Monitoreo de seguridad y mantenimiento preventivo."
        icon={<Database size={32} />}
        variant="flat"
        actions={
          <button
            type="button"
            onClick={() => setIsOptimizeOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-emerald-500 
            text-white px-6 py-3 rounded-2xl text-[10px] font-bold 
            uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/10 active:scale-95"
          >
            <Database size={16} />
            Optimizar Base de Datos
          </button>
        }
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-20 gap-3 text-slate-400">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
          <p className="text-xs font-semibold uppercase tracking-wider">
            Sincronizando logs...
          </p>
        </div>
      ) : (
        <>
          {/* 2. Tarjetas de contadores (Solo si la data existe) */}
          {stats && <AuditCardStats stats={stats} />}

          {/* 3. Tabla pura de colecciones */}
          {logs && <LogsTable logs={logs} />}
        </>
      )}

      {/* 4. Overlays contextuales aislados */}
      <OptimizationModal
        isOpen={isOptimizeOpen}
        onClose={() => setIsOptimizeOpen(false)}
      />
    </div>
  );
}
