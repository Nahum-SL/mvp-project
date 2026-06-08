"use server";

import type { BlogPost } from "@/src/types/blog/blogPost";
import { API_URL } from "@/src/lib/api-url";
// Manejo de fetchs
import { serverApiClient } from "@/src/lib/server-api-client";

export async function getPublicPosts(): Promise<BlogPost[]> {
  try {
    const posts = await serverApiClient("/post/public", {
      next: { revalidate: 3600 },
    });
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${API_URL}/api/post/slug/${slug}`, {
    next: { revalidate: 60 }, // Cache por 1 minuto
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getRecentPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_URL}/api/post?limit=3`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];

    const data = await res.json();

    // Validamos si NestJS envía el array directo o dentro de un objeto { data: [...] }
    return Array.isArray(data) ? data : data.data || [];
  } catch (e) {
    return [];
  }
}

// ... (tu función getPostBySlug ya existente)
export async function getNavigationPosts(currentSlug: string) {
  try {
    const res = await fetch(`${API_URL}/api/post`, {
      next: { revalidate: 3600 },
    });
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
    return { prevPost: null, nextPost: null };
  }
}
