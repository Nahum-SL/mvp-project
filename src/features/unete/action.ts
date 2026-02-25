"use server";
import { UneteFormValues } from "./schema";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001/api/v1";

export async function sendUneteAction(data: UneteFormValues) {
  try {
    const formData = new FormData();

    // Mapeamos los campos al FormData
    formData.append("fullName", data.fullName);
    formData.append("dni", data.dni);
    formData.append("age", data.age.toString());
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("experience", data.experience.toString());
    formData.append("position", data.position);

    // El archivo CV (recuerda que en el input de Hook Form es una FileList)
    formData.append("cv", data.cv[0]);

    const response = await fetch(`${API_URL}/unete`, {
      method: "POST",
      body: formData, // Enviamos el FormData directamente
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Error al enviar postulación",
      };
    }

    return {
      success: true,
      message: "¡Postulación enviada! Éxitos en el proceso.",
    };
  } catch (error) {
    console.error("Unete Action Error:", error);
    return { success: false, message: "No se pudo conectar con el servidor" };
  }
}
