// src/ui/buttons/AnimatedButton.tsx
"use client";

import { motion } from "framer-motion";
import { buttonMotion } from "@/src/lib/animations";
import { cn } from "@/src/lib/utils";
import { ReactNode } from "react";

type typeButton = "submit" | "button" | "reset";

interface Props {
  type?: typeButton;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedSendButton({
  type,
  disabled,
  children,
  className,
  onClick,
}: Props) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={buttonMotion.whileHover}
      whileTap={buttonMotion.whileTap}
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
