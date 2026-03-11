// src/app/(public)/blog/BlogContent.tsx
import FeaturedPost from "@/src/components/ui/layout/blog/FeaturedPost";
import BlogCardPage from "@/src/features/blog/components/BlogCardPage";
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

  if (!allPosts || allPosts.length === 0) return null;

  const [featured, ...rest] = allPosts;

  return (
    <>
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-15 space-y-4">
          <h2 className="text-3xl md:text-6xl lg:text-4xl font-black text-white leading-tights tracking-tighter">
            Artículo <span className="text-sky-500">Reciente</span> 
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
          <section className="container mx-auto px-15">
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-8">
              {rest.map((pos, i) => (
                <BlogCardPage key={pos.id} post={pos} index={i + 1} />
              ))}
            </div>
          </section>
        </section>
      )}
      <div className="h-px bg-slate-700 flex-1" />
    </>
  );
}
