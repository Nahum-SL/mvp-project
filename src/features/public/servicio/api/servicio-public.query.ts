import type { Service } from "@/src/types/servicio/servicio-types";
import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

export async function getPublicServices(): Promise<Service[]> {
  const res = await fetch(`${getBaseUrl()}/api/public/servicio`);
  return handleResponse<Service[]>(res)
}

export async function getPublicServiceBySlug(slug: string): Promise<Service> {
  const res = await fetch(`${getBaseUrl()}/api/public/servicio/${slug}`);
  return handleResponse<Service>(res)
}