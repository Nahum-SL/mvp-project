// src/features/admin/dashboard/stats/components/charts/dashboard-charts-container.tsx
import type { DashboardStats } from "@/src/types/admin/dashboard-stats";
import { AnalyticsAreaChart } from "./analytics-area-chart";
import { DASHBOARD_CHART_CONFIG } from "../../utils/dashboard-chart-config";

interface DashboardChartsContainerProps {
  stats: DashboardStats;
}

export function DashboardChartsContainer({
  stats,
}: DashboardChartsContainerProps) {
  const { views, leads } = DASHBOARD_CHART_CONFIG;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      {/* Panel 1: Tráfico de GA4 */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm min-w-0">
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
            {views.title}
          </h4>
          <p className="text-xs text-slate-400 font-medium">
            Usuarios activos únicos interactuando con la plataforma (Últimos 7
            días).
          </p>
        </div>
        <AnalyticsAreaChart
          data={stats.viewsChart}
          dataKey="value"
          color={views.color}
          gradientId={views.gradientId}
        />
      </div>

      {/* Panel 2: Conversiones / Contactos de Base de Datos */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm min-w-0">
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
            {leads.title}
          </h4>
          <p className="text-xs text-slate-400 font-medium">
            Formularios de contacto recibidos en el landing institucional
            (Últimos 7 días).
          </p>
        </div>
        <AnalyticsAreaChart
          data={stats.chartData}
          dataKey="value"
          color={leads.color}
          gradientId={leads.gradientId}
        />
      </div>
    </div>
  );
}
