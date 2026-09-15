import type { Service } from "@/src/types/servicio/servicio-types";
import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

export async function getAdminServices(): Promise<Service[]> {
  const res = await fetch(`${getBaseUrl()}/api/admin/servicio`);
  return handleResponse<Service[]>(res);
}

export async function getAdminServiceById(id: number): Promise<Service> {
  const res = await fetch(`${getBaseUrl()}/api/admin/servicio/${id}`);
  return handleResponse<Service>(res);
}