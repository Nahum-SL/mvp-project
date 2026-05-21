import type {
  Contacto,
  UpdateContactStatusPayload,
} from "@/src/types/contacto/contacto-type";
import { handleResponse } from "@/src/lib/handle-response";

// IMPLEMENTAR ESTO EN CADA FEATURES EN => .mutation.ts
interface UpdateStageArgs {
  id: string;
  payload: UpdateContactStatusPayload;
}

export async function updateStateContactAction({
  id,
  payload,
}: UpdateStageArgs): Promise<Contacto> {
  const res = await fetch(`/api/admin/contacto/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<Contacto>(res);
}

export async function deleteContactAction(id: string): Promise<void> {
  const res = await fetch(`/api/admin/contacto/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(res);
}
