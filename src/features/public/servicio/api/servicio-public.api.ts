import type { Service } from "@/src/types/servicio/servicio-types";
import { handleResponse } from "@/src/lib/handle-response";

export async function getPublicServices(): Promise<Service[]> {
  const res = await fetch(`/api/public/servicio`);
  return handleResponse<Service[]>(res)
}

export async function getPublicServiceBySlug(slug: string): Promise<Service> {
  const res = await fetch(`/api/public/servicio/${slug}`);
  return handleResponse<Service>(res)
}