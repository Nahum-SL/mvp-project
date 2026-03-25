// app/(admin)/admin/intranet/page.tsx
import Link from "next/link";
import { Plus, LayoutGrid } from "lucide-react";
import { AdminLinkList } from "@/src/features/admin/intranet/components/AdminLinkList";
import { Suspense } from "react";
import { LinkListSkeleton } from "@/src/features/admin/intranet/components/LinkListSkeleton";
import { getIntranetLinks } from "@/src/features/admin/intranet/action";
import SectionHeader from "@/src/features/admin/components/SectionHeader";

export default async function AdminIntranetPage() {
  const links = await getIntranetLinks();

  return (
    <main className="space-y-10 pb-20">
      {/* Header de la Sección */}
      <SectionHeader
        title="Gestión de Intranet"
        subtitle="Configura los accesos directos para el personal"
        icon={<LayoutGrid size={32}/>}
        variant="dark"
        actions={
          <Link
            href="/admin/intranet/crear"
            className="bg-white text-slate-900 hover:bg-blue-50 px-6 py-4 rounded-2xl font-extrabold uppercase text-xs tracking-widest transition-all flex items-center gap-2 shadow-lg"
          >
            <Plus size={18} /> Nuevo Acceso
          </Link>
        }
      />
      
      {/* Lista de Gestión */}
      <section className="pb-10">
        <Suspense fallback={<LinkListSkeleton />}>
          <AdminLinkList links={links} />
        </Suspense>
      </section>
    </main>
  );
}
