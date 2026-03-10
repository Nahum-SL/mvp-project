// src/app/(public)/blog/page.tsx
import { Suspense } from "react";
import { BlogHeader } from "@/src/components/sections/BlogHeader";
import BlogContent from "@/src/features/public-pages/blog/components/BlogContent";
import BlogSkeleton from "@/src/components/skeletons/BlogSkeleton";

export default function BlogPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <BlogHeader
        title="Recursos y Artículos"
        subtitle="Descubre análisis, tips y contenido actualizado sobre contabilidad, finanzas y normativa empresarial."
        backgroundImage="/asesoria-niif.webp"
      />

      {/* Suspense solo envuelve el contenido que requiere la API */}
      <Suspense fallback={<BlogSkeleton />}>
        <BlogContent />
      </Suspense>
    </main>
  );
}
