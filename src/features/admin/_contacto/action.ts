// src/features/admin/contacto/action.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ContactoFormValues, ContactStatusEnum } from "./schema";
import { z } from "zod";
import { API_URL } from "@/src/lib/api-url";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

/**
 * ACCIÓN PÚBLICA: Enviar formulario desde el Landing Page
 */
export async function sendContactAction(data: ContactoFormValues) {
  try {
    const res = await fetch(`${API_URL}/api/contacto/enviar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result.message || "Error al enviar el mensaje",
      };
    }

    return { success: true };
  } catch (e) {
    // console.log("SERVER_ERROR", e);
    return { success: false, error: "Error de conexión con el servidor" };
  }
}

/**
 * ACCIÓN ADMIN: Actualizar estado de un contacto (Lead)
 */
export async function updateContactStatusAction(
  id: string,
  status: z.infer<typeof ContactStatusEnum>,
) {
  const headers = await getAuthHeaders();

  try {
    const res = await fetch(`${API_URL}/api/contacto/admin/status/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });

    if (!res.ok)
      return { success: false, error: "No se pudo actualizar el estado" };

    revalidatePath("/admin/contactos");
    return { success: true };
  } catch (e) {
    // console.log("SERVER_ERROR", e);
    return { success: false, error: "Error de conexión" };
  }
}
// a
// src/features/admin/contacto/action.ts

export async function updateContactAction(
  id: string,
  data: ContactoFormValues,
) {
  const headers = await getAuthHeaders();
  try {
    const res = await fetch(`${API_URL}/api/contacto/admin/update/${id}`, {
      method: "PUT", // O PATCH según tu NestJS
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok)
      return { success: false, error: "No se pudo actualizar la información" };

    revalidatePath("/admin/contacto");
    return { success: true };
  } catch (e) {
    // console.log("SERVER_ERROR:", e);
    return { success: false, error: "Error de red" };
  }
}

/**
 * ACCIÓN ADMIN: Eliminar un contacto
 */
export async function deleteContactAction(id: string) {
  const headers = await getAuthHeaders();

  try {
    const res = await fetch(`${API_URL}/api/contacto/admin/delete/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok)
      return { success: false, error: "No se pudo eliminar el registro" };

    revalidatePath("/admin/contacto");
    return { success: true };
  } catch (e) {
    // console.log("SERVER_ERROR", e);
    return { success: false, error: "Error de conexión" };
  }
}

// Obtener leads de clientes - CORREGIDO
export async function getLeads() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    if (!token) return [];

    const res = await fetch(`${API_URL}/api/contacto/admin/all`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      // Usamos tags para poder revalidar desde las acciones de UPDATE/DELETE
      next: { tags: ["leads"], revalidate: 0 },
    });

    if (!res.ok) {
      // console.error("Error al obtener leads:", res.status);
      return [];
    }

    const data = await res.json();

    // IMPORTANTE: Retornamos directamente el array, no un objeto de éxito
    return Array.isArray(data) ? data : [];
  } catch (e) {
    // console.error("FETCH_LEADS_ERROR", e);
    return [];
  }
}
