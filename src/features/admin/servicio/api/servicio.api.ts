import type { Service } from "@/src/types/servicio/servicio-types";
import { handleResponse } from "@/src/lib/handle-response";

export async function getAdminServices(): Promise<Service[]> {
  const res = await fetch(`/api/admin/servicio`);
  return handleResponse<Service[]>(res);
}

