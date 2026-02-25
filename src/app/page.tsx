// Componente Sobre Nosotros
// src/components/ui/layout/home
import AboutSection from "../components/ui/layout/home/AboutSection";

// Data del <AboutSection />
import { aboutUs } from "../data/about-us";

// Formulario de contacto
// import ContactForm from "../features/ContactForm";
import { ContactoForm } from "../features/contacto/components/ContactoForm";
// Header del Home
import AsesconHero from "../components/ui/layout/AsesconHero";

//
import MidnightCard from "../components/ui/cards/MidnightCard";

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

        {/* Descarga del Brouchet */}
        <MidnightCard
          title="Impulsa tu negocio"
          subtitle="Sub"
          description="Conoce nuestros servicios en detalle en el Brochure comercial"
          textColor="Asescon"
        />

        <div className="relative z-9 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          {/* Formulario de Contacto */}
          <section id="contacto" className="py-20 bg-gray-50">
            <div className="container mx-auto max-w-2xl">
              <ContactoForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
