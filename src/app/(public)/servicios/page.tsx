import ServiceDashboard from "@/src/features/containers/ServiceDashboard";
import ServiceHeader from "@/src/components/ui/layout/ServiceHeader";
import ServiceDashboardSkeleton from "@/src/components/skeletons/ServiceDashboardSkeleton";
import { Suspense } from "react";
import { Metadata } from "next";

interface Props {
  searchParams: { type?: string; pain?: string; q?: string };
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { type, pain } = await searchParams;

  let title = "Nuestros Servicios Especializados | Asescon";

  if (type && pain) {
    title = `Soluciones para ${type} en ${pain} | Asescon`;
  } else if (type) {
    title = `Servicios Contables para ${type} | Asescon`;
  }

  return {
    title,
    description:
      "Explora nuestro catálogo de soluciones contables, legales y tributarias diseñadas para potenciar tu empresa.",
    openGraph: {
      title,
      images: ["/servicios-hero.webp"], // Imagen genérica de la sección
    },
  };
}

export default function ServiciosPage({ searchParams }: Props) {
  return (
    <main>
      <ServiceHeader
        title="Expertos en Asesoría y Consultoría Empresarial"
        subtitle="Nuestras Soluciones"
        src="/servicios-hero.webp"
        alt="Equipo de asesores trabajando en oficina moderna"
      />
      <Suspense fallback={<ServiceDashboardSkeleton />}>
        <section className="bg-slate-50">
          <ServiceDashboard />
        </section>
      </Suspense>
    </main>
  );
}
