// src/app/(public)/blog/BlogContent.tsx
import FeaturedPost from "@/src/components/ui/layout/blog/FeaturedPost";
import { BlogCard } from "@/src/features/blog/components/BlogCard";
import { getBlogPosts } from "@/src/features/public-pages/blog/action";

export default async function BlogContent() {
  const allPosts = await getBlogPosts();

  if (allPosts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400 italic">
          No hay artículos publicados aún.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = allPosts;

  return (
    <>
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-15 space-y-4">
            <h2 className="text-3xl md:text-6xl lg:text-4xl font-black text-white leading-tights tracking-tighter">
              Artículos Reciente
            </h2>
            <p className="text-slate-400 text-sm md:text-xl font-medium leading-relaxed">
              Únete a las empresas que ya han transformado su gestión con el
              respaldo estratégico de{" "}
            </p>
          </div>
        <FeaturedPost post={featured} />
      </section>

      {rest.length > 0 && (
        <section className="py-20 container px-6">
          <div className="text-center mb-15 space-y-4">
            <h2 className="text-3xl md:text-6xl lg:text-4xl font-black text-white leading-tights tracking-tighter">
              Artículos anteriores
            </h2>
            <p className="text-slate-400 text-sm md:text-xl font-medium leading-relaxed">
              Únete a las empresas que ya han transformado su gestión con el
              respaldo estratégico de{" "}
            </p>
          </div>
          <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
      <div className="h-px bg-slate-700 flex-1"></div>
    </>
  );
}
