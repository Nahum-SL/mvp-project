"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

// 1. Crear Post
export async function createPostAction(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  if (!token) {
    return {
      success: false,
      error: "No autorizado. Inicie sesión nuevamente.",
    };
  }

  try {
    const response = await fetch(`${API_URL}/post`, {
      method: "POST",
      body: formData, // Pasamos el FormData tal cual (incluye la imagen)
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Error al comunicarse con el servidor de NestJS",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("SERVER_ACTION_ERROR:", error);
    return { success: false, error: "Error crítico de conexión." };
  }
}

// 2. Actualizar el post
export async function updatePostAction(
  id: number | string,
  formData: FormData,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    const res = await fetch(`${API_URL}/post/${id}`, {
      method: "PATCH", // O PUT según tu API en NestJS
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok)
      return { success: false, error: data.message || "Error al actualizar" };

    revalidatePath("/admin/blog");
    revalidatePath(`/admin/blog/${id}`);
    return { success: true };
  } catch (error) {
    console.log("SERVER_ERROR", error);
    return { success: false, error: "Error de conexión" };
  }
}

// 3. Eliminar Post.
// src/features/admin/blog/action.ts

export async function deletePostAction(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;
  const API_URL = process.env.NEST_API_URL;

  try {
    const res = await fetch(`${API_URL}/post/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      return {
        success: false,
        error: error.message || "No se pudo eliminar el post",
      };
    }

    // Revalidamos las rutas para que el post desaparezca de la lista
    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    return { success: true };
  } catch (e) {
    console.log("SERVER_ERROR", e)
    return { success: false, error: "Error de conexión con el servidor" };
  }
}

// Obtener categorias posts para el admin (con autenticación)
export async function getCategories() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  if (!token) {
    throw new Error("No estás autenticado");
  }

  try {
    const res = await fetch(`${API_URL}/blog/category`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) return [];

    return res.json();
  } catch (error) {
    console.error("SERVER_ACTION_ERROR:", error);
    return [];
  }
}

export async function getAdminPost() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}/post`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["post"] },
    });

    if (!res.ok) return "Error al comunicarse con el servidor de NestJS";

    return res.json();
  } catch (e) {
    console.error("GET_POST_ERROR", e);
    return [];
  }
}

// src/features/admin/blog/action.ts

// 1. Obtener post por ID para el formulario
export async function getPostByIdAction(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.log("SERVER_NOT_FOUND", error);
    return null;
  }
}
