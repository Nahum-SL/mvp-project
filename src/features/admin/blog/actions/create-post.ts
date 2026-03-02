"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
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

    // Limpiamos la caché de la página del blog para que aparezca el nuevo post
    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    return { success: true, data };
  } catch (error) {
    console.error("SERVER_ACTION_ERROR:", error);
    return { success: false, error: "Error crítico de conexión." };
  }
}
