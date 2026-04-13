import ToolsHero from "@/src/features/public-web/herramientas/ToolsHero";
import ToolsGrid from "@/src/features/public-web/herramientas/components/ToolsGrid";
import ToolsValueSection from "@/src/features/public-web/herramientas/components/ToolsValueSection";


export default function HerramientasPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <ToolsHero />
      {/* GRID */}
      <ToolsGrid />

      {/* VALUE SECTION */}
      <ToolsValueSection />

      {/* SEPARADOR */}
      <div className="h-px bg-slate-800" />
    </main>
  );
}
