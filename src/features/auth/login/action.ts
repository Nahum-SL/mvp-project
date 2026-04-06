// src/features/auth/login/action.ts
"use server";

// Importamos cookies para manejar la sesión
import { cookies } from "next/headers";
// Revalidar la página después de iniciar sesión
import { revalidatePath } from "next/cache";
// Types
import { AuthResponse, type LoginActionResult } from "./types";
// Valores del formulario
import { LoginFormValues } from "./schema";
// URL del backend en NestJS - Railway
import { API_URL } from "@/src/lib/api-url";

export async function loginAction(
  data: LoginFormValues,
): Promise<LoginActionResult> {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || "Error al iniciar sesión" };
    }

    if (result.requires2FA) {
      return {
        requires2FA: true,
        email: result.email,
        message: result.message,
      };
    }

    // Usamos el helper saveSession pero aseguramos que retorne el tipo correcto
    return (await saveSession(result)) as LoginActionResult;
  } catch (e) {
    // console.error("Error en loginAction:", e);
    return { error: "No se pudo conectar con el servidor" };
  }
}

// Nueva acción para verificar el código
export async function verify2FAAction(email: string, code: string) {
  try {
    const response = await fetch(`${API_URL}/api/auth/verify-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const result = await response.json();

    if (!response.ok) return { error: result.message || "Código inválido" };

    return await saveSession(result);
  } catch (e) {
    return {
      error: "Error en la verificación",
      details: e instanceof Error ? e.message : String(e),
    };
  }
}

// Helper para no repetir lógica de cookies
async function saveSession(result: AuthResponse) {
  if (!result.backendToken) return { error: "Token no proporcionado" };

  const cookieStore = await cookies();
  cookieStore.set("asescon_token", result.backendToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  revalidatePath("/login");
  return { success: true, user: result.user };
}
