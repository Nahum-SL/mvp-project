// src/app/(public)/blog/page.tsx
import FeaturedPost from "@/src/components/ui/layout/blog/FeaturedPost";
import { BlogCard } from "@/src/features/blog/components/BlogCard";
import { getBlogPosts } from "@/src/features/public-pages/blog/action";
import { BlogHeader } from "@/src/components/sections/BlogHeader";

export default async function BlogPage() {
  const allPosts = await getBlogPosts();

  if (allPosts.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400 italic">
          No hay artículos publicados aún.
        </p>
      </main>
    );
  }

  // Separamos el primero para el Hero (Featured) y el resto para la grilla
  const [featured, ...rest] = allPosts;

  return (
    <main className="bg-slate-950">
      {/* Header de la pagina */}
      <BlogHeader
        title="Recursos y Artículos"
        subtitle="Descubre análisis, tips y contenido actualizado sobre contabilidad, finanzas y normativa empresarial."
        backgroundImage="/asesoria-niif.webp"
      />

      {/* El post más reciente en grande */}
      <FeaturedPost post={featured} />

      {/* El resto de artículos en una sección de grilla */}
      {rest.length > 0 && (
        <section className="py-20 container mx-auto px-6">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
            Artículos anteriores
            <div className="h-px bg-slate-700 flex-1"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
