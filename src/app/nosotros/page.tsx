

import FadeOnScroll from "@/src/shared/ui/animations/FadeOnScroll";
//Header
import AboutHeaderOverlay from "@/src/shared/ui/cards/home/AboutHeaderOverlay";


export default function NosotrosPage() {
  return (
    <div className="relative z-10 bg-zinc-950">
      {/* Header */}
      <section>
        <FadeOnScroll>
          <AboutHeaderOverlay
            title="QUIENES SOMOS"
            description="Nuestra firma está conformada por un grupo humano de primer nivel con más de 30 años de experiencia en el rubro de Asesoramiento Contable, Laboral, Tributario y Financiero, experiencia que ponemos a su servicio para que usted y su empresa cumplan sus objetivos."
          />
        </FadeOnScroll>
      </section>
    </div>
  );
}
