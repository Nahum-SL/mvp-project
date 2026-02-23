"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/src/types/blog";
import { FaRegClock, FaChevronRight } from "react-icons/fa";

interface Props {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block relative">
        <article className="bg-white rounded-4xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
          {/* Contenedor de Imagen con Badge */}
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Categoría Flotante */}
            <div className="absolute top-5 left-5">
              <span className="bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
                {post.category}
              </span>
            </div>
          </div>

          {/* Contenido de la Card */}
          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-slate-400 text-xs mb-4 font-medium">
              <span className="flex items-center gap-1.5">
                <FaRegClock className="text-blue-500" /> {post.readingTime}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{post.date}</span>
            </div>

            {/* Título y Resumen */}
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
              {post.title}
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8 font-light">
              {post.excerpt}
            </p>

            {/* Footer de la Card: Autor y Link */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 leading-none">
                    {post.author.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {post.author.role}
                  </span>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FaChevronRight className="text-xs" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
