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
// Manejo de lado del Servidor
import { apiClient } from "@/src/lib/api/api-client";
import { ApiResponse } from "@/src/shared";

export async function loginAction(
  data: LoginFormValues,
): Promise<LoginActionResult> {
  try {
    const response = await apiClient<ApiResponse<LoginActionResult>>(
      "/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store",
      },
    );

    return response.data;
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "No fue posible iniciar sesión.",
    };
  }
}

// Nueva acción para verificar el código
export async function verify2FAAction(email: string, code: string) {
  try {
    const response = await apiClient<ApiResponse<AuthResponse>>(
      "/auth/verify-2fa",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
        cache: "no-store",
      },
    );

    const data = response.data;

    if (!data.backendToken) {
      return {
        error: "Token no proporcionado por el servidor.",
      };
    }

    return await saveSession(data);
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "No fue posible verificar el código.",
    };
  }
}

// Helper para no repetir lógica de cookies
export async function saveSession(result: AuthResponse) {
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
  revalidatePath("/admin");
  revalidatePath("/intranet");

  return { success: true, user: result.user };
}
