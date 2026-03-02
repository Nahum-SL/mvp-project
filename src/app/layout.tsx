import type { Metadata } from "next";
import { raleway } from "../lib/fonts";

import "../styles/globals.css";

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
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
