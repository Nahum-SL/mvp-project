import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/src/types/blog/blogPost";
import { ArrowRight } from "lucide-react";

export const BlogCard = ({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) => {
  return (
    <article
      className={`group 
         overflow-hidden transition-
         bg-linear-to-tl z-0 relative 
          before:absolute before:w-full 
          before:aspect-square before:left-0 before:top-0 
          before:rounded-full before:blur-3xl before:opacity-80 
          before:-z-10 before:transition 
          from-[rgba(32,35,91,0.7)] to-[rgba(7,9,33,0.7)] 
          before:bg-[radial-gradient(circle,#199AFC90_0,#0D102380_100%)]
      hover:shadow-lg rounded-2xl ${featured ? "grid md:grid-cols-2" : ""}`}
    >
      <div className="relative overflow-hidden aspect-4/3 rounded-2xl">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-4 left-4">
          <span className="bg-slate-900/70 border border-slate-700 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
            {post.category.name}
          </span>
        </div>
      </div>

      <div className="relative p-4 md:p-6 flex flex-col gap-2">
        <p className="text-white/60 text-xs mb-2">
          {new Date(post.createdAt).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        <h3 className="text-white text-lg md:text-xl font-semibold leading-snug">
          {post.title}
        </h3>

        <p className="text-slate-400 text-sm line-clamp-3">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-500 text-sm hover:text-blue-600 transition-colors font-medium flex items-center gap-2"
        >
          Leer mas
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
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
