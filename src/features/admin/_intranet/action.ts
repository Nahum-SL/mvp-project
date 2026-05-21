"use server";
// URL del backend
import { API_URL } from "@/src/lib/api-url";
// Importamos lo necesario para manejar cookies y los tipos del formulario
import { cookies } from "next/headers";
// Revalidar paths después de acciones que modifican data
import { revalidatePath } from "next/cache";
// Tipos y enums del contacto
import { IntranetLinkValues } from "./schema";

// Función para obtener los headers de autenticación con el token del cookie
async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// CREAR LINK
export async function createLinkAction(data: IntranetLinkValues) {
  const headers = await getAuthHeaders();

  try {
    const res = await fetch(`${API_URL}/api/intranet/admin/create`, {
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
    // console.log("SERVER_ERROR", e);
    return { success: false, error: "Error de conexión" };
  }
}

// --- ACTUALIZAR LINK
// -- recibe (id, data) para identificar cuál editar y con qué datos nuevos
export async function updateLinkAction(id: number, data: IntranetLinkValues) {
  const headers = await getAuthHeaders();

  try {
    const res = await fetch(`${API_URL}/api/intranet/admin/update/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) return { success: false, error: "Error al actualizar" };

    revalidatePath("/admin/intranet");
    return { success: true };
  } catch (e) {
    // console.log("SERVER_ERROR", e);
    return { success: false, error: "Error de conexión" };
  }
}

// --- ELIMINAR LINK
// recibe solo el ID para identificar cuál eliminar
export async function deleteLinkAction(id: number) {
  const headers = await getAuthHeaders();

  try {
    const res = await fetch(`${API_URL}/api/intranet/admin/delete/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) return { success: false, error: "No se pudo eliminar" };

    revalidatePath("/admin/intranet");
    return { success: true };
  } catch (e) {
    // console.log("SERVER_ERROR", e);
    return { success: false, error: "Error de conexión" };
  }
}

// --- OBTENER LINK POR ID
export async function getLinkById(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  // Llamamos al endpoint que configuramos en el IntranetController de NestJS
  // Usamos el ID directamente como lo definimos: @Get('admin/all') o @Get(':id')
  const res = await fetch(`${API_URL}/api/intranet/admin/link/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store", // Importante: siempre traer data fresca al editar
  });

  if (!res.ok) return null;
  return res.json();
}

// --- OBTENER TODOS LOS LINKS (ADMIN)
// -- Para la vista de administración (CRUD)
export async function getIntranetLinks() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    if (!token) return [];

    const res = await fetch(`${API_URL}/api/intranet/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Usamos tags para que cuando crees/edites un link,
      // puedas usar revalidateTag("intranet-links")
      next: { tags: ["intranet-links"], revalidate: 0 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    // IMPORTANTE: Retorna la data, NO un objeto {success: true}
    return Array.isArray(data) ? data : [];
  } catch (e) {
    // console.error("FETCH_LINKS_ERROR", e);
    return [];
  }
}
