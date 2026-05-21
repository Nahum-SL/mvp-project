// src/features/admin/dashboard/components/DashboardCharts.tsx
"use client";

import { motion } from "framer-motion";

interface ChartData {
  day: string;
  value: number;
}

export const DashboardCharts = ({ data }: { data: ChartData[] }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="w-full">
      {/* Header del Gráfico */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-1">
            Rendimiento Semanal
          </p>
          <h3 className="font-extrabold text-slate-900 uppercase text-2xl tracking-tighter">
            Tráfico de Leads
          </h3>
        </div>

        <div
          className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl 
        border border-slate-100"
        >
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            En Vivo
          </span>
        </div>
      </div>

      {/* Contenedor del Gráfico */}
      <div className="relative h-64 flex items-end gap-3 sm:gap-6 px-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-4 group relative z-10"
          >
            {/* Tooltip */}
            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
                {item.value} leads
              </div>
            </div>

            {/* Barra con altura proporcional */}
            <div className="w-full bg-slate-50 rounded-2xl relative overflow-hidden h-full flex items-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="w-full bg-linear-to-t from-blue-600 to-blue-400 rounded-t-xl shadow-lg shadow-blue-100"
              />
            </div>

            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
