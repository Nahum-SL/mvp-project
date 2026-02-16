'use client';

import Image from "next/image";
import { cn } from "@/src/lib/utils";

import AnimatedButton from "../buttons/AnimatedButton";

interface Props {
  titleCard: string;
  Title: string;
  Subtitle: string;
  description: string;
  image?: string;
  className?: string;
}

export default function ArticleCard({
  titleCard,
  Title,
  Subtitle,
  description,
  image,
  className,
}: Props) {
  return (
    <article
      className={cn(
        "bg-white grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5",
        className
      )}
    >
      {/* Contenedor de Imagen: Ahora a la izquierda en Desktop */}
      {image && (
        <div className="relative w-full h-80 md:h-auto min-h-87.5 md:min-h-112.5 rounded-2xl overflow-hidden order-first">
          <Image
            src={image}
            alt={Title}
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      {/* Contenido: Alineado y con mejor jerarquía */}
      <div className="flex flex-col justify-center py-4">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-[0.15em] mb-4">
          {titleCard}
        </span>

        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-[1.1]">
          {Title}
        </h2>

        <h3 className="text-lg md:text-xl text-blue-700/80 mb-6">
          {Subtitle}
        </h3>

        <p className="text-slate-600 text-lg leading-relaxed mb-8 text-pretty">
          {description}
        </p>

        <div className="mt-auto">
          <AnimatedButton className="group inline-flex items-center bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-600  transition-all duration-300 shadow-lg shadow-blue-600/20">
            Agendar Sesión
            <svg 
              className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </AnimatedButton>
        </div>
      </div>
    </article>
  );
}