// src/app/(public)/servicios/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/src/features/admin/servicio/action";
import ServiceSlugHero from "@/src/components/ui/layout/ServiceSlugHero";
import ServiceContent from "@/src/features/servicios/components/ServiceContent";
import ServiceContactSidebar from "@/src/features/servicios/components/ServiceContactSidebar";

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
    <main className="min-h-screen bg-white">
      {/* Hero Sección */}
      <ServiceSlugHero service={service} />

      {/* Cuerpo de la Página */}
      <section className="relative z-20 -mt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contenido Principal (Izquierda) */}
            <div className="lg:col-span-8">
              <ServiceContent service={service} />
            </div>

            {/* Sidebar de Acción (Derecha) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
              <ServiceContactSidebar serviceTitle={service.title} />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
