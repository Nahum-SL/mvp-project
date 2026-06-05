"use client";

import { ResponsiveContainer, PieChart, Pie } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

interface MetricDonutChartProps {
  label: string;
  value: number;
  variant: "impact" | "effort" | "risk";
}

const VARIANT_CONFIG = {
  impact: { color: "#10b981", bg: "#f0fdf4" }, // Emerald 500
  effort: { color: "#f59e0b", bg: "#fffbeb" }, // Amber 500
  risk: { color: "#f43f5e", bg: "#fff1f2" }, // Rose 500
};

export function MetricDonutChart({
  label,
  value,
  variant,
}: MetricDonutChartProps) {
  const config = VARIANT_CONFIG[variant];
  const safeValue = Math.min(Math.max(value, 0), 100);

  // CAPA 1: Data estática para el fondo gris del donut
  const backgroundData = [{ value: 100, fill: "#e2e8f0" }];

  // CAPA 2: Data para la barra de progreso activa
  // Pasamos el color en la propiedad 'fill' directamente dentro del objeto
  const progressData = [
    { name: "Progress", value: safeValue, fill: config.color },
    { name: "Remainder", value: 100 - safeValue, fill: "transparent" },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-1 w-20">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <PieChart>
            <Pie
              data={backgroundData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={22}
              outerRadius={28}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              isAnimationActive={false}
            />

            {/* Capa 2: Barra de Progreso (Sin Cells) */}
            <Pie
              data={progressData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={22}
              outerRadius={28}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              cornerRadius={4}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Texto en el centro */}
        <div className="absolute inset-0 flex items-center justify-center flex-col select-none">
          <span className="text-xs font-black text-slate-800 tracking-tighter">
            {safeValue}%
          </span>
        </div>
      </div>

      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center block truncate w-full">
        {label}
      </span>
    </div>
  );
}
