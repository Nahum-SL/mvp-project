"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

export async function createCategoryAction(data: { name: string }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  if (!token) return { success: false, error: "No autorizado" };

  try {
    const res = await fetch(`${API_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      next: { revalidate: 3600 }
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result.message || "Error al crear categoría",
      };
    }

    return { success: true, data: result };
  } catch (e) {
    const message = "Error crítico de conexión";
    return { success: false, error: e || message};
  }
}

