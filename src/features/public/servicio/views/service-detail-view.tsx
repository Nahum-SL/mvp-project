"use client";

// Componentes
import { usePublicServicesBySlug } from "../hooks/use-public-services";
import { ServiceContent } from "../components/service-detail/service-content";

interface ServiceDetailViewProps {
  slug: string;
}

export function ServiceDetailView({ slug }: ServiceDetailViewProps) {
  const { data: service, isLoading, isError } = usePublicServicesBySlug(slug);

  if (isLoading) {
    return (
      <div className="container py-20 text-center">Cargando servicio...</div>
    );
  }

  if (isError || !service) {
    return (
      <div className="container py-20 text-center">Servicio no encontrado.</div>
    );
  }

  return <ServiceContent service={service} />;
}
