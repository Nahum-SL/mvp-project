// src/app/(admin)/admin/page.tsx
import { Users, FileText, Link as LinkIcon, Eye, Home } from "lucide-react";
import SectionHeader from "@/src/features/admin/components/SectionHeader";
import { StatCard } from "@/src/features/admin/_dashboard/components/StatCard";
import { QuickActions } from "@/src/features/admin/_dashboard/components/QuickActions";

export default async function AdminDashboardPage() {

  const stats = [
    {
      name: "Prospectos",
      value: 10,
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      bgHover: "hover:border-blue-400",
      link: "/admin/contacto",
    },
    {
      name: "Artículos",
      value: 10,
      change: "En línea",
      icon: FileText,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      bgHover: "hover:border-emerald-400",
      link: "/admin/blog",
    },
    {
      name: "Intranet",
      value: 13,
      change: "Activos",
      icon: LinkIcon,
      color: "text-amber-600",
      bg: "bg-amber-50",
      bgHover: "hover:border-amber-400",
      link: "/admin/intranet",
    },
    {
      name: "Visitas",
      value: 12030,
      change: "+5.4%",
      icon: Eye,
      color: "text-violet-600",
      bg: "bg-violet-50",
      bgHover: "hover:border-violet-400",
      link: "#",
    },
  ];

  return (
    <div className="space-y-10 pb-10">
      <SectionHeader 
      title="Panel Principal"
      subtitle="Métricas clave de ASESCON en tiempo real"
      icon={<Home size={32}/>}
      variant="flat"
      />

      {/* Grid de Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico principal */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-extrabold text-slate-900 uppercase text-lg tracking-tight">
              Crecimiento Mensual
            </h3>
            <select className="text-xs font-bold bg-slate-50 border-none rounded-xl px-4 py-2 outline-none">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
            </select>
          </div>
          {/* <div className="h-64 w-full">
            <DashboardCharts data={data.chartData || []} />
          </div> */}
        </div>

        {/* Acciones */}
        <div className="flex flex-col gap-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
