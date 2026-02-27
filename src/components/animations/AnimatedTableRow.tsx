"use client";

import { motion } from "framer-motion";
import { tableRowVariant } from "@/src/lib/animations";
import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface AnimatedTableRowProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export default function AnimatedTableRow({
  children,
  index,
  className,
}: AnimatedTableRowProps) {
  return (
    <motion.tr
      variants={tableRowVariant}
      initial="hidden"
      animate="visible"
      custom={index}
      className={cn("group hover:bg-blue-50/30 transition-colors", className)}
    >
      {children}
    </motion.tr>
  );
}
