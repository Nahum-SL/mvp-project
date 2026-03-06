// src/features/admin/dashboard/components/DashboardCharts.tsx
"use client";

import { motion } from "framer-motion";

interface ChartData {
  day: string;
  value: number;
}

const mockData: ChartData[] = [
  { day: "Lun", value: 45 },
  { day: "Mar", value: 70 },
  { day: "Mie", value: 55 },
  { day: "Jue", value: 90 },
  { day: "Vie", value: 65 },
  { day: "Sab", value: 40 },
  { day: "Dom", value: 85 },
];

export const DashboardCharts = () => {
  return (
    <div className="w-full">
      {/* Header del Gráfico */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">
            Rendimiento Semanal
          </p>
          <h3 className="font-black text-slate-900 uppercase italic text-2xl tracking-tighter">
            Tráfico de Leads
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            En Vivo
          </span>
        </div>
      </div>

      {/* Contenedor del Gráfico */}
      <div className="relative h-64 flex items-end gap-3 sm:gap-6 px-2">
        {/* Líneas de Guía Horizontales */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full border-t border-slate-50" />
          ))}
        </div>

        {/* Barras Animadas */}
        {mockData.map((item, index) => (
          <div
            key={item.day}
            className="flex-1 flex flex-col items-center gap-4 group relative z-10"
          >
            {/* Tooltip al hacer hover */}
            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none">
              <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl">
                {item.value} leads
              </div>
              <div className="w-2 h-2 bg-slate-900 rotate-45 mx-auto -mt-1" />
            </div>

            {/* Barra */}
            <div className="w-full bg-slate-50 rounded-2xl relative overflow-hidden h-full flex items-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${item.value}%` }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="w-full bg-linear-to-t from-blue-600 to-blue-400 rounded-t-xl shadow-lg shadow-blue-100 group-hover:to-blue-300 transition-colors"
              />
            </div>

            {/* Etiqueta del día */}
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
