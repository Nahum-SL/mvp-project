import { Metadata } from "next";
import { Suspense } from "react";
// Componentes
import { ServicesView } from "@/src/features/public/servicio/views/services-view";

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

export default function ServiciosPage() {
  return (
    <main>
      <Suspense fallback={<div className="bg-slate-950"/>}>
        <ServicesView />
      </Suspense>
    </main>
  );
}
