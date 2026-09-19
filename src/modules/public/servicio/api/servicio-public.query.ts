

import type { Service } from "@/src/types/servicio/servicio-types";
import { apiClient } from "@/src/lib/api/api-client";
import { ApiResponse } from "@/src/shared";

export async function getPublicServices(): Promise<Service[]> {
  const res = await apiClient<ApiResponse<Service[]>>(`/servicio`);
  return res.data;
}

export async function getPublicServiceBySlug(slug: string): Promise<Service> {
  const res = await apiClient<ApiResponse<Service>>(`/servicio/${slug}`);
  return res.data;
}
