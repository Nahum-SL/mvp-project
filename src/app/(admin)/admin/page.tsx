// src/app/(admin)/admin/page.tsx
import Link from "next/link";
import {
  Users,
  FileText,
  Link as LinkIcon,
  Eye,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { getDashboardStats } from "@/src/features/admin/dashboard/action";
import { DashboardCharts } from "@/src/features/admin/dashboard/components/DashboardStast";

export default async function AdminDashboardPage() {
  const data = await getDashboardStats();

  const stats = [
    {
      name: "Prospectos",
      value: data.leads,
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      bgHover: "hover:border-blue-400",
      link: "/admin/contacto",
    },
    {
      name: "Artículos",
      value: data.posts,
      change: "En línea",
      icon: FileText,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      bgHover: "hover:border-emerald-400",
      link: "/admin/blog",
    },
    {
      name: "Intranet",
      value: data.links,
      change: "Activos",
      icon: LinkIcon,
      color: "text-amber-600",
      bg: "bg-amber-50",
      bgHover: "hover:border-amber-400",
      link: "/admin/intranet",
    },
    {
      name: "Visitas",
      value: data.views,
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
      {/* Header con Neomorfismo sutil */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
            Panel <span className="text-blue-600">Principal</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Métricas clave de{" "}
            <span className="text-slate-900 font-bold">ASESCON</span> en tiempo
            real.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2">
            <Plus size={14} /> Nuevo Post
          </button>
        </div>
      </header>

      {/* Grid de Stats con Hover Effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.link} href={stat.link}>
            <div
              key={stat.name}
              className={`group relative bg-white p-7 rounded-[2.5rem] border ${stat.bgHover}
             border-slate-100 shadow-sm hover:shadow-2xl 
            hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
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
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                      {stat.name}
                    </p>
                    <p className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
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
        ))}
      </div>

      {/* Sección Inferior: Gráficos y Acción */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-slate-900 uppercase italic text-lg tracking-tight">
              Crecimiento Mensual
            </h3>
            <select className="text-xs font-bold bg-slate-50 border-none rounded-xl px-4 py-2 outline-none">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
            </select>
          </div>
          <div className="h-64 w-full flex items-end gap-3 px-4">
            {/* Simulación de gráfico elegante */}
            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-slate-50 rounded-t-xl relative group"
              >
                <div
                  style={{ height: `${h}%` }}
                  className="absolute bottom-0 w-full bg-blue-500 rounded-t-xl group-hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-slate-300">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ArrowUpRight size={120} />
            </div>
            <h3 className="font-black uppercase italic text-xl mb-6 leading-tight">
              Acciones
              <br />
              Rápidas
            </h3>
            <div className="space-y-4 relative z-10">
              <button className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10">
                Gestionar Usuarios
              </button>
              <button className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10">
                Reporte de Leads
              </button>
              <Link
                href="/intranet"
                className="flex items-center justify-center w-full py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
              >
                Ver la Intranet
              </Link>
            </div>
          </div>
        </div>
      </div>
      <DashboardCharts />
    </div>
  );
}
