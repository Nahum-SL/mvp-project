import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/src/types/blog/blogPost";

export const BlogCard = ({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) => {
  return (
    <article
      className={`group bg-white border border-slate-100 overflow-hidden transition-all
      hover:shadow-lg rounded-2xl ${featured ? "grid md:grid-cols-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-auto md:h-full" : "aspect-video"
        }`}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
            {post.category.name}
          </span>
        </div>
      </div>

      <div className={`relative p-6 ${featured ? "flex flex-col justify-center" : ""}`}>
        <p className="text-slate-400 text-xs mb-2">
          {new Date(post.createdAt).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        <h3
          className={`text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors ${
            featured ? "text-2xl font-semibold" : "text-lg font-semibold"
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`text-slate-500 text-sm mb-5 ${
            featured ? "line-clamp-3" : "line-clamp-2"
          }`}
        >
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-600 text-sm font-medium flex items-center gap-2"
        >
          Leer artículo →
        </Link>
        {/* Línea decorativa inferior que aparece en hover */}
        <div
          className="absolute bottom-0 left-8 right-8 h-1 bg-linear-to-r 
                from-blue-600 to-green-500 scale-x-0 origin-left
                group-hover:scale-x-100 transition-transform duration-500 rounded-full"
        />
      </div>
    </article>
  );
};
