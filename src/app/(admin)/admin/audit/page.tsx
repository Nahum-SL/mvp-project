import { AuditAdminView } from "@/src/modules/admin/audit/views/audit-admin-view";

export default async function AuditPage() {

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <section className="bg-white rounded-[2.5rem] p-2 border border-slate-100 shadow-sm">
        <div className="p-6 flex items-center justify-between">
          <h3 className="text-sm text-slate-900 uppercase tracking-tighter flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Flujo de Actividad Reciente
          </h3>
        </div>
        <AuditAdminView />
      </section>
    </main>
  );
}
