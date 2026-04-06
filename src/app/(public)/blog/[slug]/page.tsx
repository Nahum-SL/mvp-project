// src/app/(public)/blog/[slug]/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/src/features/public-web/blog/action";
import PostSlugContent from "@/src/features/containers/PostSlugContent";
import { ReadingProgressBar } from "@/src/features/public-web/blog/components/ReadingProgressBar";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return { title: `${post.title} | ASESCON`, description: post.excerpt };
}

export default async function BlogSlugPage({ params }: Props) {

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <ReadingProgressBar />

      {/* Envolvemos el contenido pesado. 
          El fallback puede ser un esqueleto o simplemente un espacio vacío 
          para que el Navbar no espere al post.
      */}
      <Suspense fallback={<BlogSkeleton />}>
        <PostSlugContent params={params} />
      </Suspense>

    </main>
  );
}

// Un pequeño componente de carga para que no sea un salto brusco
function BlogSkeleton() {
  return (
    <div className="container mx-auto px-6 pt-32 animate-pulse">
      <div className="h-64 bg-slate-900 rounded-[3.5rem] mb-12" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 h-96 bg-slate-900 rounded-[3.5rem]" />
        <div className="lg:col-span-4 h-96 bg-slate-900 rounded-[3.5rem]" />
      </div>
    </div>
  );
}
