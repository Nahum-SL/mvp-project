// src/components/ui/icons/EyeIcon.tsx
"use client";
import { motion } from "framer-motion";

export const EyeIcon = ({ isBlinking }: { isBlinking: boolean }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />

      <motion.circle
        cx="12"
        cy="12"
        r="3"
        animate={isBlinking ? { scale: [1, 0.5, 1] } : { scale: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* El párpado que se cierra y abre al parpadear */}
      <motion.path
        d="M2 12s3-7 10-7 10 7 10 7"
        initial={false}
        animate={
          isBlinking
            ? {
                d: [
                  "M2 12s3-7 10-7 10 7 10 7", // Abierto
                  "M2 12c3 0 10 0 10 0", // Cerrado
                  "M2 12s3-7 10-7 10 7 10 7", // Abierto
                ],
              }
            : { d: "M2 12s3-7 10-7 10 7 10 7" }
        }
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};
