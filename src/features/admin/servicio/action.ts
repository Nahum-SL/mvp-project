// src/features/admin/servicio/action.ts
"use server";

import { Service } from "@/src/types/servicio/servicio";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function createServicioAction(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    const response = await fetch(`${API_URL}/servicio`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      next: { tags: ["servicio"] },
    });

    if (!response.ok) throw new Error("Error al crear el servicio");

    revalidateTag("servicio", "max");
    revalidatePath("/servicio");
    revalidatePath("/admin/servicio")

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
// Actualizar
export async function updateServicioAction(id: number, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    const response = await fetch(`${API_URL}/servicio/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      next: { tags: ["servicio"] },
    });

    if (!response.ok) throw new Error("Error al actualizar el servicio");

    revalidateTag("servicio", "max");
    revalidatePath("/admin/servicio");
    revalidatePath("/servicio");

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteServicioAction(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    const response = await fetch(`${API_URL}/servicio/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["servicio"] },
    });

    if (!response.ok) throw new Error("Error al eliminar el servicio");

    revalidateTag("servicio", "max");
    revalidatePath("/admin/servicio");
    revalidatePath("/servicio");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Vista para Admin
export async function getAdminServicios() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    const response = await fetch(`${API_URL}/servicio/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["servicio"] },
    });

    if (!response.ok) throw new Error("No se pudieron cargar los servicio");

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Obtener por Id
export async function getServicioById(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    const res = await fetch(`${API_URL}/servicio/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ["servico", `servicio-${id}`] }, // Tag específico para este servicio
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (e) {
    console.log("SERVER_ERROR", e);
    return null;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null>{
  const res = await fetch(`${API_URL}/servicio/slug/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}