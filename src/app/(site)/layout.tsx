import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <html lang="es" data-scroll-behavior="smooth">
    <body className={`antialiased min-h-screen flex flex-col`}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </body>
  </html>;
}
