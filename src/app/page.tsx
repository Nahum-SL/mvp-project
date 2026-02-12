// Animaciones
import CarouselStack from "../shared/ui/track/CarouselStack";
import Carousel3D from "../shared/ui/track/Carousel3D";
import FeaturedArticle from "../shared/ui/articles/FeaturesArticle";
import CarouselFade from "../shared/ui/track/CarouselFade";

// Componentes
import AnimatedCardGrid from "../shared/ui/animations/AnimateCardGrid";
import BlogGrid from "../shared/ui/animations/BlogGrid";
import TeamGrid from "../shared/ui/animations/TemGrid";

// Articulo
import MidnightCard from "../shared/ui/articles/MidnightCard";

import { carousel } from "../shared/types/carousel";

// Scroll
import ScrollStagger from "../shared/ui/animations/ScrollStagger";

// Home
import AsesconHero from "../shared/ui/home/AsesconHero";


export default function Home() {
  return (
    <main>
      <div className="relative z-10 bg-zinc-950">
        <AsesconHero
          companyName="ASESCON"
          mainTitle="Arquitectos De Crecimiento Empresarial"
          subtitle="Brindamos el respaldo estratégico y la seguridad jurídica que su empresa necesita para operar con total tranquilidad en el mercado actual."
          ctaText="Agendar Consultoría"
        />

        {/* Primer componente Grid */}
        <div className="relative z-9 bg-zinc-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          
          <CarouselFade items={carousel} />

          {/* Card derecho */}
          <MidnightCard
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

          {/* Primer Carrusel */}
          <CarouselStack />

          {/* Segundo Carrusel */}
          <Carousel3D />

          {/* Primer Articulo */}
          <FeaturedArticle />

          {/* Segundo Componente Grid */}
          <ScrollStagger>
            <AnimatedCardGrid />
          </ScrollStagger>

          {/* Quinto Componente Grid */}
          <BlogGrid />

          {/* Sexto Componente Grid */}
          <TeamGrid />
        </div>
      </div>
    </main>
  );
}
