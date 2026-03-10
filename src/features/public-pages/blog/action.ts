"use server";

import { BlogPost } from "@/src/types/blog/blogPost";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Traemos los posts. Puedes añadir filtros en NestJS para traer solo los "published: true"
  const res = await fetch(`${API_URL}/post`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${API_URL}/post/slug/${slug}`, {
    next: { revalidate: 60 }, // Cache por 1 minuto
  });
  if (!res.ok) return null;
  return res.json();
}

// src/features/public-pages/blog/action.ts

// ... (tu función getPostBySlug ya existente)

export async function getNavigationPosts(currentSlug: string) {
  try {
    const API_URL = process.env.NEST_API_URL || "http://localhost:3001";
    const res = await fetch(`${API_URL}/post`, { next: { revalidate: 3600 } });
    const response = await res.json();
    const posts: BlogPost[] = Array.isArray(response)
      ? response
      : response?.data || [];

    const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
    if (currentIndex === -1) return { prevPost: null, nextPost: null };

    return {
      prevPost: posts[(currentIndex - 1 + posts.length) % posts.length],
      nextPost: posts[(currentIndex + 1) % posts.length],
    };
  } catch (error) {
    console.error("NAV_ERROR: ", error);
    return { prevPost: null, nextPost: null };
  }
}
