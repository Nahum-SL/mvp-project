// src/app/(public)/page.tsx
import AsesconHero from "../../components/ui/layout/AsesconHero";
import { RecentPostsSection } from "@/src/components/sections/RecentPostSection";
import { Suspense } from "react";
import { RecentPostSkeleton } from "../../components/skeletons/RecentPostSkeleton";
import { ContactForm } from "@/src/components/ui/layout/contacto/ContactForm";
import { SectionHeaderHome } from "@/src/components/ui/layout/contacto/SectionHeaderHome";
import { StatsSection } from "@/src/features/public-pages/nosotros/components/StatsSection";
import { FeaturedServices } from "@/src/features/public-pages/home/components/FeaturedServices";

export default function Home() {
  return (
    // Cambiamos el fondo a blanco y el texto base a slate-900
    <main className="bg-white text-slate-900">
      <div className="relative z-10">
        {/* 1. HERO: Manteniendo el video pero con un overlay que suavice la transición al blanco */}
        <section id="home">
          <AsesconHero
            mainTitle="Impulsamos el crecimiento de su empresa"
            subtitle="Respaldo estratégico y seguridad jurídica para una operación con total tranquilidad."
            ctaText="Iniciar Consultoría"
            // image="/hero-background.webm"
          />
        </section>

        {/* 2. SERVICIOS DESTACADOS (Light Mode + Video Hover) */}
        <section className="bg-slate-50">
          <FeaturedServices />
        </section>

        {/* 3. STATS: Fondo blanco con acentos verdes y azules */}
        <section className="py-16 bg-white border-y border-slate-100">
          <StatsSection />
        </section>
        
        <Suspense fallback={<RecentPostSkeleton />}>
          <RecentPostsSection />
        </Suspense>

        {/* 5. CONTACTO: Usando el amarillo y verde para cercanía */}
        <div className="relative z-9 bg-slate-50 mt-15">
          <SectionHeaderHome
            title="¿Listo para comenzar?"
            description="Únete a las empresas que ya han transformado su gestión con el respaldo
            estratégico de ASESCON"
            lineColor="green"
          />
          <section id="contacto" className="py-20">
            <div className="container mx-auto px-6">
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
