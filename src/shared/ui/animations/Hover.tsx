"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeProps {
  children: ReactNode;
  delay?: number;
}

export default function Hover({ children }: FadeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
