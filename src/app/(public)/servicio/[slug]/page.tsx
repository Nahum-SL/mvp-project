import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/src/features/admin/servicio/action";

// Subcomponentes
import ServiceSlugHero from "@/src/features/public-web/servicio/ServiceSlugHero";
import ServicePainPoints from "@/src/features/public-web/servicio/slug/components/ServicePainPoints";
import ServiceBenefits from "@/src/features/public-web/servicio/slug/components/ServiceBenefits";
import ServiceProcess from "@/src/features/public-web/servicio/slug/components/ServicesProcess";
import ServiceTrust from "@/src/features/public-web/servicio/slug/components/ServiceTrust";
import ServiceCTA from "@/src/features/public-web/servicio/slug/components/ServiceCTA";
import ServiceContent from "@/src/features/public-web/servicio/components/ServiceContent";
import ServiceContactSidebar from "@/src/features/public-web/servicio/components/ServiceContactSidebar";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  return {
    title: `${service.title} | ASESCON`,
    description: service.description.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}

export default async function ServicioDetallePage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <main className="bg-white">
      <ServiceSlugHero service={service} />

      <ServicePainPoints painPoints={service.painPoints} />

      <ServiceBenefits features={service.features} />

      <ServiceProcess />

      <ServiceTrust />

      <ServiceCTA serviceTitle={service.title} />

    </main>
  );
}