"use client";
import { motion } from "framer-motion";

interface DeepArticleProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function DeepArticle ({ title, subtitle, description }: DeepArticleProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="group border-l-4 border-slate-950 bg-white p-8 transition-all hover:bg-slate-50 md:p-12"
    >
      <p className="mb-2 text-sm font-bold tracking-[0.3em] uppercase text-slate-500">
        {subtitle}
      </p>
      <h2 className="mb-6 text-4xl font-extrabold tracking-tighter text-slate-950 md:text-5xl">
        {title}
      </h2>
      <div className="max-w-prose">
        <p className="text-lg leading-relaxed text-slate-600">
          {description}
        </p>
      </div>
      <motion.div 
        className="mt-8 h-1 w-12 bg-slate-950 transition-all group-hover:w-24" 
      />
    </motion.article>
  );
};