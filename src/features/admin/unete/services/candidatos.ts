// Leemos la cookie y haremos un fetch directamente a NestJS --> src/unete
import { cookies } from "next/headers";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

export async function getCandidatos() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  if (!token) {
    throw new Error("No estás autenticado");
  }

  const response = await fetch(`${API_URL}/unete`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
     console.error("Error al obtener los candidatos");
    return[];
  }

  return response.json();
}
