// src/app/(public)/blog/[slug]/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getNavigationPosts,
} from "@/src/features/public-pages/blog/action";
import { BlogPostHeader } from "@/src/features/public-pages/blog/components/BlogPostHeader";
import { BlogPostNavigation } from "@/src/features/public-pages/blog/components/BlogPostNavigation";
import { BlogPostFooter } from "@/src/features/public-pages/blog/components/BlogPostFooter";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return { title: `${post.title} | Blog ASESCON`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { prevPost, nextPost } = await getNavigationPosts(slug);

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <BlogPostHeader post={post} />

      <div className="container max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        <article className="bg-white p-8 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50">
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-12 border-l-4 border-blue-600 pl-6 italic">
            {post.excerpt}
          </p>

          <div
            className="prose prose-slate prose-lg max-w-none 
            prose-headings:text-slate-900 prose-headings:font-black prose-headings:italic
            prose-p:text-slate-600 prose-p:leading-relaxed
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-img:rounded-[2rem] prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <Suspense
            fallback={
              <div className="h-24 w-full bg-slate-50 animate-pulse rounded-2xl" />
            }
          >
            <BlogPostNavigation prev={prevPost} next={nextPost} />
          </Suspense>
        </article>

        <BlogPostFooter />
      </div>
    </main>
  );
}
