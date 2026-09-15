// src/features/admin/dashboard/stats/utils/dashboard-kpi.ts
import { Users, FileText, Link2, Eye } from "lucide-react";
import type { DashboardStats } from "@/src/types/admin/dashboard-stats";
import { KpiItemConfig } from "@/src/types/admin/dashboard-stats";

export function getKpiItemsConfig(stats: DashboardStats): KpiItemConfig[] {
  return [
    {
      title: "Vistas Totales (30d)",
      value: stats.views,
      icon: Eye,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      link: "/analytics/views",
    },
    {
      title: "Leads Registrados",
      value: stats.leads,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      link: "/admin/contacto",
    },
    {
      title: "Artículos del Blog",
      value: stats.posts,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
      link: "/admin/blog",
    },
    {
      title: "Enlaces Utilitarios",
      value: stats.links,
      icon: Link2,
      color: "text-purple-600",
      bg: "bg-purple-50",
      link: "/admin/intranet",
    },
  ];
}
