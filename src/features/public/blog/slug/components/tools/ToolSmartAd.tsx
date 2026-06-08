// src/features/public-pages/blog/components/tools/ToolSmartAd.tsx
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  condition: boolean;
  text: string;
  link: string;
  label: string;
}

export const ToolSmartAd = ({ condition, text, link, label }: Props) => (
  <AnimatePresence>
    {condition && (
      <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative mt-6 p-4 bg-sky-500/10 border border-sky-500/30 
        rounded-2xl overflow-hidden group"
      >
        <p className="text-[11px] text-slate-400 font-medium leading-tight">
          {text}
        </p>
        <Link
          href={link}
          className="text-[10px] text-sky-400 font-extrabold uppercase tracking-widest mt-2 flex items-center gap-1 hover:text-sky-300 transition-colors"
        >
          {label} →
        </Link>
      </motion.div>
    )}
  </AnimatePresence>
);
