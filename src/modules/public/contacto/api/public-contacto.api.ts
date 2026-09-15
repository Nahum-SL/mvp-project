import { handleResponse } from "@/src/lib/handle-response";
import type { Contacto, CreateContactPayload } from "@/src/types/contacto/contacto-type";

export async function sendContactAction(payload: CreateContactPayload): Promise<Contacto> {
    const res = await fetch("/api/public/contacto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    return handleResponse<Contacto>(res)

}