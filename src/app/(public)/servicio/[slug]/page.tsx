import { Metadata } from "next";
import { notFound } from "next/navigation";
// Views
import { ServiceSlugView } from "@/src/modules/public/servicio/slug/views/service-slug-view";
// hooks
import { getPublicServiceBySlug } from "@/src/modules/public/servicio/api/servicio-public.query";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublicServiceBySlug(slug);
  if (!service) notFound();
  return {
    title: `${service.title} | ASESCON`,
    description: service.description,
  };
}

export default async function ServicioDetallePage({ params }: Props) {
  const { slug } = await params;
  const service = await getPublicServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main className="bg-white">
      <ServiceSlugView service={service} />
    </main>
  );
}
