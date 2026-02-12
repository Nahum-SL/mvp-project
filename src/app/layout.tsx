import type { Metadata } from "next";
import { raleway } from "../shared/types/letras";

import "./globals.css";

import Navbar from "../shared/ui/Navbar";
import Footer from "../shared/ui/Footer";

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
    <html lang="es">
      <body
        className={`${raleway.className} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
