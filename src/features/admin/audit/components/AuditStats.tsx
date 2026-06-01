// src/features/admin/audit/components/AuditStats.tsx
import { ShieldCheck, ShieldAlert, Activity } from "lucide-react";
import { AuditStats } from "@/src/types/audit/audit-types";



export const AuditCardStats = ({ stats }: { stats: AuditStats }) => {
  const cards = [
    {
      title: "Total Eventos",
      value: stats.total,
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Fallos Detectados",
      value: stats.errors,
      icon: ShieldAlert,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Actividad 24h",
      value: stats.last24h,
      icon: ShieldCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];


  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5"
        >
          <div className={`p-4 rounded-2xl ${card.bg} ${card.color}`}>
            <card.icon size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              {card.title}
            </p>
            <p className="text-2xl text-slate-900">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
