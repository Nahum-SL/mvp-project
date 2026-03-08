// Componente Sobre Nosotros
// src/components/ui/layout/home
import AboutSection from "../../components/ui/layout/home/AboutSection";

// Data del <AboutSection />
import { aboutUs } from "../../data/about-us";

// Header del Home
import AsesconHero from "../../components/ui/layout/AsesconHero";

// Post recientes
import { RecentPosts } from "../../components/sections/RecentPost";

// Skeletons
import { Suspense } from "react";
import { RecentPostSkeleton } from "../../components/skeletons/RecentPostSkeleton";
import { ContactForm } from "@/src/components/ui/layout/contacto/ContactForm";

export default function Home() {
  // Prueba

  return (
    <main>
      <div id="/home" className="relative z-10">
        {/* Header del Home */}
        <AsesconHero
          companyName="ASESCON"
          mainTitle="Arquitectos De Crecimiento Empresarial"
          subtitle="Brindamos el respaldo estratégico y la seguridad jurídica que su 
          empresa necesita para operar con total tranquilidad en el mercado actual."
          ctaText="Habla con nosotros"
        />

        {/* Seccion Sobre Nosotros */}
        <AboutSection data={aboutUs[0]} />

        {/* Post recientes */}
        <Suspense fallback={<RecentPostSkeleton />}>
          <RecentPosts />
        </Suspense>

        <div className="relative z-9">
          {/* Formulario de Contacto */}
          <section id="contacto" className="py-20 bg-gray-50">
            <ContactForm />
          </section>
        </div>
      </div>
      1
    </main>
  );
}
