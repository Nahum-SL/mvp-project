import type { BlogPost } from "@/src/types/blog/blogPost";

export async function getAdminPost(): Promise<BlogPost[]> {
  const res = await fetch("/api/admin/blog/posts");
  if (!res.ok) {
    // Intentamos obtener el JSON estructurado por nuestro 'handleApiError'
    const errorBody = await res.json().catch(() => ({}));

    // Lanzamos el mensaje exacto que vino de NestJS/Route Handler
    throw new Error(errorBody.message ?? `HTTP Error ${res.status}`);
  }
  return await res.json();
}

export async function getPostById(id: number): Promise<BlogPost> {
  const res = await fetch(`/api/admin/blog/posts/${id}`);
  if (!res.ok) {
    // Intentamos obtener el JSON estructurado por nuestro 'handleApiError'
    const errorBody = await res.json().catch(() => ({}));

    // Lanzamos el mensaje exacto que vino de NestJS/Route Handler
    throw new Error(errorBody.message ?? `HTTP Error ${res.status}`);
  }
  return await res.json();
}
