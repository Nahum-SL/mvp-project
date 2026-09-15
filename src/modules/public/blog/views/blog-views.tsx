"use client";

// Components
import { BlogHero } from "../components/blog-public-hero";
import { BlogSectionTitle } from "../components/blog-section-title";
import { BlogCard } from "../components/card/blog-card";
import FeaturedPost from "@/src/components/ui/layout/blog/FeaturedPost";
// SubComponents
import { ToolsAnimationWrapper } from "../slug/components/tools/ToolsAnimationWrapper";
import { SunatCalendar } from "../slug/components/tools/SunatCalendar";
import { GratificationCalc } from "../slug/components/tools/GratificacionCal";
// Types
import type { BlogPost } from "@/src/types/blog/blogPost";
interface BlogViewsProps {
  post: BlogPost[];
}

export function BlogViews({ post }: BlogViewsProps) {
  const hasPosts = post && post.length > 0;

  return (
    <div className="bg-slate-950">
      <BlogHero
        title="Recursos y Blogs"
        subtitle="Descubre análisis, tips y contenido actualizado sobre contabilidad, finanzas y normativa empresarial."
      />
      <section className="py-20 container mx-auto px-6">
        <BlogSectionTitle
          title="Articulo Reciente"
          description="Análisis actualizado sobre normativas y gestión empresarial en el Perú."
          lineColor="yellow"
          mode="dark"
        />
        {hasPosts ? (
          <FeaturedPost post={post[0]} />
        ) : (
          <p className="text-slate-400 text-center">No hay artículos aún.</p>
        )}

        {/* --- LISTADO DE POSTS ANTERIORES --- */}
        {hasPosts && (
          <section className="py-24 container mx-auto px-6">
            <BlogSectionTitle
              title="Explorar más artículos"
              description="Mantente al día con las últimas actualizaciones contables y legales."
              lineColor="green"
              mode="dark"
            />

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {post.slice(1).map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </section>
        )}

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
      </section>

      {/* Linea separadora para encajar con el Footer */}
      <div className="h-px bg-slate-700 flex-1" />
    </div>
  );
}
