// src/features/public-pages/blog/containers/PostSlugContent.tsx
// EXPORTADO --> src/app/(public)/blog/[slug]/page.tsx
import { useNavigationPost } from "../hooks/use-navigation-post";

import { BlogSlugHero } from "./blog-slug-hero";
import { BlogPostNavigation } from "./blog-post-navigation";
import { BlogSidebar } from "./blog-sidebar";
import { PostLayoutWrapper } from "./post-layout-wrapper";
import { cn } from "@/src/lib/utils";
import type { BlogPost } from "@/src/types/blog/blogPost";

interface Props {
  post: BlogPost;
}

export default function PostSlugContent({ post }: Props) {
  const { prevPost, nextPost } = useNavigationPost(post.slug);

  return (
    <>
      <BlogSlugHero post={post} />

      <PostLayoutWrapper sidebar={<BlogSidebar post={post} />}>
        <p className="text-sm md:text-[13px] lg:text-xl text-slate-400 font-medium 
        leading-relaxed mb-12 border-l-4 border-purple-600 pl-8 italic">
          {post.excerpt}
        </p>
        <div
          className={cn(
            "tiptap prose prose-invert prose-lg max-w-none text-white", // Añadimos 'tiptap'
            "prose-headings:text-white prose-headings:font-extrabold prose-headings:tracking-tighter",
            "prose-p:text-slate-400 prose-p:leading-relaxed",
            "prose-strong:text-sky-400 prose-strong:font-bold",
            "prose-img:rounded-[2.5rem] prose-img:border prose-img:border-slate-800",
            "marker:text-sky-500",
            "prose-ul:list-disc prose-ul:pl-6",
            "prose-ol:list-decimal prose-ol:pl-6",
            "prose-li:text-slate-400",
          )}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <BlogPostNavigation prev={prevPost} next={nextPost} />
      </PostLayoutWrapper>
    </>
  );
}
