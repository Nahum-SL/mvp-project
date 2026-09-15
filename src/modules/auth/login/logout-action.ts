"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function logoutAction() {
  const cookieStore = await cookies();

  // 1. Borramos el token
  cookieStore.delete("asescon_token");

  /**
   * 2. Revalidación de Caché (CRUCIAL):
   * Al cerrar sesión, queremos asegurarnos de que Next.js limpie cualquier
   * dato sensible que haya quedado en el Client Cache del navegador.
   */
  revalidatePath("/");

  /**
   * 3. Redirección con Feedback:
   * Enviamos un parámetro opcional para que la página de login
   * pueda mostrar un mensaje de "Sesión cerrada correctamente".
   */
  redirect("/login?logout=success");
}
