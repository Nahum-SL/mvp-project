import { Metadata } from "next";
import IntranetLinkView from "@/src/modules/public/intranet/views/intranet-link-view";
// Api
import { getPublicIntranetLinks } from "@/src/modules/public/intranet/api/intranet-public.query";

export const metadata: Metadata = {
  title: "Portal de Clientes",
  description:
    "Accede a nuestros sistemas de gestión y recursos exclusivos para clientes de ASESCON.",
};

export default async function IntranetPage() {
  const links = await getPublicIntranetLinks();

  return (
    <main className="bg-slate-950">
      <IntranetLinkView initialLinks={links} />
    </main>
  );
}
