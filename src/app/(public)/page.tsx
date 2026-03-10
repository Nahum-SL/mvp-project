// Componente Sobre Nosotros
// src/components/ui/layout/home
import AboutSection from "../../components/ui/layout/home/AboutSection";

// Data del <AboutSection />
import { aboutUs } from "../../data/about-us";

// Header del Home
import AsesconHero from "../../components/ui/layout/AsesconHero";

// Post recientes
import { RecentPostsSection } from "@/src/components/sections/RecentPostSection";

// Skeletons
import { Suspense } from "react";
import { RecentPostSkeleton } from "../../components/skeletons/RecentPostSkeleton";

import { ContactForm } from "@/src/components/ui/layout/contacto/ContactForm";
import { ContactHeader } from "@/src/components/ui/layout/contacto/ContacHeader";

export default function Home() {
  // Prueba

  return (
    <main>
      <div className="relative z-10">
        {/* Header del Home */}
        <section id="home">
          <AsesconHero
            mainTitle="Impulsamos el crecimiento de su empresa"
            subtitle="Brindamos respaldo estratégico y seguridad jurídica para que su empresa opere con total tranquilidad."
            ctaText="Habla con nosotros"
            image="/constitucion-de-empresas.webp"
          />
        </section>

        {/* Seccion Sobre Nosotros */}
        <AboutSection data={aboutUs[0]} />

        {/* Post recientes */}
        <Suspense fallback={<RecentPostSkeleton />}>
          <RecentPostsSection />
        </Suspense>

        <div className="mt-18 relative z-9">
          {/* Titulo del formulario contacto */}

          <ContactHeader />

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
