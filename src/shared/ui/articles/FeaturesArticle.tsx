"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { imagenes } from "../../types/logosHome";
// Definimos la interfaz de UN solo artículo
interface FeatureCardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  span: string;
}

// Componente de UI para la Card Principal
function MainArticleCard({
  src,
  alt,
  title,
  description,
  span,
}: FeatureCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="md:col-span-2 relative aspect-4/5 md:aspect-auto md:h-125 rounded-3xl overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-900/20 to-transparent z-10" />
      <Image
        src={src}
        alt={alt}
        fill // Usamos fill para que ocupe todo el contenedor relativo
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute bottom-0 p-8 z-20">
        <span className="bg-brand-primary px-3 py-1 rounded-full text-xs font-bold text-white">
          {span}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
          {title}
        </h2>
        <p className="text-zinc-300 mt-2 max-w-xl">{description}</p>
      </div>
    </motion.article>
  );
}

// Componente Principal que organiza el Grid
export default function FeaturedArticle() {
  const principal = imagenes[0]; // Tomamos el primer elemento para el principal
  const secundarios = imagenes.slice(1, 3); // Tomamos los siguientes para el lateral

  return (
    <section className="pt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Renderizamos el principal pasando las props individuales */}
        <MainArticleCard
          src={principal.src}
          alt={principal.alt}
          title={principal.title}
          description={principal.description}
          span={principal.span}
        />

        {/* Artículos Secundarios mapeados */}
        <div className="flex flex-col gap-6">
          {secundarios.map((img) => (
            <motion.article
              key={img.id}
              whileHover={{ x: 5 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-center"
            >
              <h3 className="text-xl font-bold text-white">{img.title}</h3>
              <p className="text-zinc-400 text-sm mt-2">{img.description}</p>
              <a
                href="#"
                className="text-brand-primary font-semibold mt-4 inline-flex items-center gap-2"
              >
                Leer más →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
