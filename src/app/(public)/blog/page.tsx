// src/app/(public)/blog/page.tsx
import { notFound } from "next/navigation";

import { BlogViews } from "@/src/modules/public/blog/views/blog-views";
// Api
import { getPublicPosts } from "@/src/actions/blog/post-public.query";

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
