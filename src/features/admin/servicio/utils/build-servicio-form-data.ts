import type { ServicioFormValues } from "../schemas/servicio.schema";
// Ventajas -->
// 1. Componentes limpios
// 2. Reutilizable
// 3. Fácil de testear
// 4. Centralizas transforms

export function buildServicioFormData(
  values: ServicioFormValues,
): FormData {
  const formData = new FormData();

  // Strings
  formData.append("title", values.title);
  formData.append("slug", values.slug);
  formData.append("description", values.description);

  // Icon
  if (values.icon) {
    formData.append("icon", values.icon);
  }

  // Arrays
  values.businessTypes.forEach((type) => {
    formData.append("businessTypes", type);
  });

  values.painPoints.forEach((pain) => {
    formData.append("painPoints", pain);
  });

  values.features.forEach((feature) => {
    formData.append("features", feature);
  });

  // Boolean
  formData.append("isVisible", String(values.isVisible));

  // Number
  formData.append("order", String(values.order));

  // File
  if (values.image instanceof File) {
    formData.append("image", values.image);
  }

  return formData;
}

// Forma de usar -->
// const onSubmit = async (values: ServicioFormValues) => {
//   const formData = buildServicioFormData(values);

//   await createServicioMutation.mutateAsync(formData);
// };

// Luego puede evolucionar a 
// type BuildOptions = {
//   mode?: "create" | "update";
// };
// Ignorar vacios automaticamente
// if (values.description?.trim()) {
//   formData.append(...)
// }