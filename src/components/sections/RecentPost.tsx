import Link from "next/link";
import { BlogCard } from "../../features/blog/components/BlogCard";
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

export const RecentPosts = async () => {
  const posts = await getRecentPosts();

  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <HeaderRecentPost />

        {/* Post destacado */}
        <div className="mt-10">
          <BlogCard post={featured} featured />
        </div>

        {/* Otros posts */}
        {rest.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
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
