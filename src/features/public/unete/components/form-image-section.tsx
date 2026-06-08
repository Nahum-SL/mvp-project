"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export function FormImageSection({ src, alt }: Props) {
  return (
    <div className="hidden lg:block relative w-full h-137.5 rounded-3xl overflow-hidden shadow-lg border border-slate-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full relative"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        {/* Un gradiente sutil superpuesto opcional para dar profundidad */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}
