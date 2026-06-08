import type { ServicioFormValues } from "../schemas/servicio.schema";

export function buildServicioFormData(values: ServicioFormValues): FormData {
  const formData = new FormData();

  // Campos básicos (Sanitizados con trim)
  formData.append("title", values.title.trim());
  formData.append("slug", values.slug.trim());
  formData.append("description", values.description.trim());

  if (values.icon) {
    formData.append("icon", values.icon);
  }

  // Arreglos planos de strings (Se pueden añadir múltiples veces con la misma llave)
  values.businessTypes.forEach((type) => {
    formData.append("businessTypes", type);
  });

  values.painPoints.forEach((pain) => {
    formData.append("painPoints", pain);
  });

  // 🔥 SOLUCIÓN PARA EL ARREGLO DE OBJETOS: Serialización a JSON string
  // Esto envía '[{"name":"Beneficio 1"},{"name":"Beneficio 2"}]' que NestJS puede parsear fácilmente
  formData.append("features", JSON.stringify(values.features));

  // Configuración de booleanos y números convertidos a string
  formData.append("isVisible", String(values.isVisible));
  formData.append("order", String(values.order));

  // Archivo de imagen (Cloudinary / Local)
  if (values.image instanceof File) {
    formData.append("image", values.image);
  } else if (typeof values.image === "string") {
    // Si estás editando y mandas la URL de la imagen actual en lugar de un archivo nuevo
    formData.append("image", values.image);
  }

  return formData;
}
