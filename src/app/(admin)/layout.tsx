// src/app/(admin)/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

// Font letter
import { raleway } from "@/src/lib/fonts";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token");

  if (!token) {
    redirect("/login");
  }

  // NOTA: Aquí lo ideal es verificar que el rol en el token sea 'ADMIN'
  // Si no tienes una función para decodificar el JWT en el server todavía,
  // asegúrate de implementar esa validación pronto.

  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body
        className={`${raleway.className} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-1">
          <Toaster position="top-right" richColors />
          {children}
        </main>
      </body>
    </html>
  );
}
