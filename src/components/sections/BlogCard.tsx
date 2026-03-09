"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/src/types/blog/blogPost";
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
        <article
          className="bg-white rounded-3xl overflow-hidden border-2 border-slate-600 shadow-sm 
        transition-transform duration-500 hover:shadow-2xl hover:border-slate-300 hover:shadow-blue-500/20 hover:-translate-y-1"
        >
          {/* Imagen principal con overlay sutil */}
          <div className="relative h-56 md:h-64 w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badge de categoría */}
            <div className="absolute top-4 left-4">
              <span className="bg-blue-50 text-blue-600 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                {post.category.name}
              </span>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6 md:p-8 flex flex-col h-full justify-between">
            {/* Meta Info */}
            <div className="flex items-center gap-3 text-slate-400 text-xs mb-2 font-medium">
              <span className="flex items-center gap-1">
                <FaRegClock className="text-blue-500" /> {post.readingTime}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("es-PE", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Título */}
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>

            {/* Extracto */}
            <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-3 mb-4">
              {post.excerpt}
            </p>

            {/* Footer: Autor + CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  {post.author.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  )}
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

              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FaChevronRight className="text-xs md:text-sm" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
