"use client";

import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { ReactNode } from "react";

interface FadeOnScrollProps {
  children: ReactNode;
  className?: string;
  fadeStart?: number; // px donde empieza
  fadeEnd?: number;   // px donde termina
  yOffset?: number;   // desplazamiento vertical
}

export default function FadeOnScroll({
  children,
  className,
  fadeStart = 0,
  fadeEnd = 300,
  yOffset = -50,
}: FadeOnScrollProps) {
  const { scrollY } = useScroll();

  const opacity: MotionValue<number> = useTransform(
    scrollY,
    [fadeStart, fadeEnd],
    [1, 0]
  );

  const y: MotionValue<number> = useTransform(
    scrollY,
    [fadeStart, fadeEnd],
    [0, yOffset]
  );

  return (
    <section className="fixed w-full top-0 bg-black text-white z-0 justify-center">
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>

    </section>
  );
}
