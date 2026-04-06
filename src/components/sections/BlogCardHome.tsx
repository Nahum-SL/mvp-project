
// -- EXPORTADO --> src/
"use client";

// Manejar estado hover para efectos visuales
import { useState } from "react";
// Animacion
import { motion } from "framer-motion";
// Componentes de Next.js
import Link from "next/link";
import Image from "next/image";
// Iconos
import { ArrowUpRight, Calendar } from "lucide-react";
// Tipos para el post
import { BlogPost } from "@/src/types/blog/blogPost";
// Utilidad para manejar clases condicionales
import { cn } from "@/src/lib/utils";

interface Props {
  post: BlogPost;
  index: number;
}

export const BlogCardHome = ({ post, index }: Props) => {
  // -- Estado para manejar hover (y touch) y aplicar efectos visuales
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className="group relative h-125 w-full overflow-hidden 
      rounded-[2.5rem] bg-white border border-slate-200 shadow-sm"
    >

      {/* Referencia al slug del post para enlazar a la página de detalle del blog */}
      <Link href={`/blog/${post.slug}`}>
        {/* IMAGEN DE FONDO CON EFECTO ZOOM */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image || "/placeholder-blog.webp"}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover transition-all duration-1000 scale-105",
              isHovered ? "scale-110 blur-[2px] brightness-50" : "",
            )}
          />
          {/* Overlay de color cuando no hay hover (Limpio) */}
          <div
            className={cn(
              "absolute inset-0 transition-all duration-500",
              // En móvil (no-hover) tiene un gradiente negro abajo para que el texto blanco se lea
              "bg-linear-to-t from-black/80 via-black/20 to-transparent sm:bg-transparent",
              // En hover (o touch) se oscurece todo por igual
              isHovered ? "bg-[rgb(42,28,21)]/60 opacity-100" : "",
            )}
          />
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10 h-full p-10 flex flex-col justify-between">
          {/* Top: Fecha y Categoría */}
          <div className="flex justify-between items-start">
            <div
              className={cn(
                "px-4 py-1.5 rounded-full text-[10px] sm:text-white font-medium uppercase tracking-widest transition-colors border",
                isHovered
                  ? "bg-white/10 border-white/20 text-white backdrop-blur-md"
                  : "bg-slate-100 border-slate-200 md:text-slate-500",
              )}
            >
              {post.category.name}
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 text-[10px] font-bold sm:text-stone-300 transition-colors",
                isHovered ? "md:text-stone-300" : "text-slate-400",
              )}
            >
              <Calendar size={12} />
              {new Date(post.createdAt).toLocaleDateString("es-PE", {
                year: "numeric",
                month: "short",
              })}
            </div>
          </div>

          {/* Bottom: Título y Acción */}
          <div className="space-y-6">
            <h3
              className={cn(
                "text-2xl md:text-3xl font-serif font-bold leading-tight tracking-tight transition-colors duration-500",
                // Blanco/Claro por defecto en móvil, Negro por defecto en Desktop (sm)
                "text-white",
                // Al hacer hover en desktop, se vuelve blanco
                isHovered ? "md:text-amber-200" : "",
              )}
            >
              {post.title}
            </h3>
            <div
              className={cn(
                "flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-500",
                isHovered
                  ? "text-[rgb(190,150,120)] translate-x-2"
                  : "text-slate-400",
              )}
            >
              Leer Artículo
              <motion.div
                animate={isHovered ? { x: 5, y: -5 } : { x: 0, y: 0 }}
              >
                <ArrowUpRight size={18} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
