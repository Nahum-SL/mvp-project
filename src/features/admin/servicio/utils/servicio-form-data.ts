import type { ServicioFormValues } from "../schemas/servicio.schema";

export function buildServicioFormData(values: ServicioFormValues): FormData {
  const formData = new FormData();

  formData.append("title", values.title.trim());
  formData.append("slug", values.slug.trim());
  formData.append("description", values.description.trim());
  if (values.icon) {
    formData.append("icon", values.icon);
  }
  values.businessTypes.forEach((type) => {
    formData.append("businessTypes", type);
  });
  values.painPoints.forEach((pain) => {
    formData.append("painPoints", pain);
  });
  values.features.forEach((feature) => {
    formData.append("features", feature);
  });
  formData.append("isVisible", String(values.isVisible));
  formData.append("order", String(values.order));
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
