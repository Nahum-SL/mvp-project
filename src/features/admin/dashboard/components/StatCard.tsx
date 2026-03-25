// src/features/admin/dashboard/components/StatCard.tsx
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface StatProps {
  name: string;
  value: number | string;
  change: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  bgHover: string;
  link: string;
}

export const StatCard = ({ stat }: { stat: StatProps }) => {
  return (
    <Link href={stat.link}>
      <div
        className={`group relative bg-white p-7 rounded-[2.5rem] border ${stat.bgHover} border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
      >
        <div
          className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} opacity-20 rounded-bl-[5rem] -mr-8 -mt-8 transition-transform group-hover:scale-110`}
        />
        <div className="relative">
          <div
            className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner`}
          >
            <stat.icon size={28} />
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-[0.2em]">
                {stat.name}
              </p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                {stat.value}
              </p>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-1 rounded-lg ${stat.bg} ${stat.color}`}
            >
              {stat.change}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
