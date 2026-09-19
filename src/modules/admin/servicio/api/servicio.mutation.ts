'use server';

import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
import type { Service } from "@/src/types/servicio/servicio-types";

// Create
export async function createServicioAction(
  formData: FormData,
): Promise<Service> {
  const res = await serverApiClient<ApiResponse<Service>>(`/servicio`, {
    method: "POST",
    body: formData,
  });
  return res.data;
}

// Update
export async function updateServicioAction(
  id: number,
  formData: FormData,
): Promise<Service> {
  const res = await serverApiClient<ApiResponse<Service>>(`/servicio/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return res.data
}

// Delete
export async function deleteServicioAction(id: number): Promise<void> {
  const res = await serverApiClient<ApiResponse<void>>(`/servicio/${id}`, {
    method: "DELETE",
  });
  return res.data;
}
