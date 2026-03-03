"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

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
    const response = await fetch(`${API_URL}/posts`, {
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
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    return res.json();
  } catch (error) {
    console.error("SERVER_ACTION_ERROR:", error);
    return [];
  }
}
