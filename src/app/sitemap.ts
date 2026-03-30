// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { API_URL } from "@/src/lib/api-url";

interface SitemapItem {
  slug: string;
  updatedAt: string | Date;
}



const BASE_URL = "https://asescon-frontend.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Rutas Estáticas (Tipado automático por Next.js)
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/nosotros",
    "/servicios",
    "/intranet",
    "/contacto",
    "/blog",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Rutas de Servicios (Consumo de NestJS)
  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/api/servicio`);
    const services: SitemapItem[] = await res.json(); // <--- Tipado aquí

    serviceRoutes = services.map((s) => ({
      url: `${BASE_URL}/servicio/${s.slug}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (e) {
    // console.error("Sitemap Services Error:", e);
    return staticRoutes; // Si falla, devolvemos solo las rutas estáticas
  }

  // 3. Rutas de Blog (Consumo de NestJS)
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/api/post`);
    const posts: SitemapItem[] = await res.json(); // <--- Tipado aquí

    blogRoutes = posts.map((p) => ({
      url: `${BASE_URL}/post/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Sitemap Dynamic Error:", e);
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
