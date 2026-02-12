"use client";
import { motion } from "framer-motion";

interface GhostArticleProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function GhostArticle ({ title, subtitle, description }: GhostArticleProps) {
  return (
    <motion.article 
      className="relative flex flex-col border border-slate-200 bg-white p-1 transition-all hover:border-slate-950"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="border border-slate-100 p-8 space-y-4 transition-colors group-hover:border-slate-950">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-950/10" />
          <span className="text-[10px] font-black uppercase text-slate-950/40">{subtitle}</span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-950 leading-none">
          {title}
        </h2>
        
        <p className="text-sm text-slate-500 line-clamp-2">
          {description}
        </p>
        
        <div className="pt-4 flex justify-end">
          <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.article>
  );
};