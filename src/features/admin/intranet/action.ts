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
    console.log("SERVER_ERROR", e);
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
    console.log("SERVER_ERROR", e);
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
    console.log("SERVER_ERROR", e);
    return { success: false, error: "Error de conexión" };
  }
}

// Obtener link por ID
export async function getLinkById(id: string) {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  // Llamamos al endpoint que configuramos en el IntranetController de NestJS
  // Usamos el ID directamente como lo definimos: @Get('admin/all') o @Get(':id')
  const res = await fetch(`${API_URL}/intranet/admin/link/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store", // Importante: siempre traer data fresca al editar
  });

  if (!res.ok) return null;
  return res.json();
}

// Obtener todos los links
export async function getIntranetLinks() {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  const res = await fetch(`${API_URL}/intranet/admin/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["intranet-links"] }, // Para revalidación bajo demanda
  });

  if (!res.ok) return [];
  return res.json();
}

export async function getLinks() {
  // 1. Ya no buscamos el token aquí para la vista pública
  try {
    const res = await fetch(`${API_URL}/intranet/public-links`, {
      // 2. Quitamos el Authorization Header
      next: { revalidate: 3600 }, // Como es público, podemos cachear más tiempo (1 hora)
    });

    if (!res.ok) return { links: [] };
    return res.json();
  } catch (e) {
    console.error("FETCH_PUBLIC_LINKS_ERROR", e);
    return { links: [] };
  }
}
