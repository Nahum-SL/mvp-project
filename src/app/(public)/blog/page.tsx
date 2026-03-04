// src/app/(public)/blog/page.tsx
import FeaturedPost from "@/src/components/ui/layout/blog/FeaturedPost";
import { BlogCard } from "@/src/features/blog/components/BlogCard";
import { getBlogPosts } from "@/src/features/public/blog/action";

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
    <main className="bg-slate-950 min-h-screen">
      {/* El post más reciente en grande */}
      <FeaturedPost post={featured} />

      {/* El resto de artículos en una sección de grilla */}
      {rest.length > 0 && (
        <section className="py-20 container mx-auto px-6">
          <h2 className="text-white text-2xl font-bold mb-10 flex items-center gap-4">
            Artículos <span className="text-blue-500 italic">Anteriores</span>
            <div className="h-[1px] bg-slate-800 flex-1"></div>
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
