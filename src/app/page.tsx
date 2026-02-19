// src/components/ui/layout/home
import AboutSection from "../components/ui/layout/home/AboutSection";
// Data del <AboutSection />
import { aboutUs } from "../types/about-us";

// ContactForm
import ContactForm from "../shared/ui/ContactForm";

// Home
import AsesconHero from "../shared/ui/home/AsesconHero";

export default function Home() {
  // Prueba

  return (
    <main>
      <div id="/home" className="relative z-10">
        <AsesconHero
          companyName="ASESCON"
          mainTitle="Arquitectos De Crecimiento Empresarial"
          subtitle="Brindamos el respaldo estratégico y la seguridad jurídica que su empresa necesita para operar con total tranquilidad en el mercado actual."
          ctaText="Habla con nosotros"
        />

        <AboutSection data={aboutUs[0]}/>
        {/* Primer componente Grid */}
        <div className="relative z-9 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          {/* Formulario de Contacto */}
          <section id="contact" className="py-20 md:py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
