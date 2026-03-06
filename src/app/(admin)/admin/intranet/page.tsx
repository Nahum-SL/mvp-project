// app/(admin)/admin/intranet/page.tsx
import { cookies } from "next/headers";
import Link from "next/link";
import { Plus, LayoutGrid } from "lucide-react";
import { AdminLinkList } from "@/src/features/admin/intranet/components/AdminLinkList";

async function getIntranetLinks() {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  const res = await fetch(`${API_URL}/intranet/admin/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["intranet-links"] }, // Para revalidación bajo demanda
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function AdminIntranetPage() {
  const links = await getIntranetLinks();

  return (
    <main className="space-y-8">
      {/* Header de la Sección */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight">
              Gestión de Intranet
            </h1>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
              Configura los accesos directos para el personal
            </p>
          </div>
        </div>

        <Link
          href="/admin/intranet/crear"
          className="bg-white text-slate-900 hover:bg-blue-50 px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus size={18} /> Nuevo Acceso
        </Link>
      </header>

      {/* Lista de Gestión */}
      <section className="pb-10">
        <AdminLinkList links={links} />
      </section>
    </main>
  );
}
