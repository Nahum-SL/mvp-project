// src/features/public-pages/blog/components/BlogCardPage.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { BlogPost } from "@/src/types/blog/blogPost";

interface Props {
  post: BlogPost;
  index: number;
}

export const BlogCardPage = ({ post, index }: Props) => {
  return (
    <motion.div
      initial={index === 0 ? false : { opacity: 0, y: 20 }}
      whileInView={index === 0 ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col bg-slate-900/40 
      border border-slate-800 overflow-hidden hover:border-sky-500/30 transition-all duration-500"
    >
      <Link href={`/blog/${post.slug}?from=explorar_articulos`} className="flex flex-col h-full">
        {/* Contenedor de Imagen */}
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={post.image || "/placeholder-blog.webp"}
            alt={post.title}
            fill
            priority={index === 0}
            quality={75}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Badge de Categoría Flotante */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md 
            border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest"
            >
              {post.category.name}
            </span>
          </div>
        </div>

        {/* Contenido de la Tarjeta */}
        <div className="p-8 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-widest mb-4">
              <Clock size={12} className="text-sky-500" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("es-PE", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h3
              className="text-xl md:text-2xl font-serif font-bold text-white leading-tight mb-4 
            group-hover:text-sky-400 transition-colors"
            >
              {post.title}
            </h3>

            <div
              className="text-slate-400 text-sm line-clamp-2 font-light leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Acción con animación IA */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800/50 mt-auto">
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
              Leer más
            </span>
            <div
              className="p-2 rounded-full bg-slate-800 text-white 
            group-hover:bg-sky-500 group-hover:text-white transition-all transform group-hover:rotate-45]"
            >
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
