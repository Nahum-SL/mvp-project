// src/components/ui/layout/intranet/IntranetDashboardWrapper.tsx
import { cookies } from "next/headers";
import IntranetDashboard from "./IntranetDashboard";

async function getLinks() {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  const res = await fetch(`${API_URL}/api/intranet/links`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60 },
  });

  if (!res.ok) return { userName: "Usuario", links: [] };
  return res.json();
}

export default async function IntranetDashboardWrapper() {
  const { links } = await getLinks();

  // Aquí podemos añadir un delay artificial si quieres probar el skeleton:
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return <IntranetDashboard initialLinks={links} />;
}
