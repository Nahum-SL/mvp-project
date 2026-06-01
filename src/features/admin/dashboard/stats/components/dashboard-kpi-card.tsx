import { cn } from "@/src/lib/utils";
import Link from "next/link";
// types
import { KpiItemConfig } from "@/src/types/admin/dashboard-stats";

export function DashboardKpiCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
  link,
}: KpiItemConfig) {
  return (
    <Link href={link}>
      <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all duration-300">
        <div
          className={cn(
            "p-4 rounded-2xl",
            bg,
            color,
            "transition-transform group-hover:scale-105 duration-300",
          )}
        >
          <Icon size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">
            {title}
          </p>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            {value}
          </p>
        </div>
      </div>
    </Link>
  );
}
