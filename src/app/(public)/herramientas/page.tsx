import ToolsHero from "@/src/modules/public-web/herramientas/ToolsHero";
import ToolsGrid from "@/src/modules/public-web/herramientas/components/ToolsGrid";
import ToolsValueSection from "@/src/modules/public-web/herramientas/components/ToolsValueSection";


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
