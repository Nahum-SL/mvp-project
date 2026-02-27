"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();

  // Borramos la cookie que creamos en el login
  cookieStore.delete("asescon_token");

  // Redirigimos al inicio o al login
  redirect("/login");
}
