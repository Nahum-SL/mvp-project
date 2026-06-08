// src/features/public-pages/blog/components/tools/ToolsAnimationWrapper.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export const ToolsAnimationWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-12 bg-slate-950 border-y border-slate-900"
    >
      {children}
    </motion.section>
  );
};
