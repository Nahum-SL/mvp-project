"use client";

import {
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface CarouselItem {
  id: number; // 👈 agregado
  titleCard: string;
  src: string;
  alt: string;
}

interface Props {
  id?: number; // 👈 id del contenedor
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const CarouselFade = forwardRef<HTMLDivElement, Props>(
  (
    {
      id,
      items,
      autoPlay = true,
      interval = 6000,
      className = "",
    },
    ref
  ) => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const next = useCallback(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const prev = useCallback(() => {
      setIndex((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length]);

    useEffect(() => {
      if (!autoPlay || items.length === 0) return;

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      timeoutRef.current && clearInterval(timeoutRef.current);
      timeoutRef.current = setInterval(next, interval);

      return () => {
        if (timeoutRef.current) clearInterval(timeoutRef.current);
      };
    }, [autoPlay, interval, next, items.length]);

    if (!items.length) return null;

    return (
      <div
        id="1"
        ref={ref}
        className={`relative py-12 w-full max-w-5xl mx-auto overflow-hidden rounded-2xl ${className}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={items[index].id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-75 md:h-112.5"
          >
            <Image
              src={items[index].src}
              alt={items[index].alt}
              fill
              priority={index === 0}
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
              <h3 className="text-white text-lg md:text-2xl font-semibold">
                {items[index].titleCard}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Flecha izquierda */}
        <button
          onClick={prev}
          aria-label="Imagen anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition"
        >
          <ChevronLeft className="text-white" />
        </button>

        {/* Flecha derecha */}
        <button
          onClick={next}
          aria-label="Siguiente imagen"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition"
        >
          <ChevronRight className="text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "bg-white w-6"
                  : "bg-white/50 w-2 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }
);

CarouselFade.displayName = "CarouselFade";

export default CarouselFade;
