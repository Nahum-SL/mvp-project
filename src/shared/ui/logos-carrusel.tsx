"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type CarruselImage = {
  src: string;
  alt: string;
};

interface LogosCarruselProps {
  title: string;
  subtitle?: string;
  images: CarruselImage[];
  reverse?: boolean;
}

export default function LogosCarrusel({
  title,
  subtitle,
  images,
  reverse = false,
}: LogosCarruselProps) {
  return (
    <section className="relative w-full bg-white py-12 overflow-hidden">
      {/* Gradientes laterales */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-40 bg-linear-to-r from-gray-100 to-transparent hidden md:block z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-40 bg-linear-to-l from-gray-100 to-transparent hidden md:block z-10" />

      {/* Header */}
      <header className="mb-8 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight bg-linear-to-r from-blue-700 to-slate-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="mt-2 text-sm md:text-base text-gray-500">{subtitle}</p>
      </header>

      {/* Carrusel */}
      <div className="group">
        <div
          className={`
            flex gap-6 w-max
            ${reverse ? "animate-scroll-reverse" : "animate-scroll"}
            group-hover:[animation-play-state:paused]
          `}
        >
          {/* Duplicado x2 */}
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex gap-6">
              {images.map((img, index) => (
                <CarruselItem
                  key={`${setIndex}-${index}`}
                  {...img}
                  ariaHidden={setIndex === 1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarruselItem({
  src,
  alt,
  ariaHidden = false,
}: {
  src: string;
  alt: string;
  ariaHidden?: boolean;
}) {
  return (
    <motion.div
      aria-hidden={ariaHidden}
      className="relative h-32 w-48 shrink-0 rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg cursor-pointer"
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <Image
        src={src}
        alt={ariaHidden ? "" : alt}
        fill
        sizes="(max-width: 768px) 160px, 192px"
        className="object-contain p-4"
        loading={ariaHidden ? "lazy" : "eager"}
      />
    </motion.div>
  );
}
