import { BlogCard } from "../../features/blog/components/BlogCard";
import { BlogPost } from "@/src/types/blog/blogPost";

async function getRecentPosts(): Promise<BlogPost[]> {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

  // Usamos revalidate para que se actualice cada hora sin perder velocidad
  const res = await fetch(`${API_URL}/posts?limit=3`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  return res.json();
}

export const RecentPosts = async () => {
  const posts = await getRecentPosts();

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight italic">
              Actualidad{" "}
              <span className="text-blue-600 not-italic">Contable.</span>
            </h2>
            <p className="text-slate-500 mt-4 font-light">
              Mantente informado con las últimas normativas y consejos
              financieros de nuestros expertos.
            </p>
          </div>
          <button className="bg-white border border-slate-200 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
            Ver todo el blog
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};
