"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { JobAppStatus } from "@/src/types/unete/unete";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

export async function updateCandidatoStatus(id: string, status: JobAppStatus) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("asescon_token")?.value;

    if (!token) throw new Error("No autorizado");

    const response = await fetch(`${API_URL}/unete/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar el estado");
    }

    // Esto es clave: refresca la tabla sin recargar la página
    revalidatePath("/admin/unete");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo actualizar el estado" };
  }
}

export async function getCandidatos() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    if (!token) {
      throw new Error("No estás autenticado");
    }

    const response = await fetch(`${API_URL}/unete`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { tags: ["unete"] },
    });

    if (!response.ok) throw new Error("Error al obtener los candidatos");

    return response.json();
  } catch (e) {
    console.error(e);
    return { success: false, error: "No se pudo conectar con el servidor" };
  }
}
