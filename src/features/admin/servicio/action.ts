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
    const response = await fetch(`${API_URL}/api/servicio`, {
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
    revalidatePath("/admin/servicio");

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
    const response = await fetch(`${API_URL}/api/servicio/${id}`, {
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
    const response = await fetch(`${API_URL}/api/servicio/${id}`, {
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
// Vista para Admin - REFACTORIZADO
export async function getAdminServicios(): Promise<Service[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    // Si no hay token, no intentamos el fetch para ahorrar recursos
    if (!token) return [];

    const response = await fetch(`${API_URL}/api/servicio/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["servicio"],
        revalidate: 0, // Forzamos a que siempre pida datos frescos en el admin
      },
    });

    if (!response.ok) {
      // console.error(`Error API: ${response.status} en getAdminServicios`);
      return [];
    }

    const data = await response.json();
    // Validamos que sea un array antes de devolverlo
    return Array.isArray(data) ? data : [];
  } catch (error) {
    // Si el servidor está apagado o el fetch falla por red
    // console.error("FALLO DE CONEXIÓN (getAdminServicios):", error);
    return [];
  }
}

// Obtener por Id
export async function getServicioById(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    const res = await fetch(`${API_URL}/api/servicio/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ["servico", `servicio-${id}`] }, // Tag específico para este servicio
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (e) {
    // console.log("SERVER_ERROR", e);
    return null;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const res = await fetch(`${API_URL}/api/servicio/slug/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

// Export ==> Home()
// src/app/(public)/page.tsx
export async function getPublicServices(): Promise<Service[]> {
  try {
    // Traemos los servicios visibles y los ordenamos por el campo 'order'
    const response = await fetch(`${API_URL}/api/servicio`, {
      next: {
        revalidate: 3600, // Cache de 1 hora
        tags: ["servicio-publico"],
      },
    });

    if (!response.ok) throw new Error("Error al cargar servicios");

    const services: Service[] = await response.json();

    // Retornamos solo los primeros 7 para mantener la estética del Bento Grid
    return services.filter((s) => s.isVisible).slice(0, 7);
  } catch (error) {
    // console.error("HOME_SERVICES_ERROR", error);
    return [];
  }
}
