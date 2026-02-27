// src/lib/animations.ts
"use client";

import { Variants } from "framer-motion";

/* ================================
  FADE IN 
================================ */

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

/* ================================
  STAGGER CONTAINET (CON TELARAÑAS XD) 
================================ */

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

/* ================================
  TABLE ROW         -    export ==> src/components/animations/AnimatedTableRow.tsx 
================================ */
export const tableRowVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: index * 0.05,
      ease: "easeOut",
    },
  }),
};

/* ================================
  BUTTON 
================================ */

export const buttonMotion = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

/* ================================
   BADGE
================================ */

export const badgeVariant: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};
