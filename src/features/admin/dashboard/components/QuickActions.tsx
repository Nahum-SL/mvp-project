// src/features/admin/dashboard/components/QuickActions.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const QuickActions = () => {
  const actions = [
    { label: "Gestionar Clientes", href: "/admin/contacto" },
    { label: "Reporte de Leads", href: "/admin" },
    { label: "Ver la Intranet", href: "/admin/intranet" },
  ];

  return (
    <div className="flex-1 bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-slate-300">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <ArrowUpRight size={120} />
      </div>
      <h3 className="font-extrabold uppercase text-xl mb-6 leading-tight">
        Acciones <br /> Rápidas
      </h3>
      <div className="space-y-4 relative z-10">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center justify-center w-full py-4 
            bg-white/10 hover:bg-white text-white hover:text-slate-900 
            rounded-2xl text-[10px] font-extrabold uppercase tracking-widest 
            transition-all border border-white/10"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
