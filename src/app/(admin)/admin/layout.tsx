import { Sidebar } from "@/src/features/admin/components/Sidebar";
import AdminHeader from "@/src/features/admin/components/AdminHeader";

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
        <AdminHeader />

        {/* Contenido Dinámico */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
