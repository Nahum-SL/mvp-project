import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/src/types/blog/blogPost";

export const BlogSlugHero = ({ post }: { post: BlogPost }) => (
  <header className="relative h-[70vh] min-h-125 md:h-[60vh] pt-20 w-full overflow-hidden">
    <Image
      src={post.image}
      alt={post.title}
      fill
      sizes="100vw"
      quality={75}
      className="object-cover brightness-[0.2]"
    />
    {/* Transparencia */}
    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />

    <div className="absolute inset-0 flex items-center">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <span
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-sky-500/10 border 
          border-sky-500/20 text-sky-400 font-extrabold uppercase tracking-[0.3em] text-[10px]"
          >
            {post.category.name}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white 
          leading-[0.9] mb-8 tracking-tighter">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-8 text-slate-400 text-xs font-extrabold uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-sky-500" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-sky-500" /> {post.readingTime}{" "}
              MIN
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
);
