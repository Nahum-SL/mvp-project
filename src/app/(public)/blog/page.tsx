// src/app/(public)/blog/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { BlogViews } from "@/src/features/public/blog/views/blog-views";
// Api
import { getPublicPosts } from "@/src/actions/blog/post-public.query";

export default async function BlogPage() {
  const posts = await getPublicPosts();

  if (!posts) {
    notFound();
  }
  return (
    <main>
      <Suspense fallback={<div>Cargando...</div>}>
        <BlogViews post={posts} />
      </Suspense>
    </main>
  );
}
