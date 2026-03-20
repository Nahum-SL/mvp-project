import Link from "next/link";
import BlogCardHome from "./BlogCardHome";
import { BlogPost } from "@/src/types/blog/blogPost";
import { HeaderRecentPost } from "./HeaderRecenPost";
import { ArrowRight } from "lucide-react";

export async function getRecentPosts(): Promise<BlogPost[]> {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";
  const res = await fetch(`${API_URL}/post?limit=3`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json();
}

export const RecentPostsSection = async () => {
  const posts = await getRecentPosts();
  if (!posts || posts.length === 0)
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400 italic">
          No hay artículos publicados aún.
        </p>
      </div>
    );
  return (
    <section className="py-20 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto px-6">
        {/* Header centrado */}
        <HeaderRecentPost />

        <section className="container mx-auto px-15">
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-8">
            {posts.map((pos, i) => (
              <BlogCardHome key={pos.id} post={pos} index={i + 1} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm md:text-base 
            font-medium text-sky-400 hover:text-sky-500 transition-colors"
          >
            Ver todas las publicaciones
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
