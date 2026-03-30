import { AuditHeader } from "@/src/features/admin/audit/components/AuditHeader";
import { AuditCardStats } from "@/src/features/admin/audit/components/AuditStats";
import { LogsTable } from "@/src/features/admin/audit/components/LogsTable";
import { getAuditLogs, getAuditStats } from "@/src/features/admin/audit/action";

export default async function AuditPage() {
  // Ejecutamos ambas peticiones en paralelo para optimizar carga
  const [stats, logs] = await Promise.all([
    getAuditStats(),
    getAuditLogs({ limit: "25" }),
  ]);

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <AuditHeader />

      <AuditCardStats stats={stats} />

      <section className="bg-white rounded-[2.5rem] p-2 border border-slate-100 shadow-sm">
        <div className="p-6 flex items-center justify-between">
          <h3 className="text-sm text-slate-900 uppercase tracking-tighter flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Flujo de Actividad Reciente
          </h3>
        </div>

        <LogsTable logs={logs} />
      </section>
    </main>
  );
}
