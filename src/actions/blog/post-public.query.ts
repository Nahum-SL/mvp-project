import type { BlogPost } from "@/src/types/blog/blogPost";
// Manejo de fetchs
import { apiClient } from "@/src/lib/api/api-client";
import { ApiResponse } from "@/src/shared";

export async function getPublicPosts(): Promise<BlogPost[]> {
  try {
    const response = await apiClient<ApiResponse<BlogPost[]>>("/post/public", {
      next: { revalidate: 3600 },
    });

    return response.data;
  } catch (error) {
    console.error("ERROR GET PUBLIC POSTS:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await apiClient<ApiResponse<BlogPost>>(`/post/slug/${slug}`, {
      next: { revalidate: 60 }, // Cache por 1 minuto
    });

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
  

}

export async function getRecentPosts(): Promise<BlogPost[]> {
  try {
    const res = await apiClient<ApiResponse<BlogPost[]>>("/post?limit=3", {
      next: { revalidate: 600 },
    });

    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

// ... (tu función getPostBySlug ya existente)
export async function getNavigationPosts(currentSlug: string) {
  try {
    const res = await apiClient<ApiResponse<BlogPost[]>>("/post", {
      next: { revalidate: 3600 },
    });

    const response = res.data;
    const posts = response || [];
    
    const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
    if (currentIndex === -1) return { prevPost: null, nextPost: null };

    return {
      prevPost: posts[(currentIndex - 1 + posts.length) % posts.length],
      nextPost: posts[(currentIndex + 1) % posts.length],
    };
  } catch (error) {
    console.error("ERROR GET NAVIGATION POSTS:", error);
    return { prevPost: null, nextPost: null };
  }
}
