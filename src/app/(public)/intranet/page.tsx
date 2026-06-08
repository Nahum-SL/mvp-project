import { Metadata } from "next";
import { Suspense } from "react";
import IntranetLinkView from "@/src/features/public/intranet/views/intranet-link-view";
// Api
import { getPublicIntranet } from "@/src/lib/actions/lib/intranet.service";

export const metadata: Metadata = {
  title: "Portal de Clientes",
  description:
    "Accede a nuestros sistemas de gestión y recursos exclusivos para clientes de ASESCON.",
};

export default async function IntranetPage() {
  const links = await getPublicIntranet();

  return (
    <main className="bg-slate-950">
      <Suspense fallback={<div>Cargando...</div>}>
        <IntranetLinkView initialLinks={links} />
      </Suspense>
    </main>
  );
}
