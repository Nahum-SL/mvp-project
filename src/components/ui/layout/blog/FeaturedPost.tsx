"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/src/types/blog/blog";

export default function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <section className="relative min-h-screen bg-slate-950 w-full py-12">
      <Link href={`/blog/${post.slug}`} className="group">
        <div className="relative h-125 md:h-150 w-full rounded-[3rem] overflow-hidden shadow-2xl">
          {/* Imagen de fondo con Zoom en Hover */}
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Overlay gradiente agresivo para legibilidad */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Contenido posicionado abajo a la izquierda */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6 inline-block">
                Lectura Destacada
              </span>

              {/* Titulo legible */}
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tighter">
                {post.title}
              </h2>

              {/* Post excerpt con un poco más de espacio para respirar y legibilidad mejorada */}
              <p className="text-slate-300 text-lg md:text-xl font-light mb-8 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Nombre del autor y fecha, con un diseño limpio y minimalista */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-blue-500 overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
                  />
                </div>
                <div className="text-white">
                  <p className="text-sm font-bold">{post.author.name}</p>
                  <p className="text-xs text-slate-400">
                    {post.date} • {post.readingTime}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </section>
  );
}
