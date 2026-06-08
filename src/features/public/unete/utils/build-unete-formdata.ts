import type { UneteFormValues } from "../schemas/unete-public.schema";

export function buildUneteFormData(
  values: UneteFormValues,
): FormData {
  const formData = new FormData();

  formData.append("fullName", values.fullName);
  formData.append("dni", values.dni);
  formData.append("age", String(values.age));
  formData.append("email", values.email);
  formData.append("phone", values.phone);
  formData.append("experience", String(values.experience));
  formData.append("position", values.position);

  if (values.cv?.[0]) {
    formData.append("cv", values.cv[0]);
  }

  return formData;
}