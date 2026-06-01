import { LucideIcon } from "lucide-react";

export interface DashboardChartItem {
  day: string;
  value: number;
}

export interface DashboardStats {
  leads: number;
  posts: number;
  links: number;
  views: string;
  chartData: DashboardChartItem[];
  viewsChart: DashboardChartItem[];
}

export interface KpiItemConfig {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
  bgHover?: string;
  link: string;
}
