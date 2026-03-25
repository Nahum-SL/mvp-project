// app/(admin)/admin/contacto/page.tsx
import { LeadsTable } from "@/src/features/admin/contacto/components/LeadsTable";
import { Suspense } from "react";
import { LeadsTableSkeleton } from "@/src/features/admin/contacto/components/LeadsTableSkeleton";
import { getLeads } from "@/src/features/admin/contacto/action";
import SectionHeader from "@/src/features/admin/components/SectionHeader";
import { Book } from "lucide-react";

export default async function AdminContactoPage() {
  const leads = await getLeads();

  return (
    <main className="space-y-10 pb-20">
      <SectionHeader 
      title="Gestion de leads"
      subtitle="Solicitudes de asesoría y nuevos clientes"
      icon={<Book />}
      variant="flat"
      />
      <Suspense fallback={<LeadsTableSkeleton />}>
        <LeadsTable leads={leads} />
      </Suspense>

    </main>
  );
}
