"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const items = [
  { id: 1, src: "/ejemplo.jpeg" },
  { id: 2, src: "/ejemplo.jpeg" },
  { id: 3, src: "/ejemplo.jpeg" },
];

export default function Carousel3D() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex items-center justify-center gap-4 py-10 overflow-hidden">
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <motion.div
            key={item.id}
            onClick={() => setActive(i)}
            animate={{
              scale: isActive ? 1.1 : 0.85,
              opacity: isActive ? 1 : 0.4,
              z: isActive ? 0 : -100,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`cursor-pointer shrink-0 w-64 h-80 rounded-2xl overflow-hidden shadow-xl border-2 ${
              isActive ? "border-brand-primary" : "border-transparent"
            }`}
          >
            <Image 
              src={item.src}
              alt="slide"
              sizes="(max-width: 1200px) 150vw, (max-width: 1900px) 90vw, 63vw"
              fill
              className="w-full h-full object-cover"
            />
          </motion.div>
        );
      })}
    </div>
  );
}