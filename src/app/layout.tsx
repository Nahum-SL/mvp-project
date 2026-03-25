import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { googleSansflex } from "../lib/fonts";
import { Toaster } from "sonner";

import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://asescon.pe"), // Reemplaza con tu dominio real
  title: {
    template: "%s | ASESCON",
    default: "Asesoría Contable y Tributaria en Perú | ASESCON",
  },
  description:
    "Consultoría estratégica contable, tributaria y laboral para empresas que buscan excelencia.",
  keywords: [
    "contabilidad peru",
    "asesoria tributaria",
    "planillas",
    "asescon",
  ],

  // --- OPEN GRAPH (Para Facebook, WhatsApp, LinkedIn) ---
  openGraph: {
    title: "ASESCON | Consultoría Empresarial Estratégica",
    description:
      "Transformamos la gestión de tu empresa con asesoría contable y digital de alto nivel.",
    url: "https://asescon.pe",
    siteName: "ASESCON",
    images: [
      {
        url: "/og-image.jpg", // Asegúrate de tener una imagen de 1200x630 en /public
        width: 1200,
        height: 630,
        alt: "ASESCON - Asesoría Contable",
      },
    ],
    locale: "es_PE",
    type: "website",
  },

  // --- TWITTER / X ---
  twitter: {
    card: "summary_large_image",
    title: "ASESCON | Asesoría Contable y Tributaria",
    description:
      "Soluciones estratégicas para el crecimiento de tu empresa en el Perú.",
    images: ["/og-image.jpg"], // La misma imagen sirve
  },

  // --- ROBOTS ---
  robots: {
    index: true,
    follow: true,
  },

  // // --- ICONOS ---
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-32x32.png",
  //   apple: "/apple-touch-icon.png",
  // },
  manifest: "/site.webmanifest",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD para decirle a Google quién es ASESCON y sus redes
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ASESCON",
    url: "https://asescon.pe",
    logo: "https://asescon.pe/logo.png",
    sameAs: [
      "https://www.facebook.com/asescon.pe", // Reemplaza con sus links reales
      "https://www.instagram.com/asescon.pe",
    ],
  };

  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${googleSansflex.className} antialiased min-h-screen flex flex-col`}
      >
        {children}
        <Toaster position="top-right" richColors closeButton />
        
        {/* Obtener ID de medicion (G-XXXXXXXXXX) */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
