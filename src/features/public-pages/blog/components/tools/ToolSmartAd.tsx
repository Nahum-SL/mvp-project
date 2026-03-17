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
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-6 p-4 bg-sky-500/5 border border-sky-500/20 rounded-2xl overflow-hidden"
      >
        <p className="text-[11px] text-slate-400 font-medium leading-tight">
          {text}
        </p>
        <Link
          href={link}
          className="text-[10px] text-sky-400 font-black uppercase tracking-widest mt-2 flex items-center gap-1 hover:text-sky-300 transition-colors"
        >
          {label} →
        </Link>
      </motion.div>
    )}
  </AnimatePresence>
);
