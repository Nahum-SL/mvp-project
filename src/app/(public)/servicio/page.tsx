import { Metadata } from "next";
// Componentes
import { ServicesView } from "@/src/modules/public/servicio/views/services-view";
import { getPublicServices } from "@/src/modules/public/servicio/api/servicio-public.query";

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
      images: "/servicios-hero.webp", // Imagen genérica de la sección
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiciosPage({params}: PageProps) {
  const { slug } = await params;
  const service = await getPublicServices();

  return (
    <main>
      <ServicesView />
    </main>
  );
}
