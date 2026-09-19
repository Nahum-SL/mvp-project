'use server';

import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
import type { Contacto } from "@/src/types/contacto/contacto-type";

export async function getContactosAction(): Promise<Contacto[]> {
  const res = await serverApiClient<ApiResponse<Contacto[]>>(`/contacto/admin/all`);
  return res.data;
}

export async function getContactoById(id: string): Promise<Contacto> {
  const res = await serverApiClient<ApiResponse<Contacto>>(`/contacto/admin/id/${id}`);
  return res.data;
}
