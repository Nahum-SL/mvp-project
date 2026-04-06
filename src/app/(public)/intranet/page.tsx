import { Suspense } from "react";
import IntranetHero from "@/src/features/public-web/intranet/IntranetHero";
import IntranetDashboard from "@/src/features/public-web/intranet/components/IntranetDashboard";
import { IntranetSkeleton } from "@/src/components/skeletons/IntranetSkeleton";
import { getLinks } from "@/src/features/admin/intranet/action";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal de Clientes",
  description:
    "Accede a nuestros sistemas de gestión y recursos exclusivos para clientes de ASESCON.",
};

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
