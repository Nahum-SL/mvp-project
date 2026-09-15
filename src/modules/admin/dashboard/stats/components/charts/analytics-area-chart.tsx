"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { DashboardChartItem } from "@/src/types/admin/dashboard-stats";

interface AnalyticsAreaChartProps {
  data: DashboardChartItem[];
  dataKey: "value";
  color: string;
  gradientId: string;
}

export function AnalyticsAreaChart({
  data,
  dataKey,
  color,
  gradientId,
}: AnalyticsAreaChartProps) {
  return (
    <div className="w-full h-72 mt-4 font-sans text-[11px] font-semibold min-w-0 relative">
      <ResponsiveContainer width="100%" height="100%" aspect={2} minWidth={0} minHeight={undefined}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            stroke="#94a3b8"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            stroke="#94a3b8"
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              borderRadius: "1rem",
              border: "none",
              color: "#fff",
              fontSize: "11px",
            }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2.5}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
