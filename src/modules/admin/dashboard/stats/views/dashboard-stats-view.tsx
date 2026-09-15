// src/features/admin/dashboard/stats/views/dashboard-stats-view.tsx
"use client";

import { LayoutDashboard } from "lucide-react";
import { useDashboardStats } from "../hooks/use-stats-queries";
import { DashboardKpiGrid } from "../components/dashboard-kpi-grid";
import { DashboardChartsContainer } from "../components/charts/dashboard-charts-container";
import SectionHeader from "@/src/components/ui/SectionHeader";
import { LoadingState } from "@/src/components/ui/states/LoadingState";

export function DashboardStatsView() {
  const { data: stats, isLoading, isError } = useDashboardStats();

  if (isError) {
    return (
      <div className="p-6 text-sm font-semibold text-red-700 bg-red-50 rounded-2xl border border-red-100">
        Error al sincronizar las métricas con el servidor de analíticas. Por
        favor, reintente más tarde.
      </div>
    );
  }

  return (
    <div className="space-y-10 p-6">
      {/* Encabezado declarativo reutilizable */}
      <SectionHeader
        title="Panel de Control"
        subtitle="Métricas en tiempo real, rendimiento del sitio e interacciones de ASESCON."
        icon={<LayoutDashboard size={32} />}
        variant="flat"
      />

      {isLoading ? (
        <LoadingState
          message="Compilando analíticas ..."
          messageClassName="uppercase tracking-widest"
        />
      ) : (
        stats && (
          <>
            {/* Grid Atómico de KPIs cuantitativas */}
            <DashboardKpiGrid stats={stats} />

            {/* Contenedor Desacoplado de Visualización Gráfica */}
            <DashboardChartsContainer stats={stats} />
          </>
        )
      )}
    </div>
  );
}
