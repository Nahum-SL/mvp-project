import type { Category } from "@/src/types/blog/category";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch("/api/admin/blog/category");
  if (!res.ok) {
    // Intentamos obtener el JSON estructurado por nuestro 'handleApiError'
    const errorBody = await res.json().catch(() => ({}));

    // Lanzamos el mensaje exacto que vino de NestJS/Route Handler
    throw new Error(errorBody.message ?? `HTTP Error ${res.status}`);
  }
  return await res.json();
}