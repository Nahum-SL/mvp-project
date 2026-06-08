import type { NextConfig } from "next";

/**
 * BUENAS PRÁCTICAS DE SEGURIDAD (CSP)
 * 1. 'connect-src': Necesario para permitir llamadas a APIs y Bases de Datos (como Neon).
 * 2. 'img-src': Añadimos Cloudinary y UI-Avatars para que el navegador permita cargarlas.
 * 3. 'script-src': Mantenemos unsafe-inline solo si es estrictamente necesario para Next.js.
 */
const isDev = process.env.NODE_ENV === "development";

const backendUrl = isDev ? "http://localhost:3001" : "";

const devCSP = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    connect-src 'self' http://localhost:3001 ws://localhost:* http://localhost:*;
    frame-ancestors 'none';
  `;

const prodCSP = `
    default-src 'self';
    script-src 'self';
    style-src 'self';
    img-src 'self' blob: data: https://res.cloudinary.com https://ui-avatars.com;
    connect-src 'self' https://*.neon.tech https://*.cloudinary.com https://*.google-analytics.com;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `;

const cspHeader = (isDev ? devCSP : prodCSP).replace(/\s{2,}/g, " ").trim();

const nextConfig: NextConfig = {
  // 1. Headers de Seguridad (Lo que te pedía el test de web-check)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  turbopack: { root: process.cwd() },
  // 2. Optimización de Imágenes
  images: {
    formats: ["image/avif", "image/webp"], // Mejor práctica: servir formatos modernos automáticamente
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/api/**",
      },
    ],
  },

  // 3. Producción y Rendimiento
  output: "standalone",
  poweredByHeader: false, // Buena práctica: no decir que usas Next.js para evitar ataques dirigidos
  reactStrictMode: true,
};

export default nextConfig;
