"use client";

import { motion } from "framer-motion";

interface AboutHeaderProps {
  title: string;
  description: string;
}

export default function AboutHeaderOverlay({
  title,
  description,
}: AboutHeaderProps) {
  return (
    <section className="relative min-h-screen w-screen flex items-center justify-center text-white px-14">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg text-white/80"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
