// src/features/admin/contacto/action.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ContactoFormValues, ContactStatusEnum } from "./schema";
import { z } from "zod";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

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
    const res = await fetch(`${API_URL}/contacto/enviar`, {
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
    console.log("SERVER_ERROR", e);
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
    const res = await fetch(`${API_URL}/contacto/admin/status/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });

    if (!res.ok)
      return { success: false, error: "No se pudo actualizar el estado" };

    revalidatePath("/admin/contactos");
    return { success: true };
  } catch (e) {
    console.log("SERVER_ERROR", e);
    return { success: false, error: "Error de conexión" };
  }
}

// src/features/admin/contacto/action.ts

export async function updateContactAction(
  id: string,
  data: ContactoFormValues,
) {
  const headers = await getAuthHeaders();
  try {
    const res = await fetch(`${API_URL}/contacto/admin/update/${id}`, {
      method: "PUT", // O PATCH según tu NestJS
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok)
      return { success: false, error: "No se pudo actualizar la información" };

    revalidatePath("/admin/contacto");
    return { success: true };
  } catch (e) {
    console.log("SERVER_ERROR:", e)
    return { success: false, error: "Error de red" };
  }
}

/**
 * ACCIÓN ADMIN: Eliminar un contacto
 */
export async function deleteContactAction(id: string) {
  const headers = await getAuthHeaders();

  try {
    const res = await fetch(`${API_URL}/contacto/admin/delete/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok)
      return { success: false, error: "No se pudo eliminar el registro" };

    revalidatePath("/admin/contacto");
    return { success: true };
  } catch (e) {
    console.log("SERVER_ERROR", e);
    return { success: false, error: "Error de conexión" };
  }
}
