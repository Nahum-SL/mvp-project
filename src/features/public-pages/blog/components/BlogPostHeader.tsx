import Image from "next/image";
import { User, Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/src/types/blog/blogPost";

export const BlogPostHeader = ({ post }: { post: BlogPost }) => (
  <header className="relative h-[60vh] min-h-100 w-full overflow-hidden">
    <Image
      src={post.image}
      alt={post.title}
      fill
      priority
      className="object-cover brightness-[0.4]"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="container max-w-4xl px-6 text-center">
        <span className="block mb-4 text-blue-400 font-black uppercase tracking-[0.3em] text-xs">
          {post.category.name}
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 italic">
          {post.title}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-6 text-white/60 text-sm font-medium">
          <span className="flex items-center gap-2">
            <User size={16} className="text-blue-400" /> {post.author.name}
          </span>
          <span className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-400" />{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-blue-400" /> {post.readingTime} min
          </span>
        </div>
      </div>
    </div>
  </header>
);
