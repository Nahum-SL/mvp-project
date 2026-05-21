"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { JobAppStatus } from "./types";
import { API_URL } from "@/src/lib/api-url";

export async function updateCandidatoStatus(id: string, status: JobAppStatus) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("asescon_token")?.value;

    if (!token) throw new Error("No autorizado");

    const response = await fetch(`${API_URL}/api/unete/${id}/status`, {
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
    // console.error(error);
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

    const response = await fetch(`${API_URL}/api/unete`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      // console.error("Error al obtener los candidatos");
      return [];
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [] // Aseguramos que siempre devolvemos un array;
  } catch (e) {
    // console.error("Fetch Failed:",e);
    return [];
  }
}
