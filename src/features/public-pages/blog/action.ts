"use server";

import { BlogPost } from "@/src/types/blog/blogPost";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

  // Traemos los posts. Puedes añadir filtros en NestJS para traer solo los "published: true"
  const res = await fetch(`${API_URL}/post`, {
    next: { revalidate: 3600 }, // Cache por 1 hora
  });

  if (!res.ok) return [];
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";
  const res = await fetch(`${API_URL}/post/slug/${slug}`, {
    next: { revalidate: 3600 }, // Cache por 1 hora
  });
  if (!res.ok) return null;
  return res.json();
}
