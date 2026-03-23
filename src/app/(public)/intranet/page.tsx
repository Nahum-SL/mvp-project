import { Suspense } from "react";
import IntranetHero from "@/src/components/ui/layout/IntranetHero";
import IntranetDashboard from "@/src/components/ui/layout/intranet/IntranetDashboard";
import { IntranetSkeleton } from "@/src/components/ui/layout/intranet/IntranetSkeleton";
import { getLinks } from "@/src/features/admin/intranet/action";

export default async function IntranetPage() {
  const { links } = await getLinks();

  return (
    <main className="bg-slate-950">
      <IntranetHero
        title="Portal Asescon"
        subtitle="Acceso a servicios digitales y sistemas de gestión"
      />

      {/* Pasamos los links reales al componente cliente */}
      <Suspense fallback={<IntranetSkeleton />}>
        <IntranetDashboard initialLinks={links} />
      </Suspense>
    </main>
  );
}
