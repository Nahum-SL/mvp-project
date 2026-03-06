import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, User } from "lucide-react";
import { getPostBySlug } from "@/src/features/public-pages/blog/action";
import { BlogPost } from "@/src/types/blog/blogPost";

interface Props {
  params: Promise<{ slug: string }>; // En versiones recientes es una Promise
}

export async function generateStaticParams() {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";
  const res = await fetch(`${API_URL}/post`);
  const posts: BlogPost[] = await res.json();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return {
    title: `${post.title} | Blog ASESCON`,
    description: post.excerpt,
    // ... tus otros metadatos (OG, Twitter) están perfectos
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header del Artículo */}
      <header className="relative h-[60vh] min-h-100 w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover brightness-[0.4]"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container max-w-4xl px-6 text-center">

            <span className="block mb-4 text-blue-400 font-black uppercase tracking-[0.3em] text-xs">
              {post.category.name}
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 italic">
              {post.title}
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-6 text-white/60 text-sm font-medium">
              <span className="flex items-center gap-2">
                <User size={16} className="text-blue-400" /> {post.author.name}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-400" />{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-blue-400" /> {post.readingTime}{" "}
                min de lectura
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <div className="container max-w-4xl px-6 -mt-20 relative z-10">
        <article className="bg-white p-8 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50">
          {/* El extracto resaltado */}
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-12 border-l-4 border-blue-600 pl-6 italic">
            {post.excerpt}
          </p>

          {/* Renderizado de TipTap con Tailwind Typography */}
          <div
            className="prose prose-slate prose-lg max-w-none 
            prose-headings:text-slate-900 prose-headings:font-black prose-headings:italic
            prose-p:text-slate-600 prose-p:leading-relaxed
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-img:rounded-[2rem] prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Footer del Post */}
        <footer className="mt-12 p-8 bg-blue-600 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-black italic">
              ¿Necesitas asesoría personalizada?
            </h4>
            <p className="text-blue-100">
              En ASESCON estamos listos para ayudarte con este y otros temas.
            </p>
          </div>
          <Link
            href="/contacto"
            className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-slate-100 transition-colors uppercase text-sm tracking-widest"
          >
            Contactar ahora
          </Link>
        </footer>
      </div>
    </main>
  );
}
