// src/app/(public)/blog/BlogContent.tsx
import FeaturedPost from "@/src/components/ui/layout/blog/FeaturedPost";
import { getBlogPosts } from "@/src/features/public-web/blog/action";
// Herramientas / tools
import { SunatCalendar } from "./tools/SunatCalendar";
import { GratificationCalc } from "./tools/GratificacionCal";

import { ToolsAnimationWrapper } from "./tools/ToolsAnimationWrapper";
import { SectionHeaderHome } from "@/src/components/ui/layout/contacto/SectionHeaderHome";
import { BlogCardPage } from "@/src/features/blog/components/BlogCardPage";

export default async function BlogContent() {
  const allPosts = await getBlogPosts();
  const hasPosts = allPosts && allPosts.length > 0;

  return (
    <>
      <section className="py-20 container mx-auto px-6">
        <SectionHeaderHome
          title="Articulo Reciente"
          description="Análisis actualizado sobre normativas y gestión empresarial en el Perú."
          lineColor="yellow"
          mode="dark"
        />
        {hasPosts ? (
          <FeaturedPost post={allPosts[0]} />
        ) : (
          <p className="text-slate-400 text-center">No hay artículos aún.</p>
        )}
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
      {hasPosts && (
        <section className="py-24 container mx-auto px-6">
          <SectionHeaderHome
            title="Explorar más artículos"
            description="Mantente al día con las últimas actualizaciones contables y legales."
            lineColor="green"
            mode="dark"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allPosts.slice(1).map((post, i) => (
              <BlogCardPage key={post.id} post={post} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Linea separadora para encajar con el Footer */}
      <div className="h-px bg-slate-700 flex-1" />
    </>
  );
}
