"use client";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/src/types/blog/blogPost";
import { Calendar, Clock, User } from "lucide-react";

export default function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <section className="relative w-full py-6">
      <Link href={`/blog/${post.slug}`} className="group block">
        <div
          className="relative h-[70vh] min-h-130 w-full rounded-[2.5rem] 
        md:rounded-[3.5rem] overflow-hidden border border-slate-800 shadow-2xl"
        >
          {/* 1. IMAGEN: Con priority={true} para el mejor LCP posible */}
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            quality={75}
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          />

          {/* 2. OVERLAY: Gradiente doble (inferior y lateral) para legibilidad total */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/40 via-transparent to-transparent hidden md:block" />

          {/* 3. CONTENIDO */}
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-24 lg:p-32">
            <div className="max-w-5xl">
              {/* Título: Sin animación inicial para optimizar LCP */}
              <h2
                className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium
              text-white leading-[1.2] mb-8 tracking-tight"
              >
                {post.title}
              </h2>

              <p className="text-slate-300 text-lg md:text-xl font-light mb-8 line-clamp-2 max-w-2xl leading-relaxed">
                {post.excerpt ||
                  "Análisis profundo sobre las últimas tendencias y normativas del mercado peruano."}
              </p>

              {/* Footer del Post: Autor y Metadata */}
              <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div
                    className="relative w-12 h-12 rounded-full border 
                  border-white/20 overflow-hidden bg-slate-800"
                  >
                    {post.author?.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold">
                        <User size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-sky-400 font-medium uppercase tracking-wider">
                      Especialista
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-4 text-slate-400 text-xs font-medium uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-500" />
                    {new Date(post.createdAt).toLocaleDateString("es-PE", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-500" />
                    {post.readingTime || "6 min"} MIN lectura
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
