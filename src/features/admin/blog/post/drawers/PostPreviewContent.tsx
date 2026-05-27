import type { BlogPost } from "@/src/types/blog/blogPost";
import Image from "next/image";

interface Props {
  post: BlogPost;
}

export function PostPreviewContent({ post }: Props) {
  return (
    <div className="space-y-6">
      {/* Banner / Portada */}
      {post.image && (
        <div className="relative w-full h-44 rounded-3xl overflow-hidden border border-slate-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Encabezados Básicos */}
      <div className="space-y-2">
        <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 tracking-wider">
          {post.category?.name || "General"}
        </span>
        <h2 className="text-xl font-black text-slate-900 uppercase leading-tight italic">
          {post.title}
        </h2>
      </div>

      {/* Resumen SEO */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">
          Resumen Ejecutivo (SEO Excerpt)
        </span>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          {post.excerpt || "Sin resumen ejecutivo redactado."}
        </p>
      </div>

      {/* Cuerpo HTML Inyectado del Editor */}
      <div className="space-y-1.5">
        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">
          Cuerpo del Artículo
        </span>
        <article
          className="prose prose-sm max-w-none text-slate-700 text-xs font-medium leading-relaxed bg-white border border-slate-100 p-4 rounded-2xl max-h-80 overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
