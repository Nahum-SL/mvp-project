import { Sidebar } from "@/src/features/admin/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Fijo */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header de navegación interna */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-sm font-medium text-slate-500 uppercase tracking-widest">
            Panel de Control
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-900 italic">
              ADMIN_ASESCON
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-600" />
          </div>
        </header>

        {/* Contenido Dinámico */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
