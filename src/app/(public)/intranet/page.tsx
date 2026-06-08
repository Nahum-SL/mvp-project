import { Metadata } from "next";
import { Suspense } from "react";
import IntranetLinkView from "@/src/features/public/intranet/views/intranet-link-view";
// Api
import { getPublicIntranetLinks } from "@/src/features/public/intranet/api/intranet-public.query";

export const metadata: Metadata = {
  title: "Portal de Clientes",
  description:
    "Accede a nuestros sistemas de gestión y recursos exclusivos para clientes de ASESCON.",
};

export default async function IntranetPage() {
  const links = await getPublicIntranetLinks();

  return (
    <main className="bg-slate-950">
      <Suspense fallback={<div className="bg-slate-950"/>}>
        <IntranetLinkView initialLinks={links} />
      </Suspense>
    </main>
  );
}
