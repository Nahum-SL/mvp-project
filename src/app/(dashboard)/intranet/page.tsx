import { Suspense } from "react";
import { cookies } from "next/headers";
import IntranetHeader from "@/src/components/ui/layout/IntranetHeader";
import IntranetDashboard from "@/src/components/ui/layout/intranet/IntranetDashboard";
import { IntranetSkeleton } from "@/src/components/ui/layout/intranet/IntranetSkeleton";

async function getLinks() {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  // Llamamos al endpoint público que creamos en NestJS
  const res = await fetch(`${API_URL}/intranet/links`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60 }, // Cacheamos por 1 minuto
  });

  if (!res.ok) return { userName: "Usuario", links: [] };
  return res.json();
}

export default async function IntranetPage() {
  const { userName, links } = await getLinks();

  return (
    <main className="bg-slate-950 min-h-screen">
      <IntranetHeader
        title={`Bienvenido, ${userName}`}
        subtitle="Portal seguro de gestión empresarial ASESCON"
        src="/fondo-intranet.webp"
        alt="Fondo Intranet"
      />

      {/* Pasamos los links reales al componente cliente */}
      <Suspense fallback={<IntranetSkeleton />}>
        <IntranetDashboard initialLinks={links} />
      </Suspense>
    </main>
  );
}
