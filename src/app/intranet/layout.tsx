import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function IntranetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token");

  if (!token) {
    redirect("/login"); // Si no hay carnet, fuera.
  }

  return (
    <div className="flex">
      {/* Tu Sidebar aquí */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
