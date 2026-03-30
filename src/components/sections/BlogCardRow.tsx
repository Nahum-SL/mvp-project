// src/components/sections/BlogCardRow.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/src/types/blog/blogPost";
import { ArrowUpRight } from "lucide-react";

interface Props {
  post: BlogPost;
  index: number;
}

export const BlogCardRow = ({ post, index }: Props) => {
  const container = useRef(null);

  // Efecto Parallax para la imagen
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div ref={container} className="relative group">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        {/* IMAGEN: Tamaño aumentado y efecto Parallax */}
        <div className="lg:col-span-7 relative aspect-4/5 md:aspect-16/10 overflow-hidden rounded-sm">
          <motion.div
            style={{ y }}
            className="relative w-full h-[120%] -top-[10%]"
          >
            <Image
              src={post.image || "/placeholder.webp"}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-100"
            />
          </motion.div>
          {/* Badge flotante */}
          <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">
              0{index + 1}
            </span>
          </div>
        </div>

        {/* TEXTO: Tipografía masiva y Minimalista */}
        <div className="lg:col-span-5 space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <span className="text-[#c29d6d] text-[10px] uppercase tracking-[0.3em] mb-4">
              {new Date(post.createdAt).toLocaleDateString("es-PE", {
                month: "long",
                year: "numeric",
              })}
            </span>

            <Link href={`/blog/${post.slug}`} className="group/title">
              <h3 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[0.9] tracking-tighter transition-colors group-hover/title:text-[#c29d6d]">
                {post.title}
              </h3>
            </Link>

            <div className="mt-12 flex items-center gap-8">
              <Link
                href={`/blog/${post.slug}`}
                className="group/btn relative flex items-center justify-center w-20 h-20 bg-[#c29d6d] rounded-full text-black transition-transform hover:scale-110 active:scale-95"
              >
                <ArrowUpRight
                  size={32}
                  className="group-hover/btn:rotate-45 transition-transform duration-300"
                />
              </Link>
              <span className="text-stone-500 text-sm font-medium max-w-50 leading-snug">
                Click para explorar esta investigación editorial
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Línea decorativa de fondo */}
      <div className="absolute -bottom-20 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
