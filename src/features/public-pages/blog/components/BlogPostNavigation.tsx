// src/features/public-pages/blog/components/BlogPostNavigation.tsx
import Link from "next/link";
import { BlogPost } from "@/src/types/blog/blogPost";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";

export const BlogPostNavigation = ({
  prev,
  next,
}: {
  prev: BlogPost | null;
  next: BlogPost | null;
}) => {
  if (!prev && !next) return null;

  return (
    <div className="mt-20 pt-16 border-t border-slate-800/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* POST ANTERIOR */}
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group relative flex flex-col p-8 rounded-[2.5rem] bg-slate-900/30 border border-slate-800 hover:border-sky-500/50 transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4 text-sky-500">
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-2"
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Anterior
                </span>
              </div>
              <h4 className="text-white font-serif text-lg md:text-xl leading-tight line-clamp-2 transition-colors group-hover:text-sky-400">
                {prev.title}
              </h4>
            </div>
            {/* Efecto de luz de fondo sutil al hover */}
            <div className="absolute inset-0 bg-linear-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ) : (
          <div className="hidden md:block" /> // Espaciador si no hay anterior
        )}

        {/* SIGUIENTE POST */}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group relative flex flex-col p-8 rounded-[2.5rem] bg-slate-900/30 border border-slate-800 hover:border-emerald-500/50 transition-all duration-500 text-right overflow-hidden"
          >
            <div className="relative z-10 flex flex-col h-full items-end">
              <div className="flex items-center gap-2 mb-4 text-emerald-500">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Siguiente
                </span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-2"
                />
              </div>
              <h4 className="text-white font-serif text-lg md:text-xl leading-tight line-clamp-2 transition-colors group-hover:text-emerald-400">
                {next.title}
              </h4>
            </div>
            <div className="absolute inset-0 bg-linear-to-bl from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>

      {/* Botón de Regreso Minimalista */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/blog"
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300"
        >
          <LayoutGrid size={14} />
          Explorar todos los artículos
        </Link>
      </div>
    </div>
  );
};
