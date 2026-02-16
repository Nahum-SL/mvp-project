// Animaciones
import FeaturedArticle from "../shared/ui/articles/FeaturesArticle";

// Articulos
import MidnightCard from "../components/ui/cards/MidnightCard";
import WhiteCard from "../components/ui/cards/WhiteCard";
import ArticleCard from "../components/ui/cards/ArticleCard";

// ContactForm
import ContactForm from "../shared/ui/ContactForm";

// Home
import AsesconHero from "../shared/ui/home/AsesconHero";

export default function Home() {
  return (
    <main>
      <div id="/home" className="relative z-10">
        <AsesconHero
          companyName="ASESCON"
          mainTitle="Arquitectos De Crecimiento Empresarial"
          subtitle="Brindamos el respaldo estratégico y la seguridad jurídica que su empresa necesita para operar con total tranquilidad en el mercado actual."
          ctaText="Habla con nosotros"
        />

        {/* Primer componente Grid */}
        <div className="relative z-9 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          <ArticleCard
            titleCard="Impulsa el cambio que tu negocio necesita hoy"
            Title="Crece con una estrategia financiera sólida."
            Subtitle="Acelera la transformación de tu negocio con herramientas diseñadas para empresas."
            description="Descripcion"
            image="/ejemplo.jpeg"
          />

          {/* Card derecho */}
          <MidnightCard
            title="IMPULSA TU NEGOCIO"
            subtitle="Sub"
            description="Conoce nuestros servicios en detalle en el Brochure comercial"
            textColor="Asescon"
          />
          {/* Card derecho */}
          <WhiteCard
            title="IMPULSA TU NEGOCIO"
            subtitle="Sub"
            description="Conoce nuestros servicios en detalle en el Brochure comercial"
            textColor="Asescon"
          />

          {/* Card isquierdo */}
          <MidnightCard
            title="IMPULSA TU NEGOCIO"
            subtitle="Sub"
            description="Conoce nuestros servicios en detalle en el Brochure comercial"
            textColor="Asescon"
            side="right"
          />

          {/* Primer Articulo */}
          <FeaturedArticle />

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
