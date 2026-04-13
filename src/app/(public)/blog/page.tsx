// src/app/(public)/blog/page.tsx
import { Suspense } from "react";
import { BlogHero } from "@/src/components/sections/BlogHero";
import BlogContent from "@/src/features/public-web/blog/components/BlogContent";
import BlogSkeleton from "@/src/components/skeletons/BlogSkeleton";

export default function BlogPage() {
  return (
    <main className="bg-slate-950">
      <BlogHero
        title="Recursos y Blogs"
        subtitle="Descubre análisis, tips y contenido actualizado sobre contabilidad, finanzas y normativa empresarial."
      />

      {/* Suspense solo envuelve el contenido que requiere la API */}
      <Suspense fallback={<BlogSkeleton />}>
        <BlogContent />
      </Suspense>
    </main>
  );
}
