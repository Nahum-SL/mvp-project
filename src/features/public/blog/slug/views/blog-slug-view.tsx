import PostSlugContent from "@/src/features/public/blog/slug/components/post-slug-content";
import { ReadingProgressBar } from "@/src/features/public/blog/slug/components/reading-progress-bar";
import type { BlogPost } from "@/src/types/blog/blogPost";

interface Props {
  post: BlogPost;
}

export function BlogSlugView({ post }: Props) {
  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <ReadingProgressBar />

      <PostSlugContent post={post} />
    </main>
  );
}
