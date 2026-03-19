// src/app/(public)/nosotros/page.tsx
import { TeamMember } from "@/src/types/nosotros/team-asescon";
import { TeamGrid } from "@/src/features/public-pages/nosotros/TeamGrid";
import { StatsSection } from "@/src/features/public-pages/nosotros/components/StatsSection";
import { ValuesManifesto } from "@/src/features/public-pages/nosotros/components/ValueManifesto";
import { NosotrosHero } from "@/src/features/public-pages/nosotros/components/videos/NosotrosHero";
import { InteractiveVideoBox } from "@/src/features/public-pages/nosotros/components/videos/InteractiveVideoBox";

// Datos de ejemplo (Esto vendría de tu API o CMS)
const asesconTeam: TeamMember[] = [
  {
    id: 1,
    name: "CPCC. Luis Gonzales",
    role: "Socio Fundador",
    specialty: "Estrategia Fiscal & NIIF",
    image: "/persona-2.webp",
    linkedin: "https://linkedin.com/in/nahumsalazar",
  },
  {
    id: 2,
    name: "Abog. Carmen Reyes",
    role: "Directora Legal",
    specialty: "Defensa Laboral & SUNAFIL",
    image: "/persona-1.webp",
    linkedin: "https://linkedin.com/in/carmenreyes",
  },
  {
    id: 3,
    name: "Mag. Luis Torres",
    role: "Consultor Senior",
    specialty: "Costos & Auditoría",
    image: "/persona-3.webp",
    linkedin: "https://linkedin.com/in/carmenreyes",
  },
  {
    id: 4,
    name: "Ing. Sofia Gomez",
    role: "Tech & Procesos",
    specialty: "Automatización Contable",
    image: "/persona-4.webp",
    linkedin: "https://linkedin.com/in/carmenreyes",
  },
];

export default function NosotrosPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      {/* Video */}
      <NosotrosHero />

      {/* SECCIÓN 1: TEAM (Dark) */}
      <section className="pt-32 pb-24 px-6">
        <div className="text-center mb-20 max-w-2xl mx-auto space-y-4">
          <span className="text-sky-500 font-black uppercase tracking-[0.4em] text-xs">
            El Capital Humano
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tighter italic">
            Nuestros <span className="text-sky-500">Especialistas</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">
            Un equipo multidisciplinario comprometido con la precisión
            financiera
          </p>
        </div>
      </section>

      {/* SECCIÓN 2: STATS (Cambio sutil de fondo para romper el negro) */}
      <section className="bg-slate-900/50 border-y border-slate-800">
        <StatsSection />
      </section>

      {/* SECCIÓN 3: VALORES (Dark con Glows) */}
      <section className="py-24">
        <ValuesManifesto />
      </section>

      <section className="py-24 px-6 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto">
          {/* IMPLEMENTACIÓN DEL VIDEO BOX */}
          <InteractiveVideoBox
            title="Tranquilidad Jurídica. Impulsada por Datos."
            description="En ASESCON, fusionamos la interpretación legal experta con algoritmos de cumplimiento tributario. No solo declaramos impuestos; blindamos el crecimiento de tu empresa contra contingencias de SUNAT y SUNAFIL, usando tecnología para anticipar riesgos."
            posterSrc="/images/about/experience-placeholder.webp" // NECESITAS ESTA IMAGEN
            // videoSrc="/videos/nosotros/experience-asescon.mp4" // COMENTADO HASTA QUE TENGAS EL VIDEO
            className="w-full"
          />
        </div>
      </section>

      <TeamGrid members={asesconTeam} />
    </main>
  );
}
