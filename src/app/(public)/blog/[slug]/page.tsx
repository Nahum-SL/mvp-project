// src/app/(public)/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
// Views
import { BlogSlugView } from "@/src/modules/public/blog/slug/views/blog-slug-view";
// Api
import { getPostBySlug } from "@/src/modules/public/blog/api/blog-public.api";

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
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main>
      <BlogSlugView post={post} />
    </main>
  );
}
