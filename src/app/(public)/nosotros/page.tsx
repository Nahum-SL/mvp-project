// src/app/(public)/nosotros/page.tsx
import { TeamMember } from "@/src/types/nosotros/team-asescon";
import { TeamGrid } from "@/src/features/public-web/nosotros/components/TeamGrid";
import { StatsSection } from "@/src/features/public-web/nosotros/components/StatsSection";
import { ValuesManifesto } from "@/src/features/public-web/nosotros/components/ValueManifesto";
import { NosotrosHero } from "@/src/features/public-web/nosotros/NosotrosHero";
import { InteractiveVideoBox } from "@/src/features/public-web/nosotros/components/videos/InteractiveVideoBox";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: `
  Conoce al equipo detrás de ASESCON. Más de 30 años 
  brindando confianza y soluciones contables personalizadas 
  para Mypes y grandes empresas en todo el Perú.`,
};

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
      <NosotrosHero />

      {/* SECCIÓN 1: STATS (Inmediatamente después del video para validar la autoridad) */}
      <section className="bg-slate-900/50 border-b border-slate-800">
        <StatsSection />
      </section>

      {/* SECCIÓN 2: TEAM */}
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-xs">
              El Capital Humano
            </span>
            <h2 className="text-5xl md:text-6xl text-white leading-tight tracking-tighter">
              Nuestros Especialistas
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Un equipo multidisciplinario comprometido con la precisión
              financiera y legal.
            </p>
          </div>
          <TeamGrid members={asesconTeam} />
        </div>
      </section>

      {/* SECCIÓN 3: VALORES */}
      <section className="py-24 bg-slate-950/50">
        <ValuesManifesto />
      </section>

      {/* SECCIÓN 4: VIDEO BOX (El "Grand Finale") */}
      <section className="py-32 px-6 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
        {/* Decoración de fondo para cerrar con fuerza */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl text-white tracking-tighter mb-8">
              ¿Por qué elegir <span className="text-sky-600">ASESCON</span>?
            </h2>
          </div>
          <InteractiveVideoBox
            title="Tranquilidad Jurídica, Impulsada por Datos."
            description="En ASESCON, fusionamos la interpretación legal 
            experta con algoritmos de cumplimiento tributario. No solo declaramos 
            impuestos; blindamos el crecimiento de tu empresa 
            contra contingencias de SUNAT y SUNAFIL, usando tecnología para anticipar riesgos."
            posterSrc="/nosotros-card.webp"
            videoSrc="/interactive-video-2.webm"
            className="w-full"
          />
        </div>
      </section>
    </main>
  );
}
