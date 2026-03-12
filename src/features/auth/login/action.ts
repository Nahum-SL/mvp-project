"use server";

import { cookies } from "next/headers";
import { LoginFormValues } from "./schema";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

export async function loginAction(data: LoginFormValues) {
  try {
    const response = await fetch( `${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store"
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || "Error al iniciar sesión" };
    }

    // Guardar el token en una Cookie segura
    const cookieStore = await cookies();
    cookieStore.set("asescon_token", result.backendToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 horas (igual que tu JWT)
      path: "/",
    });

    revalidatePath('/login')

    return { success: true, user: result.user };
  } catch (e) {
    console.log(e)
    return { error: "No se pudo conectar con el servidor de autenticación" };
  }
}
