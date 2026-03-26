import ServiceDashboard from "@/src/features/containers/ServiceDashboard";
import ServiceHero from "@/src/components/ui/layout/ServiceHero";
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
    description: `Constitución de Empresas. Ofrecemos el servicio de Constitución de Empresas, 
      que le permitirá constituir su empresa de manera efectiva y ágil.`,
    openGraph: {
      title,
      images: ["/servicios-hero.webp"], // Imagen genérica de la sección
    },
  };
}

// src/app/(public)/servicio/page.tsx

export default function ServiciosPage() {
  return (
    <main>
      <ServiceHero
        title="Nuestros Servicios"
        subtitle="Soluciones estratégicas diseñadas para blindar y potenciar su organización en el mercado peruano."
        videoPoster="/servicios-hero.webp"
      />
      <Suspense fallback={<ServiceDashboardSkeleton />}>
        {/* Agregué un padding superior para que el Dashboard no choque con el fade del Hero */}
        <section className="bg-slate-50 pt-10">
          <ServiceDashboard />
        </section>
      </Suspense>
    </main>
  );
}
