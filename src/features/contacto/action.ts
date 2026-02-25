"use server";

import { ContactoFormValues } from "./schema";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001/contacto";

export async function sendContactoAction(data: ContactoFormValues) {
  try {
    const response = await fetch(`${API_URL}/contacto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Error al enviar el mensaje",
      };
    }

    revalidatePath("/contacto")

    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Nos contactaremos pronto.",
    };
  } catch (error) {
    return {
      error,
      success: false,
      message: "Error de conexión con el servidor",
    };
  }
}
