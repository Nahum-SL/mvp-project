// src/app/(public)/page.tsx
// Para los Skelotons
import { Suspense } from "react";
// Para generar la metadata dinámica
import { Metadata } from "next";
// Componentes de la página
import AsesconHero from "@/src/features/public-web/home/AsesconHero";
import { RecentPostSkeleton } from "../../components/skeletons/RecentPostSkeleton";
import { ContactForm } from "@/src/features/public-web/contacto/components/ContactForm";
import { FeaturedServices } from "@/src/features/public-web/home/components/FeaturedServices";
import { ValueProposition } from "@/src/features/public-web/home/components/ValueProposition";
import { RecentPostsSection } from "@/src/components/sections/RecentPostSection";
// Componente header
import { SectionHeaderHome } from "@/src/components/ui/layout/contacto/SectionHeaderHome";

export const metadata: Metadata = {
  title: {
    template: "%s | Asescon",
    default: "Asesoría Empresarial y Contable en Perú | ASESCON",
  },
  description: `Nuestra firma está conformada por un grupo humano de primer nivel 
  con más de 30 años de experiencia en el rubro de 
  Asesoramiento Contable, Laboral, Tributario y Financiero, 
  experiencia que ponemos a su servicio para que usted y su empresa cumplan sus objetivos.
  `,
  keywords: [
    "contabilidad",
    "asesoría tributaria",
    "Perú",
    "gestión empresarial",
  ],
  metadataBase: new URL("https://asescon.pe"),
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      <div className="relative z-15">
        {/* 1. HERO: Impacto visual inicial */}
        <AsesconHero
          mainTitle="Impulsamos el crecimiento de su empresa"
          subtitle="Respaldo estratégico y seguridad jurídica para una operación con total tranquilidad."
          ctaText="Hablar con un asesor"
        />

        {/* 2. SERVICIOS POPULARES: El "catálogo" de soluciones */}
        <section className="bg-slate-50 z-14">
          <FeaturedServices />
        </section>

        {/* Usamos colores Blanco, Azul y acentos Amarillos */}
        <ValueProposition />

        {/* 4. CONTENIDO: Posts recientes para SEO y autoridad */}
        <Suspense fallback={<RecentPostSkeleton />}>
          <RecentPostsSection />
        </Suspense>

        {/* 5. CONTACTO: Cierre de embudo */}
        <div className="relative z-9 bg-white">
          <SectionHeaderHome
            title="¿Listo para comenzar?"
            description="Únete a las empresas que ya han transformado su gestión con el respaldo estratégico de ASESCON"
            lineColor="green"
            mode="light"
          />
          <section id="contacto" className="pb-20">
            <div className="container mx-auto px-6">
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
