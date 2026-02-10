"use client";

import Hover from "../../animations/Hover";

import Link from "next/link";
import Image from "next/image";

type ArticleCard = {
  id: number;
  title: string;
  subtitle: string;
  image?: string;
  href: string;
};

interface ArticleHomeProps {
  title: string;
  cards: ArticleCard[];
}

function ArticleCard({
  title,
  subtitle,
  image,
  href,
}: Omit<ArticleCard, "id">) {
  return (
    <Link href={href} className="block h-full">
      <article
        className={`
          relative
          rounded-xl
          overflow-hidden
          text-white
          transition-all
          duration-300
          bg-linear-to-tl
          from-[rgba(32,35,91,0.8)]
          to-[rgba(7,9,33,0.9)]
          /* Ajuste de dimensiones: h-full para que todas midan lo mismo */
          ${image ? "aspect-3/4 w-full" : "min-h-55 w-full"}
        `}
      >
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover -z-10 opacity-60 group-hover:opacity-80 transition-opacity"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Overlay con Flex para empujar el contenido */}
        <div className="relative z-10 flex flex-col h-full bg-black/20 hover:bg-black/10 transition-colors">
          <header className="p-6">
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p className="text-sm line-clamp-3 text-gray-200">{subtitle}</p>
          </header>

          <div className="mt-auto p-6">
            <div className="w-full h-px bg-white/20" />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ArticleHome({ title, cards }: ArticleHomeProps) {
  return (
    <section className="pt-10 border-t border-brand-black/10 relative mb-20">
      <div className="px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="w-full max-w-lg text-pretty text-center mx-auto font-semibold text-4xl text-shadow-lg py-4">
            {title}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 justify-center">
            {cards.map((card) => (
              <Hover key={card.id}>
                <li className="w-full list-none">
                  <ArticleCard {...card} />
                </li>
              </Hover>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
