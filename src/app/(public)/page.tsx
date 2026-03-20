// src/app/(public)/page.tsx
import AsesconHero from "../../components/ui/layout/AsesconHero";
import { RecentPostsSection } from "@/src/components/sections/RecentPostSection";
import { Suspense } from "react";
import { RecentPostSkeleton } from "../../components/skeletons/RecentPostSkeleton";
import { ContactForm } from "@/src/components/ui/layout/contacto/ContactForm";
import { SectionHeaderHome } from "@/src/components/ui/layout/contacto/SectionHeaderHome";
import { FeaturedServices } from "@/src/features/public-pages/home/components/FeaturedServices";
import { ValueProposition } from "@/src/features/public-pages/home/components/ValueProposition";

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      <div className="relative z-10">
        
        {/* 1. HERO: Impacto visual inicial */}
        <section id="home">
          <AsesconHero
            mainTitle="Impulsamos el crecimiento de su empresa"
            subtitle="Respaldo estratégico y seguridad jurídica para una operación con total tranquilidad."
            ctaText="Iniciar Consultoría"
            image="/constitucion-de-empresas.webp"
          />
        </section>

        {/* 2. SERVICIOS POPULARES: El "catálogo" de soluciones */}
        <section className="bg-slate-50">
          <FeaturedServices isLoading={false}/>
        </section>

        {/* Usamos colores Blanco, Azul y acentos Amarillos */}
        <ValueProposition />

        {/* 4. CONTENIDO: Posts recientes para SEO y autoridad */}
        <div className="bg-slate-50 py-24">
          <Suspense fallback={<RecentPostSkeleton />}>
            <RecentPostsSection />
          </Suspense>
        </div>

        {/* 5. CONTACTO: Cierre de embudo */}
        <div className="relative z-9 bg-white">
          <SectionHeaderHome
            title="¿Listo para comenzar?"
            description="Únete a las empresas que ya han transformado su gestión con el respaldo estratégico de ASESCON"
            lineColor="green"
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