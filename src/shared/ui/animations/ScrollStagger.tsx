"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollStaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export default function ScrollStagger({
  children,
  className,
  stagger = 0.1,
}: ScrollStaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
