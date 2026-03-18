// src/features/public-pages/blog/containers/PostSlugContent.tsx
import { notFound } from "next/navigation";
import { getPostBySlug, getNavigationPosts } from "../public-pages/blog/action";
import { BlogSlugHero } from "../public-pages/blog/components/BlogSlugHero";
import { BlogPostNavigation } from "../public-pages/blog/components/BlogPostNavigation";
import { BlogSidebar } from "../public-pages/blog/components/BlogSidebar";

interface Props {
  params: Promise<{slug: string}>;
}

export default async function PostSlugContent({ params }: Props) {
  const { slug } = await params;
  
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { prevPost, nextPost } = await getNavigationPosts(slug);

  return (
    <>
      <BlogSlugHero post={post} />
      <div className="container mx-auto px-6 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8 bg-slate-900/50 border border-slate-800 p-8 md:p-14 rounded-[3.5rem] backdrop-blur-sm shadow-2xl">
            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-12 border-l-4 border-sky-500 pl-8 italic">
              {post.excerpt}
            </p>
            <div
              className="prose prose-invert prose-lg max-w-none text-white
              prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter
              prose-p:text-slate-400 prose-p:leading-relaxed
              prose-strong:text-sky-400 prose-strong:font-bold
              prose-img:rounded-[2.5rem] prose-img:border prose-img:border-slate-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <BlogPostNavigation prev={prevPost} next={nextPost} />
          </article>

          <aside className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <BlogSidebar post={post} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
