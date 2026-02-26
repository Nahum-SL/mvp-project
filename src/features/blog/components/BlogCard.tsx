import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/src/types/blog/blogPost";

export const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-500">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {post.category.name}
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-slate-400 text-xs mb-2 font-medium">
          {new Date(post.createAt).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 font-light mb-6">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group/link"
        >
          Leer más
          <span className="group-hover/link:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </div>
  );
};
