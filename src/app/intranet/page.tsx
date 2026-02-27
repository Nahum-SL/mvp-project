import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // pnpm add jwt-decode
import IntranetHeader from "@/src/components/ui/layout/IntranetHeader";
import IntranetDashboard from "@/src/components/ui/layout/intranet/IntranetDashboard";

// 1. Definimos la estructura del Token
interface JWTPayload {
  id: number;
  email: string;
  role: "ADMIN" | "USER" | "COLABORADOR"; // Ajusta según tus roles de Prisma
  iat: number;
  exp: number;
}

export default async function IntranetPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  // 1. Si no hay token, al login
  if (!token) {
    redirect("/login");
  }

  try {
    // 2. Decodificar el token para ver el ROL
    // Nota: El payload de tu JWT en NestJS tiene { id, email, role }
    const decoded = jwtDecode<JWTPayload>(token);

    // 3. Si es ADMIN, mandarlo a su panel (No debería estar en la intranet común)
    if (decoded.role === "ADMIN") {
      redirect("/admin");
    }
  } catch (error) {
    // Si el token es inválido o expiró
    redirect("/login");
  }
  return (
    <main className="bg-slate-950">
      <IntranetHeader
        title="Intranet"
        subtitle="Portal seguro de gestión empresarial ASESCON"
        src="/fondo-intranet.webp"
        alt="Fondo Intranet"
      />

      {/* El Dashboard continúa el fondo oscuro del Header */}
      <IntranetDashboard />
    </main>
  );
}
