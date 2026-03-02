import { Users, FileText, Link as LinkIcon, Eye } from "lucide-react";

export default function AdminDashboardPage() {
  // Estos datos vendrán de tu API de NestJS
  const stats = [
    {
      name: "Postulantes Nuevos",
      value: "12",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      name: "Artículos Blog",
      value: "45",
      icon: FileText,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      name: "Links Intranet",
      value: "8",
      icon: LinkIcon,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      name: "Visitas Mes",
      value: "1.2k",
      icon: Eye,
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">
          Bienvenido, <span className="text-blue-600 not-italic">Admin</span>
        </h2>
        <p className="text-slate-500 text-sm">
          Resumen de actividad en la plataforma ASESCON.
        </p>
      </div>

      {/* Grid de Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}
            >
              <stat.icon size={24} />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              {stat.name}
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Espacio para Gráficos o Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 min-h-75">
          <h3 className="font-bold text-slate-900 mb-4">Actividad del Blog</h3>
          <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-300 italic text-sm">
            Gráfico de visualizaciones (Próximamente)
          </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
          <h3 className="font-bold mb-4">Acceso Rápido</h3>
          <div className="space-y-3">
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors">
              Crear nuevo Post
            </button>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors">
              Configurar Intranet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
