// src/features/public-pages/blog/containers/PostSlugContent.tsx
// EXPORTADO --> src/app/(public)/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getPostBySlug, getNavigationPosts } from "../public-pages/blog/action";
import { BlogSlugHero } from "../public-pages/blog/components/BlogSlugHero";
import { BlogPostNavigation } from "../public-pages/blog/components/BlogPostNavigation";
import { BlogSidebar } from "../public-pages/blog/components/BlogSidebar";
import { PostLayoutWrapper } from "@/src/features/containers/PostLayoutWrapper";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostSlugContent({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { prevPost, nextPost } = await getNavigationPosts(slug);

  return (
    <>
      <BlogSlugHero post={post} />

      <PostLayoutWrapper sidebar={<BlogSidebar post={post} />}>
        <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-12 border-l-4 border-sky-500 pl-8 italic">
          {post.excerpt}
        </p>
        <div
          className="prose prose-invert prose-lg max-w-none text-white
              prose-headings:text-white prose-headings:font-extrabold prose-headings:tracking-tighter
              prose-p:text-slate-400 prose-p:leading-relaxed
              prose-strong:text-sky-400 prose-strong:font-bold
              prose-img:rounded-[2.5rem] prose-img:border prose-img:border-slate-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <BlogPostNavigation prev={prevPost} next={nextPost} />
      </PostLayoutWrapper>
    </>
  );
}
