'use server';

import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
import type {
  Contacto,
  UpdateContactStatusPayload,
} from "@/src/types/contacto/contacto-type";

// IMPLEMENTAR ESTO EN CADA FEATURES EN => .mutation.ts
interface UpdateStageArgs {
  id: string;
  payload: UpdateContactStatusPayload;
}

export async function updateStateContactAction({
  id,
  payload,
}: UpdateStageArgs): Promise<Contacto> {
  const res = await serverApiClient<ApiResponse<Contacto>>(`/contacto/admin/status/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteContactAction(id: string): Promise<void> {
  const res = await serverApiClient<ApiResponse<void>>(`/contacto/admin/delete/${id}`, {
    method: "DELETE",
  });
  return res.data;
}
