import type { Metadata } from "next";
import { raleway } from "../lib/fonts";

import "./globals.css";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Asescon App",
  description: "Prototipo de web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body
        className={`${raleway.className} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
