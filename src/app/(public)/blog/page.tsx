// src/app/(public)/blog/page.tsx
import { notFound } from "next/navigation";

import { BlogViews } from "@/src/features/public/blog/views/blog-views";
// Api
import { getPublicPosts } from "@/src/features/public/blog/api/blog-public.api";

export default async function BlogPage() {
  const posts = await getPublicPosts();

  if (!posts) {
    notFound();
  }
  return (
    <main>
      <BlogViews post={posts} />
    </main>
  );
}
