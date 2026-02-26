import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost } from "@/src/types/blog/blogPost";

interface Props {
  params: { slug: string };
}

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001/blog";
  const res = await fetch(`${API_URL}/posts/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

// Esta función se ejecuta en el servidor antes de renderizar la página
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  return {
    title: `${post.title} | Blog ASESCON`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://asescon.com/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}
