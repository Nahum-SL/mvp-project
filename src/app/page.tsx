// Animaciones
import ArticleHome from "../shared/ui/cards/home/ArticleHome";
import CarouselStack from "../shared/ui/track/CarouselStack";
import Carousel3D from "../shared/ui/track/Carousel3D";
import FeaturedArticle from "../shared/ui/articles/FeaturesArticle";

// Componentes
import AnimatedCardGrid from "../shared/ui/animations/AnimateCardGrid";
import DashboardGrid from "../shared/ui/animations/DashboardGrid";
import BentoGrid from "../shared/ui/animations/BentoGrid";
import BlogGrid from "../shared/ui/animations/BlogGrid";
import TeamGrid from "../shared/ui/animations/TemGrid";

// Scroll
import ScrollStagger from "../shared/ui/animations/ScrollStagger";
import FadeOnScrollHeader from "../shared/ui/animations/FadeOnScroll";

//Header
import AboutHeaderOverlay from "../shared/ui/cards/home/AboutHeaderOverlay";

// Datos
import { logosHome } from "../shared/types/logosHome";

export default function Home() {
  return (
    <main>
      <div className="relative z-10 bg-zinc-950">
        {/* Header */}
        <section>
          <FadeOnScrollHeader>
            <AboutHeaderOverlay
              title="QUIENES SOMOS"
              description="Nuestra firma está conformada por un grupo humano de primer nivel con más de 30 años de experiencia en el rubro de Asesoramiento Contable, Laboral, Tributario y Financiero, experiencia que ponemos a su servicio para que usted y su empresa cumplan sus objetivos."
            />
          </FadeOnScrollHeader>
        </section>

        {/* Primer componente Grid */}
        <div className="relative z-10 mt-[100vh] bg-zinc-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          <ArticleHome title="Conoce Sobre Nosotros" cards={logosHome} />

          <CarouselStack />

          <Carousel3D />

          <FeaturedArticle />

          {/* Segundo Componente Grid */}
          <ScrollStagger>
            <AnimatedCardGrid />
          </ScrollStagger>

          {/* Tercer Componente Grid */}
          <DashboardGrid />

          {/* Cuarto Componente Grid */}
          <BentoGrid />

          {/* Quinto Componente Grid */}
          <BlogGrid />

          {/* Sexto Componente Grid */}
          <TeamGrid />
        </div>
      </div>
    </main>
  );
}
