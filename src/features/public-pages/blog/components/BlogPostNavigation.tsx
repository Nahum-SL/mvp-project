import Link from "next/link";
import { BlogPost } from "@/src/types/blog/blogPost";

export const BlogPostNavigation = ({
  prev,
  next,
}: {
  prev: BlogPost | null;
  next: BlogPost | null;
}) => {
  if (!prev || !next) return null;
  return (
    <div className="mt-20 pt-12 border-t border-slate-100">
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        <Link
          href={`/blog/${prev.slug}`}
          className="flex-1 group p-8 rounded-4xl border border-slate-200 hover:border-blue-600 transition-all bg-white"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl group-hover:-translate-x-2 transition-transform text-slate-300 group-hover:text-blue-600">
              ←
            </span>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Anterior
              </p>
              <h4 className="text-slate-900 font-bold group-hover:text-blue-600 transition-colors line-clamp-1">
                {prev.title}
              </h4>
            </div>
          </div>
        </Link>
        <Link
          href={`/blog/${next.slug}`}
          className="flex-1 group p-8 rounded-4xl bg-slate-900 border border-slate-900 hover:bg-blue-600 hover:border-blue-600 transition-all shadow-xl shadow-slate-900/10"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                Siguiente
              </p>
              <h4 className="text-white font-bold line-clamp-1">
                {next.title}
              </h4>
            </div>
            <span className="text-2xl group-hover:translate-x-2 transition-transform text-white">
              →
            </span>
          </div>
        </Link>
      </div>
      {/* Enlace de regreso al centro */}
      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="text-xs font-bold text-slate-400 hover:text-blue-600 uppercase tracking-[0.3em] transition-colors"
        >
          ••• Ver Blog Completo •••
        </Link>
      </div>
    </div>
  );
};
