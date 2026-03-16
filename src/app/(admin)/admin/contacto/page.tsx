// app/(admin)/admin/contacto/page.tsx
import { MessageSquareQuote, Users } from "lucide-react";
import { LeadsTable } from "@/src/features/admin/contacto/components/LeadsTable";
import { Suspense } from "react";
import { LeadsTableSkeleton } from "@/src/features/admin/contacto/components/LeadsTableSkeleton";
import { getLeads } from "@/src/features/admin/contacto/action";

export default async function AdminContactoPage() {
  const leads = await getLeads();

  return (
    <main className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
            <MessageSquareQuote size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-slate-900">
              Gestión de Leads
            </h1>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
              Solicitudes de asesoría y nuevos clientes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
          <Users size={18} className="text-slate-400" />
          <span className="text-xs font-black italic uppercase text-slate-600">
            Total: {leads.length} Prospectos
          </span>
        </div>
      </header>

      <Suspense fallback={<LeadsTableSkeleton />}>
        <LeadsTable leads={leads} />
      </Suspense>
    </main>
  );
}
