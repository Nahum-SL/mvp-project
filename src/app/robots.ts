import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/", // No queremos que el panel de admin salga en Google
        "/api/", // Rutas internas de API
        "/_next/", // Archivos de sistema de Next.js
      ],
    },
    sitemap: "https://asescon.pe/sitemap.xml",
  };
}
