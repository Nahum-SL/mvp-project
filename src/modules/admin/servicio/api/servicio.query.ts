'use server';

import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
import type { Service } from "@/src/types/servicio/servicio-types";

export async function getAdminServices(): Promise<Service[]> {
  const res = await serverApiClient<ApiResponse<Service[]>>("/servicio/admin");
  return res.data;
}

export async function getAdminServiceById(id: number): Promise<Service> {
  const res = await serverApiClient<ApiResponse<Service>>(`/servicio/id/${id}`);
  return res.data;
}