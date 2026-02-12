"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CarouselProps {
  items: { title: string; src: string; alt: string }[];
}

function FullWidthCarousel({ items }: CarouselProps) {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative w-full aspect-video md:aspect-21/9 overflow-hidden rounded-3xl bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-full w-full"
        >
          <Image src={items[index].src} alt={items[index].alt} fill className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10">
            <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic">{items[index].title}</h3>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 right-10 flex gap-2">
        {items.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`h-1 transition-all duration-300 ${i === index ? "w-8 bg-white" : "w-4 bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroCarouselSection(props: CarouselProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6"
    >
      <FullWidthCarousel {...props} />
    </motion.section>
  );
}