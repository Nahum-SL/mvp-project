// src/app/(admin)/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootAdminLayout({
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
    <>
      <main className="flex-1">{children}</main>
    </>
  );
}
