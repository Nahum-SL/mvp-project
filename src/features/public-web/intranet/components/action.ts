'use server';
import { API_URL } from "@/src/lib/api-url";

export async function getLinks() {
  // 1. Ya no buscamos el token aquí para la vista pública
  try {
    const res = await fetch(`${API_URL}/api/intranet/public-links`, {
      // 2. Quitamos el Authorization Header
      next: { revalidate: 3600 }, // Como es público, podemos cachear más tiempo (1 hora)
    });

    if (!res.ok) return { links: [] };
    return res.json();
  } catch (e) {
    // console.error("FETCH_PUBLIC_LINKS_ERROR", e);
    return { links: [] };
  }
}
