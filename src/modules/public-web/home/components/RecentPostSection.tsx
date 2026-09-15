import { BlogCardHome } from "./BlogCardHome";
import { SectionHeaderHome } from "@/src/modules/public-web/home/components/SectionHeaderHome";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/src/types/blog/blogPost";

interface Props {
  posts: BlogPost[];
}

export function RecentPostsSection({posts}: Props) {

  if (posts.length === 0) {
    return (
      <div className="py-10 text-center bg-slate-50">
        <p className="text-slate-400 text-sm">
          No se encontraron artículos recientes en producción.
        </p>
      </div>
    );
  }
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <SectionHeaderHome
            title="Perspectivas y Actualidad"
            description="Análisis estratégicos sobre el entorno contable, tributario y empresarial del Perú."
            lineColor="purple"
            mode="light"
          />
        </div>

        {/* Grid Responsive: 1 col móvil, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, index) => (
            <BlogCardHome key={post.id} post={post} index={index} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/blog?from=recent_posts"
            className="group inline-flex items-center gap-2 text-sm 
            font-medium uppercase tracking-[0.2em] text-slate-900 
            hover:text-[rgb(120,70,45)] transition-colors"
          >
            Ver todas las publicaciones
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
