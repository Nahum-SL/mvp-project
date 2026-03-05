"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { IntranetLinkValues } from "./schema";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001";



async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function createLinkAction(data: IntranetLinkValues) {
  const headers = await getAuthHeaders();

  try {
    const res = await fetch(`${API_URL}/intranet/admin/create`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result.message || "Error al crear el link",
      };
    }

    revalidatePath("/admin/intranet");
    revalidatePath("/intranet"); // Revalidar el dashboard del usuario
    return { success: true };
  } catch (e) {
    console.log("SERVER_ERROR", e)
    return { success: false, error: "Error de conexión" };
  }
}

export async function updateLinkAction(id: number, data: IntranetLinkValues) {
  const headers = await getAuthHeaders();

  try {
    const res = await fetch(`${API_URL}/intranet/admin/update/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) return { success: false, error: "Error al actualizar" };

    revalidatePath("/admin/intranet");
    return { success: true };
  } catch (e) {
    console.log("SERVER_ERROR", e)
    return { success: false, error: "Error de conexión" };
  }
}

export async function deleteLinkAction(id: number) {
  const headers = await getAuthHeaders();

  try {
    const res = await fetch(`${API_URL}/intranet/admin/delete/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) return { success: false, error: "No se pudo eliminar" };

    revalidatePath("/admin/intranet");
    return { success: true };
  } catch (e) {
    console.log("SERVER_ERROR", e)
    return { success: false, error: "Error de conexión" };
  }
}
