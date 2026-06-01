import type { Service } from "@/src/types/servicio/servicio-types";
import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

// Create
export async function createServicioAction(
  formData: FormData,
): Promise<Service> {
  const res = await fetch(`${getBaseUrl()}/api/admin/servicio`, {
    method: "POST",
    body: formData,
  });
  return handleResponse<Service>(res);
}

// Update
export async function updateServicioAction(
  id: number,
  formData: FormData,
): Promise<Service> {
  const res = await fetch(`${getBaseUrl()}/api/admin/servicio/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return handleResponse<Service>(res);
}

// Delete
export async function deleteServicioAction(id: number): Promise<void> {
  const res = await fetch(`${getBaseUrl()}/api/admin/servicio/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(res);
}
