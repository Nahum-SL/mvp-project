// src/app/(public)/blog/BlogContent.tsx
import FeaturedPost from "@/src/components/ui/layout/blog/FeaturedPost";
import { getBlogPosts } from "@/src/features/public-pages/blog/action";
// Herramientas / tools
import { SunatCalendar } from "./tools/SunatCalendar";
import { GratificationCalc } from "./tools/GratificacionCal";

import { ToolsAnimationWrapper } from "./tools/ToolsAnimationWrapper";
import { SectionHeaderHome } from "@/src/components/ui/layout/contacto/SectionHeaderHome";
import { BlogCardHome } from "@/src/components/sections/BlogCardHome";

export default async function BlogContent() {
  const allPosts = await getBlogPosts();

  if (allPosts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400">
          No hay artículos publicados aún.
        </p>
      </div>
    );
  }

  if (!allPosts || allPosts.length === 0) return null;

  const [featured, ...rest] = allPosts;

  return (
    <>
      <section className="py-20 container mx-auto px-6">
        <SectionHeaderHome
          title="Articulo Reciente"
          description="Testeando"
          lineColor="yellow"
          mode="dark"
        />
        <div id="recentPost">
          <FeaturedPost post={featured} />
        </div>
      </section>

      <ToolsAnimationWrapper>
        {/* --- NUEVA SECCIÓN DE HERRAMIENTAS --- */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SunatCalendar />
            <GratificationCalc />
          </div>
          <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-600 font-extrabold uppercase tracking-[0.4em]">
              Herramientas Gratuitas para Empresas Peruanas by ASESCON
            </p>
          </div>
        </div>
      </ToolsAnimationWrapper>

      {/* --- LISTADO DE POSTS ANTERIORES --- */}
      {rest.length > 0 && (
        <section className="py-20 container px-6">
          <SectionHeaderHome
            title="Articulos Siguientes"
            description="Testeando por segunda vez"
            lineColor="green"
            mode="dark"
          />

          <section className="container mx-auto px-15">
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-8">
              {rest.map((pos, i) => (
                // Aca iria otro componente similar pero dedicada a este pagina
                <BlogCardHome key={pos.id} post={pos} index={i + 1} />
              ))}
            </div>
          </section>
        </section>
      )}
      {/* Linea separadora para encajar con el Footer */}
      <div className="h-px bg-slate-700 flex-1" />
    </>
  );
}
